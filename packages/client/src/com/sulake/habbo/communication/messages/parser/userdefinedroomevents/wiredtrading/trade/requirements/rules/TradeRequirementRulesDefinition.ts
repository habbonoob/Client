import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { TradeRequirementRule } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRule';

export class TradeRequirementRulesDefinition {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.trade.requirements.rules::TradeRequirementRulesDefinition'); }

    public static readFromMessage(param1: IMessageDataWrapper): TradeRequirementRulesDefinition {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: TradeRequirementRule[] = null;
        let _loc5_: TradeRequirementRule = null;
        if (param1.readBoolean()) {
            _loc2_ = [];
            _loc3_ = param1.readInteger();
            _loc4_ = 0;
            while (_loc4_ < _loc3_) {
                _loc2_.push(TradeRequirementRule.readFromMessage(param1));
                _loc4_ += 1;
            }
        }
        if (param1.readBoolean()) {
            _loc5_ = TradeRequirementRule.readFromMessage(param1);
        }
        return new TradeRequirementRulesDefinition(_loc2_, _loc5_);
    }

    constructor(param1: TradeRequirementRule[], param2: TradeRequirementRule) {
        this._youGiveRule = param1;
        this._youGetRule = param2;
    }

    private _youGiveRule: TradeRequirementRule[] = null;
    private _youGetRule: TradeRequirementRule = null;

    public get youGiveRule(): TradeRequirementRule[] {
        return this._youGiveRule;
    }

    public get youGetRule(): TradeRequirementRule {
        return this._youGetRule;
    }

    public addToComposer(param1: any[]): void {
        param1.push(this._youGiveRule != null);
        if (this._youGiveRule != null) {
            param1.push(typeof this._youGiveRule.length === "number" && (this._youGiveRule.length | 0) === this._youGiveRule.length ? this._youGiveRule.length : null);
            for (const _loc2_ of this._youGiveRule ?? []) {
                _loc2_.addToComposer(param1);
            }
        }
        param1.push(this._youGetRule != null);
        if (this._youGetRule != null) {
            this._youGetRule.addToComposer(param1);
        }
    }

    public deepCopy(): TradeRequirementRulesDefinition {
        let _loc1_: TradeRequirementRule[] = null;
        let _loc3_: TradeRequirementRule = null;
        if (this._youGiveRule != null) {
            _loc1_ = [];
            for (const _loc2_ of this._youGiveRule ?? []) {
                _loc1_.push(_loc2_.deepCopy());
            }
        }
        if (this._youGetRule != null) {
            _loc3_ = this._youGetRule.deepCopy();
        }
        return new TradeRequirementRulesDefinition(_loc1_, _loc3_);
    }
}
