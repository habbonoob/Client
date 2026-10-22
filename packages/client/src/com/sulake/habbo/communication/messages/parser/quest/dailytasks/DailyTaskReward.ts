import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class DailyTaskReward {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest.dailytasks::DailyTaskReward'); }

    constructor(param1: IMessageDataWrapper) {
        this._productItemTypeId = param1.readShort();
        this._rewardTypeId = param1.readString();
        this._extraParams = param1.readString();
        this._amount = param1.readInteger();
    }

    declare private _productItemTypeId: number;
    static { (this.prototype as any)._productItemTypeId = 0; }

    declare private _rewardTypeId: string;

    declare private _extraParams: string;

    declare private _amount: number;
    static { (this.prototype as any)._amount = 0; }

    public get amount(): number {
        return this._amount;
    }

    public get productItemTypeId(): number {
        return this._productItemTypeId;
    }

    public get rewardTypeId(): string {
        return this._rewardTypeId;
    }

    public get extraParams(): string {
        return this._extraParams;
    }
}
