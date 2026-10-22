import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideTicketCreationResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideTicketCreationResultMessageParser'); }

    private static readonly _SafeStr_8629: number = 0;
    private static readonly _SafeStr_8628: number = 1;
    private static readonly _SafeStr_8751: number = 2;
    private static readonly _SafeStr_8278: number = 3;

    constructor() {
    }

    private _result: number = -1;

    public get localizationCode(): string {
        switch (this._result) {
            case 0:
                return "sent";
            case 1:
                return "blocked";
            case 2:
                return "nochat";
            case 3:
                return "alreadyreported";
            default:
                return "invalid";
        }
    }

    public flush(): boolean {
        this._result = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._result = param1.readInteger();
        return true;
    }
}
