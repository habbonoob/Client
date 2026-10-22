import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuildEditFailedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::GuildEditFailedMessageParser'); }

    public static readonly _SafeStr_7481: number = 2;

    declare private _reason: number;
    static { (this.prototype as any)._reason = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._reason = param1.readInteger();
        return true;
    }

    public get reason(): number {
        return this._reason;
    }
}
