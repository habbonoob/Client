import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class AvailabilityTimeMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.availability::AvailabilityTimeMessageParser'); }

    constructor() {
    }

    declare private _minutesUntilChange: number;
    static { (this.prototype as any)._minutesUntilChange = 0; }

    declare private _isOpen: boolean;
    static { (this.prototype as any)._isOpen = false; }

    public get isOpen(): boolean {
        return this._isOpen;
    }

    public get minutesUntilChange(): number {
        return this._minutesUntilChange;
    }

    public flush(): boolean {
        this._isOpen = false;
        this._minutesUntilChange = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._isOpen = param1.readInteger() > 0;
        this._minutesUntilChange = param1.readInteger();
        return true;
    }
}
