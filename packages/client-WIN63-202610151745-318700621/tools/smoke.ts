// Load the dev server's page in headless Chrome and report console output, uncaught exceptions and
// a screenshot. Usage: node tools/smoke.ts [url] [seconds] [screenshot.png]
// (Chrome's DevTools protocol over the WebSocket Node provides; no extra dependencies.)

import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url = 'http://localhost:5173/', seconds = '20', shot = 'smoke.png', expression = ''] = process.argv.slice(2);
const chromePath = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const port = 9333;
const chrome = spawn(chromePath, [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'smoke-'))}`,
    '--window-size=1280,800', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
let target: { webSocketDebuggerUrl: string } | undefined;
for (let i = 0; i < 50 && !target; i++) {
    await sleep(200);
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t: any) => t.type === 'page'); } catch { /* not up yet */ }
}
if (!target) throw new Error('Chrome did not start');

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0;
const pending = new Map<number, (v: any) => void>();
const urls = new Map<string, string>();
let requests = 0;
const send = (method: string, params: object = {}) => new Promise<any>(r => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
ws.addEventListener('message', ev => {
    const m = JSON.parse(String(ev.data));
    if (m.id && pending.has(m.id)) { pending.get(m.id)!(m.result ?? m.error); pending.delete(m.id); return; }
    if (m.method === 'Runtime.consoleAPICalled') {
        const text = m.params.args.map((a: any) => a.value ?? a.description ?? a.type).join(' ');
        console.log(`[${m.params.type}] ${text}`);
    } else if (m.method === 'Runtime.exceptionThrown') {
        const d = m.params.exceptionDetails;
        console.log(`[exception] ${d.exception?.description ?? d.text}`);
    } else if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) {
        console.log(`[http ${m.params.response.status}] ${m.params.response.url}`);
    } else if (m.method === 'Network.loadingFailed') {
        console.log(`[net failed] ${m.params.errorText} ${urls.get(m.params.requestId) ?? ''}`);
    } else if (m.method === 'Network.requestWillBeSent') {
        urls.set(m.params.requestId, m.params.request.url);
        requests++;
        if (!/^data:|(localhost|127\.0\.0\.1):\d+\/(src|node_modules|@|assets)\//.test(m.params.request.url)) console.log(`[request] ${m.params.request.method} ${m.params.request.url}`);
        // crash reports: print what the client says went wrong (large bodies must be asked for)
        if (/crash|client_error/.test(m.params.request.url) && m.params.request.hasPostData) {
            const shown = (body: string) => console.log(`  body: ${body.slice(0, 4000)}`);
            if (m.params.request.postData) shown(m.params.request.postData);
            else void send('Network.getRequestPostData', { requestId: m.params.requestId }).then(r => shown(r?.postData ?? '(unavailable)'));
        }
    } else if (m.method === 'Log.entryAdded') {
        console.log(`[log ${m.params.entry.level}] ${m.params.entry.text} ${m.params.entry.url ?? ''}`);
    }
});
await send('Runtime.enable');
await send('Log.enable');
await send('Page.enable');
await send('Network.enable');
await send('Performance.enable');
// nothing leaves the machine: the client reports crashes and tracking to Sulake's servers
// (SMOKE_CDN=1 lets asset downloads from images.habbo.com through; nothing else goes out)
await send('Network.setBlockedURLs', { urls: process.env.SMOKE_CDN ? ['*://www.habbo.com/*', '*://habbo.com/*', '*://*.sulake.com/*'] : ['*://*.habbo.com/*', '*://habbo.com/*', '*://*.habbo.*/*', '*://*.sulake.com/*'] });
// record every texture upload's size (window.__uploads), to catch oversized textures
await send('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__uploads = [];
    for (const C of [WebGLRenderingContext, WebGL2RenderingContext]) {
        const orig = C.prototype.texImage2D;
        C.prototype.texImage2D = function (...a) {
            const src = a[a.length - 1];
            const w = src && src.width !== undefined ? src.width : a[3], h = src && src.height !== undefined ? src.height : a[4];
            window.__uploads.push([w, h]);
            return orig.apply(this, a);
        };
    }
` });
await send('Page.navigate', { url });
await sleep(Number(seconds) * 1000);
// SMOKE_ACTIONS='[["click",x,y],["type","text"],["key","Enter"],["wait",ms],["viewport",w,h],["move",x,y],["eval","js"]]' drives the page before the end
for (const [kind, a, b] of JSON.parse(process.env.SMOKE_ACTIONS ?? '[]')) {
    if (kind === 'click') {
        for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: a, y: b, button: 'left', clickCount: 1 });
    } else if (kind === 'type') {
        for (const ch of String(a)) {
            await send('Input.dispatchKeyEvent', { type: 'keyDown', text: ch, key: ch });
            await send('Input.dispatchKeyEvent', { type: 'keyUp', key: ch });
        }
    } else if (kind === 'key') {
        await send('Input.dispatchKeyEvent', { type: 'keyDown', key: a, code: a, windowsVirtualKeyCode: a === 'Enter' ? 13 : 0 });
        await send('Input.dispatchKeyEvent', { type: 'keyUp', key: a, code: a });
    } else if (kind === 'wait') await sleep(a);
    else if (kind === 'move') await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: a, y: b });
    else if (kind === 'viewport') await send('Emulation.setDeviceMetricsOverride', { width: a, height: b, deviceScaleFactor: 1, mobile: false });
    else if (kind === 'eval') await send('Runtime.evaluate', { expression: a, awaitPromise: true });
    await sleep(200);
}
if (expression) {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    console.log('[evaluate]', JSON.stringify(r?.result?.value ?? r?.exceptionDetails?.exception?.description ?? r));
}
const metrics = await send('Performance.getMetrics');
const metric = (n: string) => metrics?.metrics?.find((x: any) => x.name === n)?.value;
console.log(`[stats] ${requests} requests, heap ${Math.round(metric('JSHeapUsedSize') / 1e6)} MB, script ${metric('ScriptDuration')?.toFixed(1)} s, layout ${metric('LayoutDuration')?.toFixed(2)} s, task ${metric('TaskDuration')?.toFixed(1)} s`);
const png = await send('Page.captureScreenshot', { format: 'png' });
if (png?.data) writeFileSync(shot, Buffer.from(png.data, 'base64'));
ws.close();
chrome.kill();
process.exit(0);
