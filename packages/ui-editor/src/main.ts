// Start the editor: the client's modules and embedded assets loaded as the client loads them, a stage, then the
// client's window system on it and the page around it.

import { Application } from 'pixi.js';
import { Stage } from '@habbo-pixi/runtime/display/Stage';
import { preloadEmbeds } from '@habbo-pixi/runtime/embed/embed';
import { loadNativeFonts } from '@habbo-pixi/runtime/text/air/NativeText';
import { EditorPage } from './EditorPage';
import { EditorRoot } from './EditorRoot';
import { LayoutCatalog } from './LayoutCatalog';
import { LayoutStore } from './LayoutStore';
import { WindowSystem } from './WindowSystem';

// Every client module, loaded up front as the client's main.ts loads them: classes register their AS3 names as
// they load, and the core creates components and windows by name. The component classes among them are where the
// layouts are found.
import.meta.glob('../../client-next/src/**/*.group.ts', { eager: true });
const modules = import.meta.glob<Record<string, unknown>>(
    ['../../client-next/src/**/*.ts', '!../../client-next/src/main.ts', '!../../client-next/src/**/*.group.ts'], { eager: true });

function showProblem(message: string): void {
    console.error(message);
    const status = document.getElementById('status')!;
    status.className = 'error';
    status.textContent = message;
}

const app = new Application();
await app.init({ preference: 'webgl', resizeTo: window, background: '#3a3f47', antialias: false, autoStart: false, sharedTicker: false });
document.body.prepend(app.canvas);

try {
    // the files compiled into the client ([Embed]): skins, fonts and the layouts, from client-next's pack as it is
    // now (saves rewrite it), through the editor's API (relative: the desktop app serves the page on app://)
    await Promise.all([preloadEmbeds('api/pack'), loadNativeFonts()]);
    const stage = new Stage(app);
    stage.frameRate = 60;
    stage.createRoot(EditorRoot);
    stage.start();
    const system = await WindowSystem.start(stage);
    new EditorPage(system, LayoutCatalog.fromModules(modules), new LayoutStore());
    Object.assign(globalThis, { stage, app, system });
} catch (e) {
    showProblem(`The editor failed to start: ${e instanceof Error ? e.stack ?? e.message : String(e)}`);
}
