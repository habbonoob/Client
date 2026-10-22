import { Event } from './Event';

/** HTTPStatusEvent */
export class HTTPStatusEvent extends Event {
    static readonly HTTP_STATUS: string = 'httpStatus';
    static readonly HTTP_RESPONSE_STATUS: string = 'httpResponseStatus';

    readonly #status: number;
    redirected: boolean;
    responseHeaders: any[] = [];
    responseURL: string = null;

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, status: number = 0, redirected: boolean = false) {
        super(type, bubbles, cancelable);
        this.#status = status;
        this.redirected = redirected;
    }

    get status(): number {
        return this.#status;
    }

    override clone(): Event {
        const e = new HTTPStatusEvent(this.type, this.bubbles, this.cancelable, this.#status, this.redirected);
        e.responseHeaders = this.responseHeaders;
        e.responseURL = this.responseURL;
        return e;
    }

    override toString(): string {
        return this.formatToString('HTTPStatusEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'status', 'redirected', 'responseURL');
    }
}
