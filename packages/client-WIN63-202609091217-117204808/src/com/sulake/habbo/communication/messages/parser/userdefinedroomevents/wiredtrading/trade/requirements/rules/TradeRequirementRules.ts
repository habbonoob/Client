import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { TradeRequirementRule } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRule';
import { TradeRequirementRulesDefinition } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRulesDefinition';
import { TradeRequirementRuleType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRuleType';

export class TradeRequirementRules {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.trade.requirements.rules::TradeRequirementRules'); }

    declare private _definition: TradeRequirementRulesDefinition;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    private _multiplier: number = 1;
    private _autoMultiplierMax: number = 1;

    constructor(param1: IMessageDataWrapper) {
        this._definition = TradeRequirementRulesDefinition.readFromMessage(param1);
        this._type = param1.readInteger();
        if (this._type == TradeRequirementRuleType._SafeStr_7343) {
            this._multiplier = param1.readInteger();
        } else if (this._type == TradeRequirementRuleType._SafeStr_5683) {
            this._autoMultiplierMax = param1.readInteger();
        }
    }

    public get youGiveRule(): TradeRequirementRule[] {
        return this._definition.youGiveRule;
    }

    public get youGetRule(): TradeRequirementRule {
        return this._definition.youGetRule;
    }

    public get type(): number {
        return this._type;
    }

    public get multiplier(): number {
        return this._multiplier;
    }

    public get autoMultiplierMax(): number {
        return this._autoMultiplierMax;
    }
}
