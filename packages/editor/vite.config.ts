import type { IncomingMessage } from 'node:http';
import { defineConfig, type Plugin } from 'vite';
import { projectApi } from './project.ts';

function readBody(req: IncomingMessage): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => resolve(new Uint8Array(Buffer.concat(chunks))));
        req.on('error', reject);
    });
}

/** `/api/…`: the client's asset pack, for the editor's project mode (project.ts). */
function projectPack(): Plugin {
    return {
        name: 'project-pack',
        configureServer: server => {
            server.middlewares.use((req, res, next) => {
                const answer = projectApi(req.method ?? 'GET', new URL(req.url ?? '/', 'http://local'), () => readBody(req));
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
    plugins: [projectPack()],
    // relative asset URLs: the build is also loaded by the desktop app (electron/main.ts)
    base: './',
    server: { host: '127.0.0.1', port: 5180 },
    build: { target: 'es2023' },
});
