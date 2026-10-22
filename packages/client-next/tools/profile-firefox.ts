// profile.ts for Firefox: load a page in headless Firefox (over WebDriver BiDi) with its profiler running, let it
// settle, sample the frame stats panel, then report where the page's process and the compositor spend their time.
// Usage: node tools/profile-firefox.ts <url> [settle seconds=40] [profile seconds=10] [out dir=.]
// ROOM=<id> goes into that room once logged in, then settles again; MOUSE=x,y rests the pointer there; DRAG=x,y
// holds the button down there and circles the pointer while the frame stats are sampled (dragging the room). FIREFOX names
// the browser (default: firefox on the PATH). The profile is the Gecko profiler's (MOZ_PROFILER_STARTUP, kept for the
// last `profile seconds`), written when Firefox closes: <out>/profile-firefox.json, which profiler.firefox.com opens.

import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const [url, settle = '40', seconds = '10', out = '.'] = process.argv.slice(2);
if (!url) throw new Error('usage: node tools/profile-firefox.ts <url> [settle seconds] [profile seconds] [out dir]');
const port = 9335;
const profileFile = resolve(out, 'profile-firefox.json');
const userDir = mkdtempSync(join(tmpdir(), 'profile-ff-'));
// no telemetry, no first-run pages; the GPU used as a desktop Firefox uses it
writeFileSync(join(userDir, 'user.js'), [
    'user_pref("datareporting.policy.dataSubmissionEnabled", false);',
    'user_pref("toolkit.telemetry.enabled", false);',
    'user_pref("browser.shell.checkDefaultBrowser", false);',
    'user_pref("webgl.force-enabled", true);',
    // FFPREFS='name=value;...' adds prefs (layout.frame_rate=0: frames as fast as they can be made)
    ...(process.env.FFPREFS ?? '').split(';').filter(Boolean).map(p => { const [k, v] = p.split('='); return `user_pref("${k}", ${v});`; }),
].join('\n'));
const firefox = spawn(process.env.FIREFOX ?? 'firefox', ['--headless', '--no-remote', '--profile', userDir, `--remote-debugging-port=${port}`, '--width=1920', '--height=1080'], {
    stdio: 'ignore',
    env: {
        ...process.env,
        MOZ_PROFILER_STARTUP: '1',
        MOZ_PROFILER_STARTUP_DURATION: String(Number(seconds) + 2),
        MOZ_PROFILER_STARTUP_ENTRIES: '64000000',
        MOZ_PROFILER_STARTUP_FEATURES: 'js,stackwalk,cpu',
        MOZ_PROFILER_STARTUP_FILTERS: 'GeckoMain,Compositor,Renderer,RenderBackend,CanvasRenderer',
        MOZ_PROFILER_SHUTDOWN: profileFile,
        // a crash (it happens at start-up, now and then, in fontconfig) is not reported in a dialog on the desktop
        MOZ_CRASHREPORTER_DISABLE: '1',
    },
});
// the browser goes with the tool, however it ends (a timeout's signal too)
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => process.exit(1));
process.on('exit', () => firefox.kill());

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
    // the page's errors (a client that does not start shows only black)
    if (m.method === 'log.entryAdded' && m.params.level === 'error') console.log(`[error] ${String(m.params.text).slice(0, 300)}`);
});
await send('session.new', { capabilities: {} });
await send('session.subscribe', { events: ['log.entryAdded'] });
const context = (await send('browsingContext.getTree', {})).contexts[0].context;
const evaluate = async (expression: string) => (await send('script.evaluate', { expression, target: { context }, awaitPromise: true, resultOwnership: 'none' }))?.result?.value;

await send('browsingContext.navigate', { context, url, wait: 'complete' });
await sleep(Number(settle) * 1000);
if (process.env.ROOM) {
    console.log('[room] ' + await evaluate(`(() => { const core = globalThis.stage?.getChildAt(0)?._core; if (!core) return 'no core yet'; core.createLinkEvent('navigator/goto/${Number(process.env.ROOM)}'); return 'going to ${Number(process.env.ROOM)}'; })()`));
    await sleep(Number(settle) * 1000);
}
if (process.env.MOUSE) {
    const [x, y] = process.env.MOUSE.split(',').map(Number);
    await send('input.performActions', { context, actions: [{ type: 'pointer', id: 'mouse', actions: [{ type: 'pointerMove', x, y }] }] });
}
console.log('[gpu] ' + await evaluate(`(() => { const gl = document.createElement('canvas').getContext('webgl2'); const e = gl?.getExtension('WEBGL_debug_renderer_info'); return (e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : gl?.getParameter(gl.RENDERER)) + ' · renderer ' + ({ 1: 'webgl', 2: 'webgpu', 4: 'canvas' })[globalThis.app?.renderer?.type]; })()`));

await evaluate(`(() => { const s = globalThis.__profile = { panel: [] }; const panel = [...document.body.children].find(e => / fps \\//.test(e.textContent)); s.timer = setInterval(() => s.panel.push(panel?.textContent ?? ''), 500); })()`);
if (process.env.DRAG) {
    const [x, y] = process.env.DRAG.split(',').map(Number);
    const moves = Array.from({ length: Math.round(Number(seconds) * 120) }, (_, i) => ({ type: 'pointerMove', x: Math.round(x + 150 * Math.sin(i / 60 * Math.PI)), y: Math.round(y + 150 * (Math.cos(i / 60 * Math.PI) - 1)), duration: 8 }));
    await send('input.performActions', { context, actions: [{ type: 'pointer', id: 'mouse', actions: [{ type: 'pointerMove', x, y }, { type: 'pointerDown', button: 0 }, ...moves, { type: 'pointerUp', button: 0 }] }] });
} else {
    await sleep(Number(seconds) * 1000);
}
const panel = await evaluate(`(() => { clearInterval(globalThis.__profile.timer); return JSON.stringify(globalThis.__profile.panel.slice(-4)); })()`);
for (const line of JSON.parse(panel ?? '[]')) console.log(`[panel] ${line}`);
const png = await send('browsingContext.captureScreenshot', { context });
if (png?.data) writeFileSync(join(out, 'profile-firefox.png'), Buffer.from(png.data, 'base64'));

// closed cleanly, so the profiler writes its file
await send('browser.close', {});
for (let i = 0; i < 60 && firefox.exitCode === null; i++) await sleep(500);
summarise(JSON.parse(readFileSync(profileFile, 'utf8')));
process.exit(0);

/**
 * The page's thread (the one running the page's own scripts): the share of its time under the page's code, and that
 * time by the innermost page function on the stack (what it calls into, WebGL included, counts as its own). Native
 * frames have no names (no symbols for this Firefox), so the browser's own threads are left out.
 */
function summarise(profile: any): void {
    const threads: any[] = [];
    const collect = (p: any) => { threads.push(...(p.threads ?? [])); for (const sub of p.processes ?? []) collect(sub); };
    collect(profile);
    const page = new URL(url).origin;
    for (const t of threads) {
        const s = t.samples, stacks = t.stackTable, frames = t.frameTable, strings: string[] = t.stringTable;
        if (!s?.data?.length) continue;
        const si = s.schema, ss = stacks.schema, fs = frames.schema;
        const counts = new Map<string, number>();
        let total = 0, inPage = 0;
        for (const row of s.data) {
            total++;
            let fn: string | null = null;
            for (let st = row[si.stack]; st != null && !fn; st = stacks.data[st][ss.prefix]) {
                const loc = strings[frames.data[stacks.data[st][ss.frame]][fs.location]];
                if (loc.includes(page)) fn = loc.replace(/\(?https?:\/\/[^/]+\/(?:client\/)?assets\//, '(').replace(/-[A-Za-z0-9_]{8}\.js/, '.js');
            }
            if (!fn) continue;
            inPage++;
            counts.set(fn, (counts.get(fn) ?? 0) + 1);
        }
        if (inPage < 50) continue;
        console.log(`[page thread] ${t.name} (${t.processType}, pid ${t.pid}): ${total} samples (1 ms), ${((inPage / total) * 100).toFixed(0)}% under the page's code`);
        for (const [k, n] of [...counts].sort((a, b) => b[1] - a[1]).slice(0, 30)) console.log(`  ${((n / total) * 100).toFixed(1).padStart(5)}%  ${k.slice(0, 150)}`);
    }
}
