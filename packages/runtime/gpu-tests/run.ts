// Runs the GPU tests (index.html) in headless Chrome on the machine's real GPU and prints the results; exits 1 when
// any case fails. VERBOSE=1 shows the page's whole console (a shader that does not compile is printed there). Usage: node gpu-tests/run.ts <page url>      (serve the folder first: npx vite gpu-tests)
// Chrome's DevTools protocol over the WebSocket Node provides; no extra dependencies.
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url = 'http://localhost:4190/'] = process.argv.slice(2);
const chromePath = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const port = 9334;
const chrome = spawn(chromePath, [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'gpu-tests-'))}`,
    '--window-size=1280,800', '--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-webgpu', 'about:blank',
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
const send = (method: string, params: object = {}) => new Promise<any>(r => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
ws.addEventListener('message', ev => {
    const m = JSON.parse(String(ev.data));
    if (m.id && pending.has(m.id)) { pending.get(m.id)!(m.result ?? m.error); pending.delete(m.id); return; }
    if (m.method === 'Runtime.exceptionThrown') console.log(`[exception] ${m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text}`);
    if (m.method === 'Runtime.consoleAPICalled' && (m.params.type === 'error' || process.env.VERBOSE)) console.log(`[${m.params.type}] ${m.params.args.map((a: any) => a.value ?? a.description).join(' ')}`);
});
await send('Runtime.enable');
await send('Page.navigate', { url });

let results: any;
for (let i = 0; i < 120 && results === undefined; i++) {
    await sleep(500);
    results = (await send('Runtime.evaluate', { expression: 'JSON.stringify(window.__results ?? null)', returnByValue: true }))?.result?.value;
    if (results === 'null') results = undefined;
}
const gpu = (await send('Runtime.evaluate', {
    expression: `(() => { const c = document.createElement('canvas').getContext('webgl2'); const d = c && c.getExtension('WEBGL_debug_renderer_info'); return d ? c.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'no webgl2'; })()`,
    returnByValue: true,
}))?.result?.value;
ws.close();
chrome.kill();

console.log(`gpu: ${gpu}`);
const parsed = results ? JSON.parse(results) : { error: 'no results (timed out)' };
if (!Array.isArray(parsed)) {
    console.log(`error: ${parsed.error}`);
    process.exit(1);
}
for (const r of parsed) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name.padEnd(40)} max diff ${String(r.maxDiff).padEnd(5)} over tolerance ${r.over}/${r.pixels}  ${r.ms} ms${r.bestShift ? `  (best shift ${r.bestShift})` : ''}${'onGpu' in r ? (r.onGpu ? '  [gpu]' : '  [cpu]') : ''}`);
process.exit(parsed.every((r: { ok: boolean }) => r.ok) ? 0 : 1);
