// The asset editor as a desktop app. The page is the editor's build (dist/), served with the
// client's pack API (project.ts) under the app:// scheme, so it runs exactly as on the dev server;
// with EDITOR_DEV_SERVER set (npm run editor:app-dev) it loads the dev server instead, with hot reload.

import { app, BrowserWindow, dialog, net, protocol } from 'electron';
import { join, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { projectApi } from '../project.ts';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const devServer = process.env.EDITOR_DEV_SERVER;

// a standard, secure scheme: relative URLs and fetch() work as on http
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }]);

async function serve(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const api = projectApi(request.method, url, async () => new Uint8Array(await request.arrayBuffer()));
    if (api) {
        const r = await api;
        return new Response(r.body as BodyInit | undefined, { status: r.status, headers: { 'content-type': r.type ?? 'text/plain', 'cache-control': 'no-store' } });
    }
    const file = join(dist, decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!file.startsWith(dist.endsWith(sep) ? dist : dist + sep)) return new Response('', { status: 403 });
    return net.fetch(pathToFileURL(file).toString());
}

function createWindow(): void {
    const window = new BrowserWindow({
        width: 1400, height: 900, title: 'Asset editor', backgroundColor: '#16181d', autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true },
    });
    // the page asks before closing with unsaved changes (beforeunload): Electron leaves the question to the app
    window.webContents.on('will-prevent-unload', event => {
        const choice = dialog.showMessageBoxSync(window, {
            type: 'question', buttons: ['Discard changes', 'Cancel'], defaultId: 1, cancelId: 1,
            title: 'Unsaved changes', message: 'The open pack file has changes that are not saved. Discard them?',
        });
        if (choice === 0) event.preventDefault();
    });
    if (devServer) {
        // the dev server may still be starting (moon runs both at once)
        window.webContents.on('did-fail-load', (_event, _code, _description, url) => { if (url.startsWith(devServer)) setTimeout(() => void window.loadURL(devServer), 500); });
    }
    void window.loadURL(devServer ?? 'app://editor/index.html');
}

void app.whenReady().then(() => {
    protocol.handle('app', serve);
    createWindow();
});
app.on('window-all-closed', () => app.quit());
