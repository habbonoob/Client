// The UI editor as a desktop app. The page is the editor's build (dist/), served with the layout API
// (layoutApi.ts) under the app:// scheme, so it runs exactly as on the dev server; with UI_EDITOR_DEV_SERVER set
// (npm run ui-editor:app-dev) it loads the dev server instead, with hot reload.

import { app, BrowserWindow, dialog, Menu, net, protocol } from 'electron';
import { join, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layoutApi } from '../layoutApi.ts';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const devServer = process.env.UI_EDITOR_DEV_SERVER;

// a standard, secure scheme: relative URLs and fetch() work as on http
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }]);

async function serve(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const api = layoutApi(request.method, url, async () => new Uint8Array(await request.arrayBuffer()));
    if (api) {
        const r = await api;
        return new Response(r.body as BodyInit | undefined, { status: r.status, headers: { 'content-type': r.type ?? 'text/plain', 'cache-control': 'no-store' } });
    }
    const file = join(dist, decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!file.startsWith(dist.endsWith(sep) ? dist : dist + sep)) return new Response('', { status: 403 });
    return net.fetch(pathToFileURL(file).toString());
}

/**
 * The app's menu: the editor's commands, with their shortcuts shown. Each sends the page the same keystroke the
 * page handles itself (so the shortcuts work the same in the browser), except the ones Electron has roles for.
 */
function menu(window: BrowserWindow): Menu {
    const key = (keyCode: string, modifiers: ('control' | 'shift' | 'alt')[] = []) => () => {
        window.webContents.sendInputEvent({ type: 'keyDown', keyCode, modifiers });
        window.webContents.sendInputEvent({ type: 'keyUp', keyCode, modifiers });
    };
    return Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                { label: 'Save', accelerator: 'CmdOrCtrl+S', click: key('S', ['control']) },
                { type: 'separator' },
                { role: 'quit' },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'CmdOrCtrl+Z', click: key('Z', ['control']) },
                { label: 'Redo', accelerator: 'CmdOrCtrl+Y', click: key('Y', ['control']) },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'CmdOrCtrl+X', click: key('X', ['control']) },
                { label: 'Copy', accelerator: 'CmdOrCtrl+C', click: key('C', ['control']) },
                { label: 'Paste', accelerator: 'CmdOrCtrl+V', click: key('V', ['control']) },
                { label: 'Duplicate', accelerator: 'CmdOrCtrl+D', click: key('D', ['control']) },
                { label: 'Delete', accelerator: 'Delete', click: key('Delete') },
                { type: 'separator' },
                { label: 'Select parent', accelerator: 'Alt+Up', click: key('Up', ['alt']) },
                { label: 'Select first child', accelerator: 'Alt+Down', click: key('Down', ['alt']) },
                { label: 'Deselect', accelerator: 'Escape', click: key('Escape') },
            ],
        },
        {
            label: 'View',
            submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }, { type: 'separator' }, { role: 'togglefullscreen' }],
        },
    ]);
}

function createWindow(): void {
    const window = new BrowserWindow({
        width: 1500, height: 950, title: 'UI editor', backgroundColor: '#3a3f47',
        webPreferences: { contextIsolation: true, sandbox: true },
    });
    window.setMenu(menu(window));
    // the page asks before closing with unsaved changes (beforeunload): Electron leaves the question to the app
    window.webContents.on('will-prevent-unload', event => {
        const choice = dialog.showMessageBoxSync(window, {
            type: 'question', buttons: ['Discard changes', 'Cancel'], defaultId: 1, cancelId: 1,
            title: 'Unsaved changes', message: 'The open layout has changes that are not saved. Discard them?',
        });
        if (choice === 0) event.preventDefault();
    });
    if (devServer) {
        // the dev server may still be starting (moon runs both at once)
        window.webContents.on('did-fail-load', (_event, _code, _description, url) => { if (url.startsWith(devServer)) setTimeout(() => void window.loadURL(devServer), 500); });
    }
    void window.loadURL(devServer ?? 'app://ui-editor/index.html');
}

void app.whenReady().then(() => {
    protocol.handle('app', serve);
    createWindow();
});
app.on('window-all-closed', () => app.quit());
