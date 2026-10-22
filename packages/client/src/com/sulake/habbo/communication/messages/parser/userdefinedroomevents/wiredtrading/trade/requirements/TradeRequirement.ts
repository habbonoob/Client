import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { TradeRequirementRules } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRules';

export class TradeRequirement {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.trade.requirements::TradeRequirement'); }

    public static _SafeStr_7331: number = 0;
    public static _SafeStr_7350: number = 1;
    public static _SafeStr_7329: number = 2;
    public static _SafeStr_5338: number = 4;

    constructor(param1: IMessageDataWrapper) {
        this._type = param1.readInteger();
        this._youGetText = param1.readString();
        this._layoutType = param1.readString();
        if (this._type == TradeRequirement._SafeStr_5338) {
            this._rules = new TradeRequirementRules(param1);
        }
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _youGetText: string;

    declare private _layoutType: string;

    private _rules: TradeRequirementRules = null;

    public get rules(): TradeRequirementRules {
        return this._rules;
    }

    public get type(): number {
        return this._type;
    }

    public get youGetText(): string {
        return this._youGetText;
    }

    public get layoutType(): string {
        return this._layoutType;
    }

    public isPaymentOnly(): boolean {
        if (this._type == TradeRequirement._SafeStr_5338) {
            return this._rules.youGetRule == null || this._rules.youGetRule.nodes.length == 0;
        }
        return true;
    }
}
