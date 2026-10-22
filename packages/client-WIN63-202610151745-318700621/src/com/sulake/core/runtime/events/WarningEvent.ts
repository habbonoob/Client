import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class WarningEvent extends Event {
    static { registerClassName(this, 'com.sulake.core.runtime.events::WarningEvent'); }

    declare protected _message: string;

    constructor(param1: string, param2: string) {
        super(param1);
        this._message = param2 == null ? "undefined" : param2;
    }

    public get message(): string {
        return this._message;
    }
}
