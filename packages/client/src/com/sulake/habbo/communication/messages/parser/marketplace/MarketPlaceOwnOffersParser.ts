import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { MarketPlaceOffer } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketPlaceOffer';
import { ObjectDataParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectDataParser';
import { StuffDataFactory } from '@/com/sulake/habbo/room/object/data/StuffDataFactory';

export class MarketPlaceOwnOffersParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.marketplace::MarketPlaceOwnOffersParser'); }

    private readonly _SafeStr_7661: number = 500;

    constructor() {
    }

    declare private _creditsWaiting: number;
    static { (this.prototype as any)._creditsWaiting = 0; }

    declare private _offers: any[];

    public get offers(): any[] {
        return this._offers;
    }

    public get creditsWaiting(): number {
        return this._creditsWaiting;
    }

    public flush(): boolean {
        this._offers = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc11_: number = 0;
        let _loc13_: number = 0;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        let _loc9_: IStuffData = null;
        let _loc10_: number = 0;
        let _loc7_: number = 0;
        let _loc12_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: MarketPlaceOffer = null;
        this._offers = [];
        let _loc5_: string = "";
        this._creditsWaiting = param1.readInteger();
        let _loc8_: number = param1.readInteger();
        _loc6_ = 0;
        while (_loc6_ < _loc8_) {
            _loc11_ = param1.readInteger();
            _loc13_ = param1.readInteger();
            _loc2_ = param1.readInteger();
            if (_loc2_ == 1) {
                _loc4_ = param1.readInteger();
                _loc9_ = ObjectDataParser.parseStuffData(param1);
            } else if (_loc2_ == 2) {
                _loc4_ = param1.readInteger();
                _loc5_ = param1.readString();
            } else if (_loc2_ == 3) {
                _loc4_ = param1.readInteger();
                _loc9_ = StuffDataFactory.getStuffDataWrapperForType(0);
                _loc9_.uniqueSerialNumber = param1.readInteger();
                _loc9_.uniqueSeriesSize = param1.readInteger();
                _loc2_ = 1;
            }
            _loc10_ = param1.readInteger();
            _loc7_ = param1.readInteger();
            _loc12_ = param1.readInteger();
            _loc3_ = new MarketPlaceOffer(_loc11_, _loc4_, _loc2_, _loc5_, _loc9_, _loc10_, _loc13_, _loc7_, _loc12_);
            if (_loc6_ < 500) {
                this._offers.push(_loc3_);
            }
            _loc6_++;
        }
        return true;
    }
}
