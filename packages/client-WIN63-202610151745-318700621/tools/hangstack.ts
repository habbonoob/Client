// Loads a page in headless Chrome, waits, then pauses the debugger three times and prints where the JS is busy:
// what to run when the client hangs. Usage: node tools/hangstack.ts <url> [seconds]
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, seconds = '8'] = process.argv.slice(2);
const port = 9334;
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'hang-'))}`,
    '--window-size=1280,800', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', 'about:blank',
], { stdio: 'ignore' });
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
let target: any;
for (let i = 0; i < 50 && !target; i++) {
    await sleep(200);
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t: any) => t.type === 'page'); } catch { }
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0;
const pending = new Map<number, (v: any) => void>();
let paused: ((v: any) => void) | null = null;
const send = (method: string, params: object = {}) => new Promise<any>(r => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
ws.addEventListener('message', ev => {
    const m = JSON.parse(String(ev.data));
    if (m.id && pending.has(m.id)) { pending.get(m.id)!(m.result ?? m.error); pending.delete(m.id); return; }
    if (m.method === 'Debugger.paused' && paused) { paused(m.params); paused = null; }
    if (m.method === 'Runtime.exceptionThrown') console.log('[exception]', m.params.exceptionDetails.exception?.description?.slice(0, 400));
});
await send('Runtime.enable');
await send('Debugger.enable');
await send('Network.setBlockedURLs', { urls: ['*://*.habbo.com/*', '*://habbo.com/*', '*://*.sulake.com/*'] });
await send('Page.enable');
await send('Page.navigate', { url });
await sleep(Number(seconds) * 1000);
for (let k = 0; k < 3; k++) {
    const p = new Promise<any>(r => { paused = r; });
    void send('Debugger.pause');
    const ev = await Promise.race([p, sleep(15000).then(() => null)]);
    if (!ev) { console.log('did not pause'); break; }
    console.log(`--- sample ${k}`);
    for (const f of ev.callFrames.slice(0, 18)) {
        console.log(`  ${f.functionName || '(anon)'}  ${f.url.split('/').pop()}:${f.location.lineNumber + 1}:${f.location.columnNumber + 1}`);
    }
    await send('Debugger.resume');
    await sleep(700);
}
ws.close();
chrome.kill();
process.exit(0);
