import { Event } from '@habbo-pixi/runtime/events/Event';
import { HTTPStatusEvent } from '@habbo-pixi/runtime/events/HTTPStatusEvent';
import { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import { request, join } from '@habbo-pixi/runtime/net/http';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import { ApplicationDomain } from '@habbo-pixi/runtime/system/ApplicationDomain';
import type { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import { byteArrayAccess, type ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Bitmap } from './Bitmap';
import { BitmapData } from './BitmapData';
import type { DisplayObject } from './DisplayObject';
import { DisplayObjectContainer } from './DisplayObjectContainer';
import { habLibrary, habUrls, isHab, libraryClass, readHab } from './hab';
import { LoaderInfo } from './LoaderInfo';
import { MovieClip } from './MovieClip';

/**
 * Loads an image (PNG, JPEG or GIF) or an asset library from a URL or bytes. An image becomes the
 * content as a Bitmap. An asset library the client names as "X.swf" is loaded as "X.hab" from the
 * same place (see hab.ts): its library class is defined in the application domain of the load, and
 * the content is its (empty) main timeline, as for a SWF. contentLoaderInfo dispatches open,
 * progress and httpStatus while downloading, then init and complete once the content is ready, or
 * ioError.
 */
export class Loader extends DisplayObjectContainer {
    readonly contentLoaderInfo: LoaderInfo;
    #content: DisplayObject | null = null;
    #abort: (() => void) | null = null;
    #generation = 0;

    constructor() {
        super();
        this.contentLoaderInfo = new LoaderInfo(this);
    }

    get content(): DisplayObject | null {
        return this.#content;
    }

    load(req: URLRequest, context: LoaderContext = null): void {
        this.unload();
        const gen = ++this.#generation;
        const info = this.contentLoaderInfo;
        info.url = req.url;
        info.bytesLoaded = info.bytesTotal = 0;
        const path = req.url.split('?')[0];
        if (/\.(swf|hab)$/i.test(path)) {
            this.#loadLibrary(req, habUrls(req.url), [], context, gen);
            return;
        }
        this.#fetch(req, gen, data => void this.#decode(data, context, gen), message => {
            info.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, message));
        });
    }

    loadBytes(bytes: ByteArray, context: LoaderContext = null): void {
        this.unload();
        const gen = ++this.#generation;
        const data = byteArrayAccess.view(bytes).slice();
        const info = this.contentLoaderInfo;
        info.url = null;
        info.bytesLoaded = info.bytesTotal = data.length;
        void this.#decode(data, context, gen);
    }

    /** Stop a download in progress. */
    close(): void {
        this.#abort?.();
        this.#abort = null;
        this.#generation++;
    }

    /** Remove the loaded content. */
    unload(): void {
        this.close();
        if (!this.#content) return;
        const content = this.#content;
        this.#content = null;
        this.contentLoaderInfo.content = null;
        if (content.parent === this) this.removeChild(content);
        this.contentLoaderInfo.dispatchEvent(new Event(Event.UNLOAD));
    }

    /** Download with progress events; `done` gets the bytes, `failed` a message. */
    #fetch(req: URLRequest, gen: number, done: (data: Uint8Array<ArrayBuffer>) => void, failed: (message: string) => void, reportStatus = true): void {
        const info = this.contentLoaderInfo;
        const chunks: Uint8Array[] = [];
        this.#abort = request(req, {
            open: () => runGuarded(() => { if (reportStatus) info.dispatchEvent(new Event(Event.OPEN)); }),
            status: r => runGuarded(() => {
                if (reportStatus || (r.status > 0 && r.status < 400)) info.dispatchEvent(new HTTPStatusEvent(HTTPStatusEvent.HTTP_STATUS, false, false, r.status, r.redirected));
            }),
            chunk: (data, loaded, total) => runGuarded(() => {
                chunks.push(data);
                info.bytesLoaded = loaded;
                info.bytesTotal = total;
                info.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, false, false, loaded, total));
            }),
            done: () => { this.#abort = null; if (gen === this.#generation) done(join(chunks)); },
            error: message => runGuarded(() => { this.#abort = null; if (gen === this.#generation) failed(message); }),
        });
    }

    /** Try the library's HAB URLs in order (js-client's order); the first that loads is used. */
    #loadLibrary(original: URLRequest, urls: string[], failures: string[], context: LoaderContext | null, gen: number): void {
        const info = this.contentLoaderInfo;
        const url = urls[0];
        if (url === undefined) {
            info.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, `Stream Error. No HAB library at ${failures.join(', ')}`));
            return;
        }
        const req = new URLRequest(url);
        req.method = original.method;
        req.requestHeaders = original.requestHeaders;
        // only the last candidate's failure is reported as an HTTP status: the others just move on
        this.#fetch(req, gen, data => void this.#decode(data, context, gen), message => {
            if (urls.length > 1) this.#loadLibrary(original, urls.slice(1), [...failures, `${url} (${message})`], context, gen);
            else info.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, [...failures, message].join('; ')));
        }, urls.length === 1);
    }

    async #decode(data: Uint8Array<ArrayBuffer>, context: LoaderContext | null, gen: number): Promise<void> {
        const info = this.contentLoaderInfo;
        const fail = (text: string) => runGuarded(() => info.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, text)));
        if (isHab(data)) return this.#decodeLibrary(data, context, gen, fail);
        const kind = sniff(data);
        if (kind === 'swf') return fail(`${info.url ?? 'Loaded bytes'}: SWF content can't be loaded; asset libraries load as .hab.`);
        if (!kind) return fail(`${info.url ?? 'Loaded bytes'}: unrecognised content (not an image or a HAB library).`);
        let image: ImageBitmap;
        try {
            image = await createImageBitmap(new Blob([data], { type: kind }));
        } catch {
            return fail(`${info.url ?? 'Loaded bytes'}: the image could not be decoded.`);
        }
        if (gen !== this.#generation) { image.close(); return; }
        runGuarded(() => {
            const bitmap = new Bitmap(BitmapData.fromImage(image));
            image.close();
            this.#content = bitmap;
            info.content = bitmap;
            info.contentType = kind;
            info.width = bitmap.bitmapData!.width;
            info.height = bitmap.bitmapData!.height;
            info.applicationDomain = context?.applicationDomain ?? new ApplicationDomain(ApplicationDomain.currentDomain);
            this.addChild(bitmap);
            info.dispatchEvent(new Event(Event.INIT));
            info.dispatchEvent(new Event(Event.COMPLETE));
        });
    }

    async #decodeLibrary(data: Uint8Array, context: LoaderContext | null, gen: number, fail: (text: string) => void): Promise<void> {
        const info = this.contentLoaderInfo;
        // the library is named after the file it was asked for ("…/TileCursor.swf" → TileCursor)
        const name = (info.url ?? '').split('?')[0].split(/[\\/]/).pop()!.replace(/\.[^.]*$/, '');
        let lib;
        try {
            const bundle = readHab(data);
            lib = { bundle, library: habLibrary(bundle, name) };
        } catch (e) {
            return fail(`${info.url}: ${e instanceof Error ? e.message : String(e)}`);
        }
        const sheets = new Map<string, BitmapData>();
        try {
            for (const [entry, bytes] of lib.library.images) {
                const image = await createImageBitmap(new Blob([bytes as Uint8Array<ArrayBuffer>], { type: 'image/png' }));
                sheets.set(entry, BitmapData.fromImage(image));
                image.close();
            }
        } catch {
            return fail(`${info.url}: an image in the library could not be decoded.`);
        }
        if (gen !== this.#generation) return;
        runGuarded(() => {
            const domain = context?.applicationDomain ?? new ApplicationDomain(ApplicationDomain.currentDomain);
            const cls = libraryClass(lib.library, sheets);
            domain.define(name, cls);
            if (lib.bundle.name && lib.bundle.name !== name) domain.define(lib.bundle.name, cls);
            const timeline = new MovieClip();
            this.#content = timeline;
            info.content = timeline;
            info.contentType = 'application/x-shockwave-flash';
            info.applicationDomain = domain;
            this.addChild(timeline);
            info.dispatchEvent(new Event(Event.INIT));
            info.dispatchEvent(new Event(Event.COMPLETE));
        });
    }
}

/** The content type from the file signature. */
function sniff(d: Uint8Array): string | null {
    if (d[0] === 0x89 && d[1] === 0x50 && d[2] === 0x4e && d[3] === 0x47) return 'image/png';
    if (d[0] === 0xff && d[1] === 0xd8) return 'image/jpeg';
    if (d[0] === 0x47 && d[1] === 0x49 && d[2] === 0x46) return 'image/gif';
    if ((d[0] === 0x46 || d[0] === 0x43 || d[0] === 0x5a) && d[1] === 0x57 && d[2] === 0x53) return 'swf';
    return null;
}
