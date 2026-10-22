// Measure the client on this machine's GPU: load a page in headless Chromium, let it settle, then sample the frame
// stats panel and record a CPU profile, and report where the frame time goes. Usage:
//   node tools/profile.ts <url> [settle seconds=40] [profile seconds=10] [out dir=.]
// ROOM=<id> goes into that room once logged in (through the navigator's goto link), then settles again; MOUSE=x,y
// rests the pointer there (the room hit-tests what is under it every frame); WALK='x,y;x,y;...' clicks those points in
// turn, one every two seconds while profiling (the user's avatar walks there), the pointer resting at MOUSE between;
// DRAG=x,y[,radius=150[,turns a second=1]] holds the button down there and circles the pointer (120 moves a second)
// while profiling, as dragging the room around does.
// CHROME names the browser (default: chromium on the PATH). On NixOS the GPU driver is in /run/opengl-driver/lib,
// which a nix-built Chromium needs on its library path to use it (it falls back to SwiftShader otherwise): the tool
// adds it. Writes <out>/profile.cpuprofile (open it in Chrome DevTools' Performance panel) and <out>/profile.png.

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, settle = '40', seconds = '10', out = '.'] = process.argv.slice(2);
if (!url) throw new Error('usage: node tools/profile.ts <url> [settle seconds] [profile seconds] [out dir]');
const port = 9334;
const driver = '/run/opengl-driver/lib';
const chrome = spawn(process.env.CHROME ?? 'chromium', [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'profile-'))}`,
    '--window-size=1920,1080', '--use-angle=gl-egl', '--ignore-gpu-blocklist', '--enable-unsafe-webgpu',
    // frames as fast as they can be made, not held to the display's rate (PACED=1: held to it, 60 Hz headless)
    ...(process.env.PACED ? [] : ['--disable-gpu-vsync', '--disable-frame-rate-limit']), 'about:blank',
], {
    stdio: 'ignore',
    env: existsSync(driver) ? { ...process.env, LD_LIBRARY_PATH: [driver, process.env.LD_LIBRARY_PATH].filter(Boolean).join(':') } : process.env,
});

// the browser goes with the tool, however it ends (a timeout's signal too): left running, it holds the debugging port
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => process.exit(1));
process.on('exit', () => chrome.kill());

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
});
const evaluate = async (expression: string) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }))?.result?.value;
await send('Runtime.enable');
await send('Page.enable');
await send('Network.enable');
// nothing leaves the machine but asset downloads (as smoke.ts)
await send('Network.setBlockedURLs', { urls: ['*://www.habbo.com/*', '*://habbo.com/*', '*://*.sulake.com/*'] });
await send('Page.navigate', { url });
await sleep(Number(settle) * 1000);
if (process.env.ROOM) {
    console.log('[room] ' + await evaluate(`(() => { const core = globalThis.stage?.getChildAt(0)?._core; if (!core) return 'no core yet'; core.createLinkEvent('navigator/goto/${Number(process.env.ROOM)}'); return 'going to ${Number(process.env.ROOM)}'; })()`));
    await sleep(Number(settle) * 1000);
}
if (process.env.MOUSE) {
    const [x, y] = process.env.MOUSE.split(',').map(Number);
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
    await sleep(1000);
}

// EVAL=<expression> reports something about the page before profiling
if (process.env.EVAL) console.log('[eval] ' + JSON.stringify(await evaluate(process.env.EVAL)));
const gpu = await evaluate(`(() => { const gl = document.createElement('canvas').getContext('webgl2'); const e = gl?.getExtension('WEBGL_debug_renderer_info'); return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'unknown'; })()`);
const renderer = await evaluate(`({ 1: 'webgl', 2: 'webgpu', 4: 'canvas' })[globalThis.app?.renderer?.type] ?? String(globalThis.app?.renderer?.type)`);
console.log(`[gpu] ${gpu} · renderer ${renderer}`);

// what the frame loop does over the profiled seconds: the panel's lines (refreshed every half second), the display
// list's size and the GPU bitmaps' renders per frame
await evaluate(`(() => {
    const s = globalThis.__profile = { panel: [], frames: 0, start: performance.now(), stats: { ...globalThis.__gpuBitmapStats } };
    const panel = [...document.body.children].find(e => / fps \\//.test(e.textContent));
    s.timer = setInterval(() => s.panel.push(panel?.textContent ?? ''), 500);
    const count = () => { s.frames++; s.raf = requestAnimationFrame(count); };
    s.raf = requestAnimationFrame(count);
})()`);
/** The textures the renderer holds on the GPU: how many, and their megapixels. */
const textures = async () => evaluate(`(() => { const t = globalThis.app?.renderer?.texture?.managedTextures ?? []; return \`\${t.length} GPU textures, \${(t.reduce((n, s) => n + s.pixelWidth * s.pixelHeight, 0) / 1e6).toFixed(1)} Mpx\`; })()`);
// the heap in use (after a full collection) as profiling starts, to compare with the end: growth is a leak
await send('HeapProfiler.enable');
await send('HeapProfiler.collectGarbage');
console.log(`[heap] ${Math.round((await send('Runtime.getHeapUsage')).usedSize / 1e6)} MB in use after a collection, before profiling; ${await textures()}`);
await send('Profiler.enable');
await send('Profiler.setSamplingInterval', { interval: 200 });
await send('Profiler.start');
const walk = (process.env.WALK ?? '').split(';').filter(Boolean).map(p => p.split(',').map(Number));
const until = Date.now() + Number(seconds) * 1000;
for (let i = 0; walk.length && Date.now() < until - 2000; i++) {
    const [x, y] = walk[i % walk.length];
    for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 });
    if (process.env.MOUSE) { const [mx, my] = process.env.MOUSE.split(',').map(Number); await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: mx, y: my }); }
    await sleep(2000);
}
if (process.env.DRAG) {
    const [x, y, r = 150, turns = 1] = process.env.DRAG.split(',').map(Number);
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', buttons: 1, clickCount: 1 });
    for (let i = 0; Date.now() < until; i++) {
        const a = i / 60 * Math.PI * turns;
        await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x + r * Math.sin(a), y: y + r * (Math.cos(a) - 1), button: 'left', buttons: 1 });
        await sleep(1000 / 120);
    }
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', buttons: 0, clickCount: 1 });
}
await sleep(Math.max(0, until - Date.now()));
const { profile } = await send('Profiler.stop');
const loop = await evaluate(`(() => {
    const s = globalThis.__profile;
    clearInterval(s.timer);
    cancelAnimationFrame(s.raf);
    const nodes = c => 1 + (c.children ?? []).reduce((n, k) => n + nodes(k), 0);
    const visible = c => !c.visible ? 0 : 1 + (c.children ?? []).reduce((n, k) => n + visible(k), 0);
    const seconds = (performance.now() - s.start) / 1000;
    const per = k => ((globalThis.__gpuBitmapStats?.[k] ?? 0) - (s.stats[k] ?? 0)) / s.frames;
    return { panel: s.panel.slice(-4), fps: s.frames / seconds, rendersPerFrame: per('renders'), readBacksPerFrame: per('readBacks'), readBacksPerSecond: per('readBacks') * s.frames / seconds, replaysPerFrame: per('replays'),
        nodes: globalThis.app ? nodes(globalThis.app.stage) : 0, visibleNodes: globalThis.app ? visible(globalThis.app.stage) : 0 };
})()`);
console.log(`[frames] ${loop.fps.toFixed(1)} screen refreshes/s · ${loop.rendersPerFrame.toFixed(1)} bitmap renders, ${loop.readBacksPerFrame.toFixed(2)} read-backs, ${loop.replaysPerFrame.toFixed(2)} replays per frame · ${loop.visibleNodes}/${loop.nodes} visible PIXI nodes`);
for (const line of loop.panel) console.log(`[panel] ${line}`);
console.log(`[read-backs] ${loop.readBacksPerSecond.toFixed(1)}/s (each waits for the GPU)`);

// what stays in use: the heap after a full collection
await send('HeapProfiler.collectGarbage');
const heap = await send('Runtime.getHeapUsage');
console.log(`[heap] ${Math.round(heap.usedSize / 1e6)} MB in use after a collection (of ${Math.round(heap.totalSize / 1e6)} MB); ${await textures()}`);
writeFileSync(join(out, 'profile.cpuprofile'), JSON.stringify(profile));
summarise(profile);
const png = await send('Page.captureScreenshot', { format: 'png' });
if (png?.data) writeFileSync(join(out, 'profile.png'), Buffer.from(png.data, 'base64'));
ws.close();
chrome.kill();
process.exit(0);

/** Self time by function and by source file, and the total, from a CPU profile. */
function summarise(p: { nodes: { id: number; callFrame: { functionName: string; url: string; lineNumber: number }; hitCount?: number; children?: number[] }[]; samples: number[]; timeDeltas: number[] }): void {
    const self = new Map<number, number>();
    for (let i = 0; i < p.samples.length; i++) self.set(p.samples[i], (self.get(p.samples[i]) ?? 0) + (p.timeDeltas[i] ?? 0));
    const byFn = new Map<string, number>(), byFile = new Map<string, number>();
    let total = 0, idle = 0;
    for (const n of p.nodes) {
        const t = (self.get(n.id) ?? 0) / 1000;
        total += t;
        const name = n.callFrame.functionName || '(anonymous)';
        if (name === '(idle)' || name === '(program)') idle += name === '(idle)' ? t : 0;
        const file = n.callFrame.url.replace(/^.*\//, '').replace(/\?.*$/, '') || '(native)';
        const key = `${name}  ${file}:${n.callFrame.lineNumber + 1}`;
        byFn.set(key, (byFn.get(key) ?? 0) + t);
        byFile.set(file, (byFile.get(file) ?? 0) + t);
    }
    console.log(`[cpu] ${total.toFixed(0)} ms sampled, ${idle.toFixed(0)} ms idle (${((1 - idle / total) * 100).toFixed(0)}% busy)`);
    const top = (m: Map<string, number>, n: number) => [...m].sort((a, b) => b[1] - a[1]).slice(0, n);
    for (const [k, t] of top(byFn, 45)) console.log(`  ${t.toFixed(0).padStart(6)} ms  ${(t / total * 100).toFixed(1).padStart(5)}%  ${k}`);
    console.log('[cpu by file]');
    for (const [k, t] of top(byFile, 15)) console.log(`  ${t.toFixed(0).padStart(6)} ms  ${(t / total * 100).toFixed(1).padStart(5)}%  ${k}`);
}
