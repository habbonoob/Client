// The smoke test in headless Firefox, over WebDriver BiDi: console output, errors, failed requests,
// a screenshot and an optional expression evaluated at the end.
// Usage: node tools/smoke-firefox.ts [url] [seconds] [screenshot.png] [expression]

import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url = 'http://127.0.0.1:5174/', seconds = '30', shot = 'smoke-firefox.png', expression = ''] = process.argv.slice(2);
const firefoxPath = process.env.FIREFOX ?? 'C:/Program Files/Mozilla Firefox/firefox.exe';
const port = 9334;
const profile = mkdtempSync(join(tmpdir(), 'smoke-ff-'));
// no telemetry and nothing to Sulake's servers from the test profile
writeFileSync(join(profile, 'user.js'), [
    'user_pref("datareporting.policy.dataSubmissionEnabled", false);',
    'user_pref("toolkit.telemetry.enabled", false);',
    'user_pref("browser.shell.checkDefaultBrowser", false);',
].join('\n'));
const firefox = spawn(firefoxPath, ['--headless', '--no-remote', '--profile', profile, `--remote-debugging-port=${port}`, '--width=1280', '--height=800'], { stdio: 'ignore' });

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
let ws: WebSocket | null = null;
for (let i = 0; i < 60 && !ws; i++) {
    await sleep(500);
    try {
        const s = new WebSocket(`ws://127.0.0.1:${port}/session`);
        await new Promise((ok, fail) => { s.addEventListener('open', ok, { once: true }); s.addEventListener('error', fail, { once: true }); });
        ws = s;
    } catch { /* not up yet */ }
}
if (!ws) throw new Error('Firefox did not start');

let id = 0;
const pending = new Map<number, (v: any) => void>();
const send = (method: string, params: object = {}) => new Promise<any>(r => { pending.set(++id, r); ws!.send(JSON.stringify({ id, method, params })); });
ws.addEventListener('message', ev => {
    const m = JSON.parse(String(ev.data));
    if (m.id && pending.has(m.id)) { pending.get(m.id)!(m.result ?? m); pending.delete(m.id); return; }
    if (m.method === 'log.entryAdded') {
        const e = m.params;
        const text = e.text ?? e.args?.map((a: any) => a.value ?? a.type).join(' ');
        const stack = e.stackTrace?.callFrames?.slice(0, 4).map((f: any) => `\n    at ${f.functionName} (${f.url}:${f.lineNumber + 1})`).join('') ?? '';
        console.log(`[${e.type}:${e.level}] ${text}${e.level === 'error' ? stack : ''}`);
    } else if (m.method === 'network.fetchError') {
        console.log(`[net failed] ${m.params.errorText} ${m.params.request.url}`);
    } else if (m.method === 'network.responseCompleted' && m.params.response.status >= 400) {
        console.log(`[http ${m.params.response.status}] ${m.params.request.url}`);
    }
});
await send('session.new', { capabilities: {} });
await send('session.subscribe', { events: ['log.entryAdded', 'network.fetchError', 'network.responseCompleted'] });
const tree = await send('browsingContext.getTree', {});
const context = tree.contexts[0].context;
await send('browsingContext.navigate', { context, url, wait: 'complete' });
await sleep(Number(seconds) * 1000);
if (expression) {
    const r = await send('script.evaluate', { expression, target: { context }, awaitPromise: true });
    console.log('[evaluate]', JSON.stringify(r?.result?.value ?? r?.exceptionDetails?.text ?? r));
}
const png = await send('browsingContext.captureScreenshot', { context });
if (png?.data) writeFileSync(shot, Buffer.from(png.data, 'base64'));
ws.close();
firefox.kill();
process.exit(0);
