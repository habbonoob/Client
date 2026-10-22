import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Byte } from '@/com/sulake/core/communication/util/Byte';
import { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';

export class TradeRequirementNode {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.trade.requirements.rules.nodes::TradeRequirementNode'); }

    public static TYPE_COIN: number = 0;
    public static TYPE_FURNI: number = 1;

    public static readFromMessage(param1: IMessageDataWrapper): TradeRequirementNode {
        let _loc4_: number = param1.readByte();
        let _loc2_: number = param1.readInteger();
        let _loc3_: ChestItemType = null;
        if (_loc4_ == TradeRequirementNode.TYPE_FURNI) {
            _loc3_ = ChestItemType.readFromMessage(param1);
        }
        return new TradeRequirementNode(_loc4_, _loc2_, _loc3_);
    }

    constructor(param1: number, param2: number, param3: ChestItemType = null) {
        this._type = param1;
        this._amount = param2;
        if (this._type == TradeRequirementNode.TYPE_FURNI) {
            this._itemType = param3;
        }
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    private _itemType: ChestItemType = null;

    declare private _amount: number;
    static { (this.prototype as any)._amount = 0; }

    public get amount(): number {
        return this._amount;
    }

    public get type(): number {
        return this._type;
    }

    public get itemType(): ChestItemType {
        return this._itemType;
    }

    public addToComposer(param1: any[]): void {
        param1.push(new Byte(this._type));
        param1.push(this._amount);
        if (this._type == TradeRequirementNode.TYPE_FURNI) {
            this._itemType.addToComposer(param1);
        }
    }

    public deepCopy(): TradeRequirementNode {
        return new TradeRequirementNode(this._type, this._amount, this._itemType);
    }
}
