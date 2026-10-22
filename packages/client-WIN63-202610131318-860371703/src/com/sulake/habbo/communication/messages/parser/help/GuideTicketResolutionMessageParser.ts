import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideTicketResolutionMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideTicketResolutionMessageParser'); }

    private static readonly _SafeStr_8732: number = 0;
    private static readonly _SafeStr_8379: number = 1;
    private static readonly _SafeStr_7673: number = 2;
    private _SafeStr_4512: number = -1;

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_4512 = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_4512 = param1.readInteger();
        return true;
    }

    public get localizationCode(): string {
        if (this._SafeStr_4512 == 0 || this._SafeStr_4512 == 1) {
            return "valid";
        }
        return "invalid";
    }
}
