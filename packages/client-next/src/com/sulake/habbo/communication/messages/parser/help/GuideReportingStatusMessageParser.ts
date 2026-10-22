import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PendingGuideTicket } from '@/com/sulake/habbo/communication/messages/parser/help/data/PendingGuideTicket';

export class GuideReportingStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideReportingStatusMessageParser'); }

    public static readonly _SafeStr_8667: number = 0;
    public static readonly _SafeStr_8339: number = 1;
    public static readonly _SafeStr_8565: number = 2;
    public static readonly _SafeStr_8681: number = 3;

    declare private _statusCode: number;
    static { (this.prototype as any)._statusCode = 0; }

    declare private _pendingTicket: PendingGuideTicket;

    constructor() {
    }

    public flush(): boolean {
        this._pendingTicket = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._statusCode = param1.readInteger();
        if (this._statusCode == 1) {
            this._pendingTicket = new PendingGuideTicket(param1);
        }
        return true;
    }

    public get statusCode(): number {
        return this._statusCode;
    }

    public get pendingTicket(): PendingGuideTicket {
        return this._pendingTicket;
    }

    public get localizationCode(): string {
        switch (this._statusCode - 2) {
            case 0:
                return "blocked";
            case 1:
                return "tooquick";
            default:
                return "";
        }
    }
}
