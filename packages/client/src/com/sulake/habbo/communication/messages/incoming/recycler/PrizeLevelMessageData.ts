import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { PrizeMessageData } from '@/com/sulake/habbo/communication/messages/incoming/recycler/PrizeMessageData';

export class PrizeLevelMessageData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.recycler::PrizeLevelMessageData'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._prizeLevelId = param1.readInteger();
        this._probabilityDenominator = param1.readInteger();
        this._prizes = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._prizes.push(new PrizeMessageData(param1));
            _loc3_++;
        }
        this._prizes.sort((a, b) => (String(a.productCode).toLowerCase() < String(b.productCode).toLowerCase() ? -1 : String(a.productCode).toLowerCase() > String(b.productCode).toLowerCase() ? 1 : 0));
    }

    declare private _prizeLevelId: number;
    static { (this.prototype as any)._prizeLevelId = 0; }

    declare private _probabilityDenominator: number;
    static { (this.prototype as any)._probabilityDenominator = 0; }

    declare private _prizes: any[];

    public get prizes(): any[] {
        return this._prizes;
    }

    public get prizeLevelId(): number {
        return this._prizeLevelId;
    }

    public get probabilityDenominator(): number {
        return this._probabilityDenominator;
    }
}
