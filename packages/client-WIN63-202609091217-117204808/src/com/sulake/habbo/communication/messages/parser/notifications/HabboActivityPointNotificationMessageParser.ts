import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class HabboActivityPointNotificationMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.notifications::HabboActivityPointNotificationMessageParser'); }

    private _amount: number = 0;
    private _change: number = 0;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._amount = param1.readInteger();
        this._change = param1.readInteger();
        this._type = param1.readInteger();
        return true;
    }

    public get amount(): number {
        return this._amount;
    }

    public get change(): number {
        return this._change;
    }

    public get type(): number {
        return this._type;
    }
}
