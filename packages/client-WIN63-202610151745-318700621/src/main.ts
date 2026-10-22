// Start the client: a PIXI application as the stage's renderer, the stored files and embedded
// assets loaded, the class registries filled, then HabboAir constructed as the stage's root.

import { Application } from 'pixi.js';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import { Stage } from '@habbo-pixi/runtime/display/Stage';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ApplicationDomain } from '@habbo-pixi/runtime/system/ApplicationDomain';
import { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import { preloadEmbeds } from '@habbo-pixi/runtime/embed/embed';
import { runtimeConfig } from '@habbo-pixi/runtime/runtime/config';
import { showFrameStats } from '@habbo-pixi/runtime/runtime/frameStats';
import { loadNativeFonts } from '@habbo-pixi/runtime/text/air/NativeText';
import { loadApplicationFiles, loadFileSystem } from '@habbo-pixi/runtime/filesystem/storage';
import { HabboAir } from '@/com/sulake/habbo/HabboAir';
// the files compiled into the client ([Embed]), packed by the transpiler
import assetPack from './assets.hpa?url';

// Every converted module, loaded up front as the application binary was: classes register their
// AS3 names as they load, and the client creates many by name (getDefinitionByName) that nothing
// imports. Modules that import each other in a loop load through their group index first, which
// runs them in dependency order; the rest can load in any order.
import.meta.glob('./**/*.group.ts', { eager: true });
import.meta.glob(['./**/*.ts', '!./main.ts', '!./**/*.group.ts'], { eager: true });

// The files the application was installed with (its application directory): app-files/, bundled
// by Vite and fetched into the directory before the client starts.
const applicationFiles = Object.entries(import.meta.glob('../app-files/**/*', { query: '?url', import: 'default', eager: true }) as Record<string, string>)
    .map(([file, url]) => ({ path: file.replace(/^\.\.\/app-files\//, ''), url }));

/** Show a start-up problem on the page itself (a black canvas says nothing). */
function showProblem(message: string): void {
    console.error(message);
    const box = document.createElement('pre');
    box.textContent = message;
    box.style.cssText = 'position:fixed;left:16px;bottom:16px;margin:0;padding:8px 12px;background:#300;color:#fcc;font:12px monospace;z-index:10;white-space:pre-wrap';
    document.body.appendChild(box);
}

// Crash reports for what the client's own crash handling never sees: errors outside the runtime's guarded callbacks
// (promises, listeners it did not wrap), a lost GPU context, and a page that died without closing (out of memory, a
// killed tab), told at the next start. They go out through HabboAir's own report, not fatal, so nothing changes on
// screen, and never to Habbo.
const CrashCategory = { UncaughtError: 90, UnhandledRejection: 91, SessionDied: 92, GpuContextLost: 93 } as const;

// HabboAir keeps Habbo's own crash address unless the launcher passes url.prefix, which a page cannot: every report,
// the crash screen's too, went to Habbo. Ours is the page's own origin: the hotel routes /flash_client_error to the
// game server, and the dev server passes it on to the local one.
(HabboAir as unknown as { _crashReportUrl: string })._crashReportUrl = `${location.origin}/flash_client_error`;
const pendingReports: [description: string, category: number, stack: string][] = [];

/** Where HabboAir sends its reports, when that is our own server. */
function ownCrashReportUrl(): string | null {
    try {
        const url = new URL((HabboAir as unknown as { _crashReportUrl: string })._crashReportUrl);
        return /(^|\.)habbo\.[a-z.]+$/.test(url.hostname) ? null : url.href;
    } catch {
        return null;
    }
}

function reportProblem(description: string, category: number, stack: string = ''): void {
    if (pendingReports.length < 10) pendingReports.push([description, category, stack]);
}

// HabboAir sends at most one report per 15 seconds, so the queue goes out one at a time, once the address is ours
setInterval(() => {
    const next = ownCrashReportUrl() ? pendingReports.shift() : undefined;
    if (next) HabboAir.reportCrashStack(next[0], next[1], false, next[2]);
}, 16000);

window.addEventListener('error', e => {
    if (e.error || e.message)
        reportProblem(`Uncaught error: ${e.message}`, CrashCategory.UncaughtError, e.error?.stack ?? `${e.filename}:${e.lineno}:${e.colno}`);
});
window.addEventListener('unhandledrejection', e => {
    const reason = e.reason as { message?: string; stack?: string } | undefined;
    reportProblem(`Unhandled promise rejection: ${reason?.message ?? String(e.reason)}`, CrashCategory.UnhandledRejection, reason?.stack ?? '');
});

// Every open page keeps a record while it is in front, sampled every few seconds and closed when it is hidden or left.
// One still open but not seen for a while, found at the next start, is a page that died: it is reported and let go.
const sessionsKey = 'hotel.sessions';
const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
interface SessionRecord { open: boolean; startedAt: number; seenAt: number; heapMb: number | null }
const startedAt = Date.now();

function readSessions(): Record<string, SessionRecord> {
    try {
        return JSON.parse(localStorage.getItem(sessionsKey) ?? '{}') as Record<string, SessionRecord>;
    } catch {
        return {};
    }
}

function writeSession(open: boolean): void {
    const memory = (performance as { memory?: { usedJSHeapSize: number } }).memory;
    const sessions = readSessions();
    sessions[sessionId] = { open, startedAt, seenAt: Date.now(), heapMb: memory ? Math.round(memory.usedJSHeapSize / 1048576) : null };
    try {
        localStorage.setItem(sessionsKey, JSON.stringify(sessions));
    } catch {
        // storage full or blocked: no record, no report
    }
}

{
    const sessions = readSessions();
    for (const [id, s] of Object.entries(sessions)) {
        // a live page writes every 10 seconds; one quiet for a minute is gone, and a closed one ended cleanly
        if (s.open && Date.now() - s.seenAt > 60000)
            reportProblem(`The previous session ended without closing: the tab crashed, ran out of memory or was killed (started ${new Date(s.startedAt).toISOString()}, last seen ${new Date(s.seenAt).toISOString()}, ${s.heapMb ?? '?'} MB in use)`, CrashCategory.SessionDied);
        if (!s.open || Date.now() - s.seenAt > 60000) delete sessions[id];
    }
    try {
        localStorage.setItem(sessionsKey, JSON.stringify(sessions));
    } catch {
        // as above
    }
    writeSession(document.visibilityState === 'visible');
    setInterval(() => { if (document.visibilityState === 'visible') writeSession(true); }, 10000);
    document.addEventListener('visibilitychange', () => writeSession(document.visibilityState === 'visible'));
    window.addEventListener('pagehide', () => writeSession(false));
}

// ?ticket= as Habbo's login page gives it, hhus.<ticket>.<username>: the hotel prefix and the name after the version
// are the launcher's, which splits them off, and the game server refuses the whole string (disconnect reason 22).
// The bare ticket replaces it in the address before the client reads its arguments; our own server's tickets have
// no version part and are left as they are
const givenTicket = new URLSearchParams(location.search).get('ticket');
const bareTicket = givenTicket?.match(/^(?:hh[a-z]+\.)?(.+?\.V\d+)(?:\..*)?$/)?.[1];
if (bareTicket && bareTicket !== givenTicket) {
    const params = new URLSearchParams(location.search);
    params.set('ticket', bareTicket);
    history.replaceState(history.state, '', `${location.pathname}?${params}${location.hash}`);
}

// ?relay=8791 (a port on this machine, or a ws:// URL): game servers off this machine (Habbo's own hotels) are reached
// through the relay (the Habbo server repository's tools/Habbo.Relay), which carries the WebSocket to their TCP port:
// a page cannot open TCP itself
const relay = new URLSearchParams(location.search).get('relay');
if (relay) {
    const base = /^\d+$/.test(relay) ? `ws://localhost:${relay}` : relay.replace(/^http/, 'ws').replace(/\/+$/, '');
    const direct = runtimeConfig.socketUrl;
    const local = (host: string) => host === 'localhost' || host === '::1' || host === '[::1]' || host.startsWith('127.');
    runtimeConfig.socketUrl = (host, port) => local(host) ? direct(host, port) : `${base}/game?host=${encodeURIComponent(host)}&port=${port}`;
}

// ?copier=8791 (the relay's port, or its URL): :copy in a room copies it for the Habbo server's room import, and the
// relay saves it (@habbo-pixi/room-copier, on the game connection's packet taps); loaded only when asked for
const copier = new URLSearchParams(location.search).get('copier');
if (copier) {
    const { startRoomCopier } = await import('@habbo-pixi/room-copier');
    startRoomCopier(copier);
}

// ?renderer=webgl|webgpu|canvas picks the renderer (default: WebGL, as PIXI chooses)
const requested = new URLSearchParams(location.search).get('renderer');
const preference = requested === 'webgpu' || requested === 'canvas' ? requested : 'webgl';

const app = new Application();
// the stage runs the frame loop and renders once per frame itself
await app.init({ preference, resizeTo: window, background: '#000000', antialias: false, autoStart: false, sharedTicker: false });
document.body.appendChild(app.canvas);

const gl = (app.renderer as { gl?: WebGLRenderingContext }).gl;
const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
console.info(`renderer: ${app.renderer.name}${debugInfo && gl ? ` (${gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)} / ${gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)})` : ''}`);
app.canvas.addEventListener('webglcontextlost', () => {
    showProblem(`The ${app.renderer.name} context was lost (the GPU reset or dropped it). Reload, or try ?renderer=canvas.`);
    reportProblem(`The ${app.renderer.name} context was lost (the GPU reset or dropped it)`, CrashCategory.GpuContextLost);
});

try {
    await Promise.all([loadFileSystem().then(() => loadApplicationFiles(applicationFiles)), preloadEmbeds(assetPack), loadNativeFonts()]);
    const stage = new Stage(app);
    // the frame rate HabboAir's SWF declares ([SWF(frameRate="60")]); the canvas follows the window
    stage.frameRate = 60;
    // frames on every screen refresh until the client sets a rate (:fps), as Habbo's web client runs: what follows
    // the pointer (a dragged window) keeps up with it on a fast display
    stage.runAtDisplayRate();
    const root = stage.createRoot(HabboAir);
    if (runtimeConfig.showFrameStats()) showFrameStats();
    stage.start();
    console.info(`client started on ${location.href} (domain ${location.hostname})`);
    setTimeout(() => {
        // something stopped the client before it showed anything
        if (root.numChildren === 0 && stage.numChildren <= 1) showProblem(`The client stopped before showing anything (page: ${location.href}).`);
    }, 5000);
    // for poking at the running client from the browser console
    Object.assign(globalThis, { stage, app, runtime: { Loader, URLRequest, ApplicationDomain, LoaderContext } });
} catch (e) {
    showProblem(`The client failed to start: ${e instanceof Error ? e.stack ?? e.message : String(e)}`);
}
