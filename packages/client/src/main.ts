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
});

try {
    await Promise.all([loadFileSystem().then(() => loadApplicationFiles(applicationFiles)), preloadEmbeds(assetPack), loadNativeFonts()]);
    const stage = new Stage(app);
    // the frame rate HabboAir's SWF declares ([SWF(frameRate="60")]); the canvas follows the window
    stage.frameRate = 60;
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
