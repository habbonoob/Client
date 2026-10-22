import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/** The hotel server in development. In production the website, the client and the server share one origin, so the
 * session cookie the API sets is the website's own; the dev server keeps it that way by passing these paths on. */
const server = process.env.HOTEL_SERVER ?? 'http://localhost:8080';
const proxied = ['/api', '/gamedata', '/mirror', '/habbo-imaging', '/healthz'];

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: {
        port: 5175,
        strictPort: true,
        proxy: Object.fromEntries(proxied.map(path => [path, { target: server, changeOrigin: false }])),
    },
    preview: { port: 5175, strictPort: true },
});
