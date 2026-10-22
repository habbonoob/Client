import { ErrorEvent } from './ErrorEvent';
import { Event } from './Event';

/** An error nothing caught. preventDefault() suppresses the default report. */
export class UncaughtErrorEvent extends ErrorEvent {
    static readonly UNCAUGHT_ERROR: string = 'uncaughtError';

    readonly #error: any;

    constructor(type: string = UncaughtErrorEvent.UNCAUGHT_ERROR, bubbles: boolean = true, cancelable: boolean = true, error_in: any = null) {
        super(type, bubbles, cancelable, '', 0);
        this.#error = error_in;
    }

    /** The Error (or whatever else was thrown). */
    get error(): any {
        return this.#error;
    }

    override clone(): Event {
        return new UncaughtErrorEvent(this.type, this.bubbles, this.cancelable, this.#error);
    }

    override toString(): string {
        return this.formatToString('UncaughtErrorEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'error');
    }
}
