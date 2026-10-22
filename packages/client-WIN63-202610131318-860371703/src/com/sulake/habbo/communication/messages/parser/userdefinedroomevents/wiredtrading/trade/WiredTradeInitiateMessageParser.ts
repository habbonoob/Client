import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TradeRequirement } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/TradeRequirement';

export class WiredTradeInitiateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.trade::WiredTradeInitiateMessageParser'); }

    declare private _requirement: TradeRequirement;

    declare private _showRequirementsImmediate: boolean;
    static { (this.prototype as any)._showRequirementsImmediate = false; }

    declare private _overridePreviousTrade: boolean;
    static { (this.prototype as any)._overridePreviousTrade = false; }

    declare private _timeoutSeconds: number;
    static { (this.prototype as any)._timeoutSeconds = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._requirement = null;
        this._showRequirementsImmediate = false;
        this._overridePreviousTrade = false;
        this._timeoutSeconds = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._requirement = new TradeRequirement(param1);
        this._showRequirementsImmediate = param1.readBoolean();
        this._overridePreviousTrade = param1.readBoolean();
        this._timeoutSeconds = param1.readInteger();
        return true;
    }

    public get requirement(): TradeRequirement {
        return this._requirement;
    }

    public get showRequirementsImmediate(): boolean {
        return this._showRequirementsImmediate;
    }

    public get overridePreviousTrade(): boolean {
        return this._overridePreviousTrade;
    }

    public get timeoutSeconds(): number {
        return this._timeoutSeconds;
    }
}
