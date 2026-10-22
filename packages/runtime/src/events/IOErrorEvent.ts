import { ErrorEvent } from './ErrorEvent';
import { Event } from './Event';

/** IOErrorEvent */
export class IOErrorEvent extends ErrorEvent {
    static readonly IO_ERROR: string = 'ioError';
    static readonly DISK_ERROR: string = 'diskError';
    static readonly NETWORK_ERROR: string = 'networkError';
    static readonly VERIFY_ERROR: string = 'verifyError';
    static readonly STANDARD_ERROR_IO_ERROR: string = 'standardErrorIoError';
    static readonly STANDARD_INPUT_IO_ERROR: string = 'standardInputIoError';
    static readonly STANDARD_OUTPUT_IO_ERROR: string = 'standardOutputIoError';

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, text: string = '', id: number = 0) {
        super(type, bubbles, cancelable, text, id);
    }

    override clone(): Event {
        return new IOErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this.errorID);
    }

    override toString(): string {
        return this.formatToString('IOErrorEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'text', 'errorID');
    }
}
