import { Event } from './Event';
import { TextEvent } from './TextEvent';

/** `data` is the event's text. */
export class DataEvent extends TextEvent {
    static readonly DATA: string = 'data';
    static readonly UPLOAD_COMPLETE_DATA: string = 'uploadCompleteData';

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, data: string = '') {
        super(type, bubbles, cancelable, data);
    }

    get data(): string {
        return this.text;
    }

    set data(value: string) {
        this.text = value;
    }

    override clone(): Event {
        return new DataEvent(this.type, this.bubbles, this.cancelable, this.text);
    }

    override toString(): string {
        return this.formatToString('DataEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'data');
    }
}
