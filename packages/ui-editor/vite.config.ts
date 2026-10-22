import type { IncomingMessage } from 'node:http';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import { layoutApi } from './layoutApi.ts';

const slashes = (p: string) => p.split('\\').join('/');
const clientSrc = slashes(fileURLToPath(new URL('../client-next/src', import.meta.url)));

function readBody(req: IncomingMessage): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => resolve(new Uint8Array(Buffer.concat(chunks))));
        req.on('error', reject);
    });
}

/** `/api/…`: saving layouts into the overlay and client-next's pack (layoutApi.ts). */
function layouts(): Plugin {
    return {
        name: 'layout-api',
        configureServer: server => {
            server.middlewares.use((req, res, next) => {
                const answer = layoutApi(req.method ?? 'GET', new URL(req.url ?? '/', 'http://local'), () => readBody(req));
                if (!answer) return next();
                void answer.then(r => {
                    res.statusCode = r.status;
                    if (r.type) res.setHeader('content-type', r.type);
                    res.setHeader('cache-control', 'no-store');
                    res.end(r.body);
                });
            });
        },
    };
}

export default defineConfig({
    plugins: [layouts()],
    // relative asset URLs: the build is also loaded by the desktop app (electron/main.ts)
    base: './',
    resolve: {
        // the client's modules import each other as @/…, as in client-next
        alias: { '@': clientSrc },
    },
    server: {
        host: '127.0.0.1',
        port: 5190,
        // the client's source is generated, and its pack is rewritten by saves: neither reloads the editor
        watch: { ignored: path => slashes(path).startsWith(clientSrc + '/') },
    },
    build: {
        target: 'es2023',
        chunkSizeWarningLimit: 16000,
        rolldownOptions: { output: { keepNames: true } },
    },
});
