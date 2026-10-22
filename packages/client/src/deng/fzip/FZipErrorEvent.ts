import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class FZipErrorEvent extends Event {
    static { registerClassName(this, 'deng.fzip::FZipErrorEvent'); }

    public static readonly PARSE_ERROR: string = "parseError";

    declare public text: string;

    constructor(param1: string, param2: string = "", param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this.text = param2;
    }

    public override clone(): Event {
        return new FZipErrorEvent(this.type, this.text, this.bubbles, this.cancelable);
    }
}
