import { Event } from './Event';
import { TextEvent } from './TextEvent';

/** ErrorEvent */
export class ErrorEvent extends TextEvent {
    static readonly ERROR: string = 'error';

    readonly #errorID: number;

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, text: string = '', id: number = 0) {
        super(type, bubbles, cancelable, text);
        this.#errorID = id;
    }

    get errorID(): number {
        return this.#errorID;
    }

    override clone(): Event {
        return new ErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this.#errorID);
    }

    override toString(): string {
        return this.formatToString('ErrorEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'text', 'errorID');
    }
}
