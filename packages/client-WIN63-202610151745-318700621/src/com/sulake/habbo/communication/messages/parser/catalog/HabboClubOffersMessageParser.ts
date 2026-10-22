import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ClubOfferData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ClubOfferData';

export class HabboClubOffersMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.catalog::HabboClubOffersMessageParser'); }

    declare private _offers: any[];

    declare private _SafeStr_6282: number;
    static { (this.prototype as any)._SafeStr_6282 = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._offers = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._offers = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._offers.push(new ClubOfferData(param1));
            _loc3_++;
        }
        this._SafeStr_6282 = param1.readInteger();
        return true;
    }

    public get offers(): any[] {
        return this._offers;
    }

    public get source(): number {
        return this._SafeStr_6282;
    }
}
