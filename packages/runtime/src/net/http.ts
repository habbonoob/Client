// Shared request plumbing for URLLoader, URLStream and Loader: turns a URLRequest into a fetch and
// reports progress while the body streams in.

import { File } from '@habbo-pixi/runtime/filesystem/File';
import { files } from '@habbo-pixi/runtime/filesystem/storage';
import { runtimeConfig } from '@habbo-pixi/runtime/runtime/config';
import { ByteArray, byteArrayAccess } from '@habbo-pixi/runtime/utils/ByteArray';
import type { URLRequest } from './URLRequest';
import { URLVariables } from './URLVariables';

export interface Response {
    status: number;
    url: string;
    redirected: boolean;
    headers: { name: string; value: string }[];
}

export interface StreamHandlers {
    /** The request went out. */
    open(): void;
    /** The response status and headers arrived. */
    status(r: Response): void;
    /** More of the body arrived. */
    chunk(data: Uint8Array, loaded: number, total: number): void;
    /** The whole body arrived. */
    done(): void;
    /** The request failed (network error, HTTP error status, or aborted). */
    error(message: string, status: number): void;
}

/** Start a request; returns a function that aborts it. */
export function request(req: URLRequest, h: StreamHandlers): () => void {
    const abort = new AbortController();
    const method = (req.method || 'GET').toUpperCase();
    // a relative URL is relative to the application, as on the desktop (app:/), not to the web page
    let url = /^[a-z][a-z0-9+.-]*:|^\/\//i.test(req.url ?? '') ? req.url : `app:/${(req.url ?? '').replace(/^\/+/, '')}`;
    let body: BodyInit | undefined;
    const headers = new Headers();
    for (const hd of req.requestHeaders ?? []) headers.set(hd.name, hd.value);
    const data = req.data;
    if (data != null) {
        if (method === 'GET' || method === 'HEAD') {
            const q = data instanceof URLVariables ? data.toString() : String(data);
            if (q) url += (url.includes('?') ? '&' : '?') + q;
        } else if (data instanceof ByteArray) {
            body = byteArrayAccess.view(data).slice();
            headers.set('Content-Type', req.contentType ?? 'application/octet-stream');
        } else {
            body = data instanceof URLVariables ? data.toString() : String(data);
            headers.set('Content-Type', req.contentType ?? 'application/x-www-form-urlencoded');
        }
    }
    // the application's own files (app:, app-storage:, cache:) come from its file tree, as on the desktop
    if (/^(app|app-storage|cache):/.test(url)) return readLocalFile(url, h);
    // reads of other sites go where runtimeConfig says (the desktop app had no cross-origin rules)
    const absolute = new URL(url, location.href);
    if ((method === 'GET' || method === 'HEAD') && /^https?:$/.test(absolute.protocol) && absolute.origin !== location.origin) {
        url = runtimeConfig.remoteUrl(absolute.toString());
    }
    const asked = absolute.toString();
    void (async () => {
        let status = 0;
        try {
            h.open();
            const res = await fetch(url, {
                method, body, headers, signal: abort.signal,
                // the page's own cookies only: sending them cross-site is refused by servers that
                // allow any origin (the client never relied on cross-site cookies)
                credentials: req.manageCookies ? 'same-origin' : 'omit',
                redirect: req.followRedirects ? 'follow' : 'manual',
                cache: req.cacheResponse ? 'default' : 'no-store',
            });
            status = res.status;
            const list: { name: string; value: string }[] = [];
            res.headers.forEach((value, name) => list.push({ name, value }));
            h.status({ status, url: url === asked ? res.url : asked, redirected: res.redirected, headers: list });
            if (!res.ok) {
                h.error(`Stream Error. HTTP ${status}. URL: ${asked}`, status);
                return;
            }
            const total = Number(res.headers.get('Content-Length')) || 0;
            let loaded = 0;
            if (res.body) {
                const reader = res.body.getReader();
                for (;;) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    loaded += value.length;
                    h.chunk(value, loaded, Math.max(total, loaded));
                }
            }
            h.done();
        } catch (e) {
            if (abort.signal.aborted) return;
            h.error(`Stream Error. URL: ${asked}${e instanceof Error ? ` (${e.message})` : ''}`, status);
        }
    })();
    return () => abort.abort();
}

/** A request for one of the application's files: answered from its file tree, asynchronously like any load. */
function readLocalFile(url: string, h: StreamHandlers): () => void {
    let cancelled = false;
    setTimeout(() => {
        if (cancelled) return;
        h.open();
        const data = files.read(new File(url.replace(/[?#].*$/, '')).key());
        if (!data) {
            h.error(`Stream Error. File not found. URL: ${url}`, 0);
            return;
        }
        // (no HTTP status: a file has none)
        h.chunk(data, data.length, data.length);
        h.done();
    }, 0);
    return () => { cancelled = true; };
}

/** Concatenate received chunks. */
export function join(chunks: Uint8Array[]): Uint8Array<ArrayBuffer> {
    const out = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
    let p = 0;
    for (const c of chunks) { out.set(c, p); p += c.length; }
    return out;
}

export function bytesToByteArray(data: Uint8Array): ByteArray {
    return byteArrayAccess.from(data);
}
