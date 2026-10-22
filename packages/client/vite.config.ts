import type { IncomingMessage, ServerResponse } from 'node:http';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';

const slashes = (p: string) => p.split('\\').join('/');
const src = slashes(fileURLToPath(new URL('./src', import.meta.url)));
// src/ is the transpiler's output, except main.ts: it is not watched file by file (a regeneration
// would reload the page once per file)
const generated = (path: string) => {
    const p = slashes(path);
    return p.startsWith(src + '/') && p !== `${src}/main.ts`;
};

/** Reload the page once after a regeneration: the transpiler touches .transpiled when it changed anything. */
function reloadAfterTranspile(): Plugin {
    const marker = slashes(fileURLToPath(new URL('./.transpiled', import.meta.url)));
    return {
        name: 'reload-after-transpile',
        configureServer(server) {
            server.watcher.add(marker);
            const reload = (path: string) => { if (slashes(path) === marker) server.ws.send({ type: 'full-reload' }); };
            server.watcher.on('add', reload);
            server.watcher.on('change', reload);
        },
    };
}

/**
 * `/__remote?url=…`: the client reads other sites as the desktop app could, without the browser's
 * cross-origin rules (Habbo's gamedata sends no CORS headers). Reads only (GET/HEAD, http/https):
 * nothing the client posts leaves through here. See runtime/config.ts `remoteUrl`.
 */
function remoteReads(): Plugin {
    const handle = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (!req.url?.startsWith('/__remote?')) return next();
        const target = new URL(req.url, 'http://local').searchParams.get('url') ?? '';
        if (!/^https?:\/\//i.test(target) || (req.method !== 'GET' && req.method !== 'HEAD')) {
            res.statusCode = 400;
            res.end('reads of http(s) URLs only');
            return;
        }
        try {
            const upstream = await fetch(target, { method: req.method, redirect: 'follow', headers: { 'User-Agent': req.headers['user-agent'] ?? 'Mozilla/5.0' } });
            res.statusCode = upstream.status;
            for (const h of ['content-type', 'last-modified', 'etag', 'cache-control']) {
                const v = upstream.headers.get(h);
                if (v) res.setHeader(h, v);
            }
            res.end(req.method === 'HEAD' ? undefined : Buffer.from(await upstream.arrayBuffer()));
        } catch (e) {
            res.statusCode = 502;
            res.end(`remote read failed: ${e instanceof Error ? e.message : String(e)}`);
        }
    };
    return {
        name: 'remote-reads',
        configureServer: server => { server.middlewares.use((req, res, next) => void handle(req, res, next)); },
        configurePreviewServer: server => { server.middlewares.use((req, res, next) => void handle(req, res, next)); },
    };
}

export default defineConfig({
    plugins: [remoteReads(), reloadAfterTranspile()],
    resolve: {
        alias: { '@': src },
    },
    server: {
        // not localhost: the client's site lock refuses to run there
        host: '127.0.0.1',
        watch: { ignored: generated },
    },
    preview: {
        // every interface: the preview is reachable from other machines on the network
        host: '0.0.0.0',
    },
    build: {
        target: 'es2023',
        chunkSizeWarningLimit: 16000,
        // class names stay readable in the bundle too (logs and errors show them)
        rolldownOptions: { output: { keepNames: true } },
    },
    esbuild: {
        // class names are shown in logs and errors, as getQualifiedClassName output was in AS3
        //keepNames: true,
    },
});
