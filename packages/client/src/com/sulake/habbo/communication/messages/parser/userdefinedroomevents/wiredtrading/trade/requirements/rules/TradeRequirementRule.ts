import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { TradeRequirementNode } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/nodes/TradeRequirementNode';

export class TradeRequirementRule {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.trade.requirements.rules::TradeRequirementRule'); }

    public static readFromMessage(param1: IMessageDataWrapper): TradeRequirementRule {
        let _loc4_: number = 0;
        let _loc2_: TradeRequirementNode[] = [];
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_.push(TradeRequirementNode.readFromMessage(param1));
            _loc4_ += 1;
        }
        return new TradeRequirementRule(_loc2_);
    }

    constructor(param1: TradeRequirementNode[]) {
        this._nodes = param1;
    }

    declare private _nodes: TradeRequirementNode[];

    public get nodes(): TradeRequirementNode[] {
        return this._nodes;
    }

    public addToComposer(param1: any[]): void {
        param1.push(typeof this._nodes.length === "number" && (this._nodes.length | 0) === this._nodes.length ? this._nodes.length : null);
        for (const _loc2_ of this._nodes ?? []) {
            _loc2_.addToComposer(param1);
        }
    }

    public deepCopy(): TradeRequirementRule {
        let _loc1_: TradeRequirementNode[] = [];
        for (const _loc2_ of this._nodes ?? []) {
            _loc1_.push(_loc2_.deepCopy());
        }
        return new TradeRequirementRule(_loc1_);
    }
}
