import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { HTTPStatusEvent } from '@habbo-pixi/runtime/events/HTTPStatusEvent';
import { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import { runGuarded } from '@habbo-pixi/runtime/runtime/uncaught';
import { bytesToByteArray, join, request } from './http';
import type { URLRequest } from './URLRequest';
import { URLVariables } from './URLVariables';

/**
 * Downloads a URL as text ('text'), bytes ('binary', a ByteArray) or variables ('variables').
 * Events: open, progress, httpStatus / httpResponseStatus, then complete — or ioError when the
 * request fails or answers with an HTTP error status.
 */
export class URLLoader extends EventDispatcher {
    dataFormat = 'text';
    data: any = null;
    bytesLoaded = 0;
    bytesTotal = 0;
    #abort: (() => void) | null = null;

    constructor(request: URLRequest = null) {
        super();
        if (request) this.load(request);
    }

    load(req: URLRequest): void {
        this.close();
        this.bytesLoaded = this.bytesTotal = 0;
        const chunks: Uint8Array[] = [];
        this.#abort = request(req, {
            open: () => runGuarded(() => this.dispatchEvent(new Event(Event.OPEN))),
            status: r => runGuarded(() => {
                const e = new HTTPStatusEvent(HTTPStatusEvent.HTTP_RESPONSE_STATUS, false, false, r.status, r.redirected);
                e.responseURL = r.url;
                e.responseHeaders = r.headers;
                this.dispatchEvent(new HTTPStatusEvent(HTTPStatusEvent.HTTP_STATUS, false, false, r.status, r.redirected));
                this.dispatchEvent(e);
            }),
            chunk: (data, loaded, total) => runGuarded(() => {
                chunks.push(data);
                this.bytesLoaded = loaded;
                this.bytesTotal = total;
                this.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, false, false, loaded, total));
            }),
            done: () => runGuarded(() => {
                this.#abort = null;
                const bytes = join(chunks);
                this.bytesTotal = this.bytesLoaded = bytes.length;
                if (this.dataFormat === 'binary') this.data = bytesToByteArray(bytes);
                else {
                    const text = new TextDecoder().decode(bytes);
                    this.data = this.dataFormat === 'variables' ? new URLVariables(text) : text;
                }
                this.dispatchEvent(new Event(Event.COMPLETE));
            }),
            error: message => runGuarded(() => {
                this.#abort = null;
                this.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, message));
            }),
        });
    }

    /** Stop the download in progress, if any. */
    close(): void {
        this.#abort?.();
        this.#abort = null;
    }
}
