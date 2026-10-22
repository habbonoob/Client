import { Event } from './Event';

/** StatusEvent */
export class StatusEvent extends Event {
    static readonly STATUS: string = 'status';

    code: string;
    level: string;

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, code: string = '', level: string = '') {
        super(type, bubbles, cancelable);
        this.code = code;
        this.level = level;
    }

    override clone(): Event {
        return new StatusEvent(this.type, this.bubbles, this.cancelable, this.code, this.level);
    }

    override toString(): string {
        return this.formatToString('StatusEvent', 'type', 'bubbles', 'cancelable', 'eventPhase', 'code', 'level');
    }
}
