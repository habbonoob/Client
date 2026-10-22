import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { MarketPlaceOffer } from '@/com/sulake/habbo/communication/messages/incoming/marketplace/MarketPlaceOffer';
import { ObjectDataParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectDataParser';
import { StuffDataFactory } from '@/com/sulake/habbo/room/object/data/StuffDataFactory';

export class MarketPlaceOffersParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.marketplace::MarketPlaceOffersParser'); }

    public static readonly _SafeStr_8148: number = 1;
    public static readonly _SafeStr_8286: number = 2;
    public static readonly _SafeStr_8191: number = 3;
    public static readonly _SafeStr_14085: number = 4;
    private readonly _SafeStr_7661: number = 500;

    declare private _offers: any[];

    declare private _totalItemsFound: number;
    static { (this.prototype as any)._totalItemsFound = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._offers = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc14_: number = 0;
        let _loc16_: number = 0;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        let _loc13_: number = 0;
        let _loc8_: number = 0;
        let _loc15_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc11_: boolean = false;
        let _loc9_: boolean = false;
        let _loc3_: MarketPlaceOffer = null;
        this._offers = [];
        let _loc5_: string = "";
        let _loc12_: IStuffData = null;
        let _loc10_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc10_) {
            _loc12_ = null;
            _loc5_ = "";
            _loc11_ = false;
            _loc9_ = false;
            _loc14_ = param1.readInteger();
            _loc16_ = param1.readInteger();
            _loc2_ = param1.readInteger();
            if (_loc2_ == 1 || _loc2_ == 4) {
                _loc4_ = param1.readInteger();
                _loc12_ = ObjectDataParser.parseStuffData(param1);
                _loc11_ = _loc2_ == 4;
                if (_loc11_) {
                    _loc9_ = param1.readBoolean();
                    _loc2_ = 1;
                }
            } else if (_loc2_ == 2) {
                _loc4_ = param1.readInteger();
                _loc5_ = param1.readString();
            } else if (_loc2_ == 3) {
                _loc4_ = param1.readInteger();
                _loc12_ = StuffDataFactory.getStuffDataWrapperForType(0);
                _loc12_.uniqueSerialNumber = param1.readInteger();
                _loc12_.uniqueSeriesSize = param1.readInteger();
                _loc2_ = 1;
            }
            _loc13_ = param1.readInteger();
            _loc8_ = param1.readInteger();
            _loc15_ = param1.readInteger();
            _loc6_ = param1.readInteger();
            _loc3_ = new MarketPlaceOffer(_loc14_, _loc4_, _loc2_, _loc5_, _loc12_, _loc13_, _loc16_, _loc8_, _loc15_, _loc6_, NaN, _loc11_, _loc9_);
            if (_loc7_ < 500) {
                this._offers.push(_loc3_);
            }
            _loc7_++;
        }
        this._totalItemsFound = param1.readInteger();
        return true;
    }

    public get offers(): any[] {
        return this._offers;
    }

    public get totalItemsFound(): number {
        return this._totalItemsFound;
    }
}
