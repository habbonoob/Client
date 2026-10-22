import { Event } from './Event';

/** ProgressEvent */
export class ProgressEvent extends Event {
    static readonly PROGRESS: string = 'progress';
    static readonly SOCKET_DATA: string = 'socketData';
    static readonly STANDARD_ERROR_DATA: string = 'standardErrorData';
    static readonly STANDARD_INPUT_PROGRESS: string = 'standardInputProgress';
    static readonly STANDARD_OUTPUT_DATA: string = 'standardOutputData';

    bytesLoaded: number;
    bytesTotal: number;

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, bytesLoaded: number = 0, bytesTotal: number = 0) {
        super(type, bubbles, cancelable);
        this.bytesLoaded = bytesLoaded;
        this.bytesTotal = bytesTotal;
    }

    override clone(): Event {
        return new ProgressEvent(this.type, this.bubbles, this.cancelable, this.bytesLoaded, this.bytesTotal);
    }

    override toString(): string {
        return this.formatToString('ProgressEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'bytesLoaded', 'bytesTotal');
    }
}
