import { ErrorEvent } from './ErrorEvent';
import { Event } from './Event';

/** SecurityErrorEvent */
export class SecurityErrorEvent extends ErrorEvent {
    static readonly SECURITY_ERROR: string = 'securityError';

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, text: string = '', id: number = 0) {
        super(type, bubbles, cancelable, text, id);
    }

    override clone(): Event {
        return new SecurityErrorEvent(this.type, this.bubbles, this.cancelable, this.text, this.errorID);
    }

    override toString(): string {
        return this.formatToString('SecurityErrorEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'text', 'errorID');
    }
}
