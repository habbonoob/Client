import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class TalentTrackRewardProduct {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.talent::TalentTrackRewardProduct'); }

    declare private _productCode: string;

    declare private _vipDays: number;
    static { (this.prototype as any)._vipDays = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._productCode = param1.readString();
        this._vipDays = param1.readInteger();
    }

    public get productCode(): string {
        return this._productCode;
    }

    public get vipDays(): number {
        return this._vipDays;
    }
}
