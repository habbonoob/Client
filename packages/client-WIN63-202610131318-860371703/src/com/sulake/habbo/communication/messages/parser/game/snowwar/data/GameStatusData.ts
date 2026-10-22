import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { SnowWarGameEventData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/event/SnowWarGameEventData.group';

export class GameStatusData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data::GameStatusData'); }

    declare private _turn: number;
    static { (this.prototype as any)._turn = 0; }

    declare private _checksum: number;
    static { (this.prototype as any)._checksum = 0; }

    declare private _SafeStr_5576: UtilsMap;

    constructor(param1: IMessageDataWrapper) {
        this.parse(param1);
    }

    public get turn(): number {
        return this._turn;
    }

    public get checksum(): number {
        return this._checksum;
    }

    public get events(): UtilsMap {
        return this._SafeStr_5576;
    }

    public parse(param1: IMessageDataWrapper): void {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc8_: any[] = null;
        let _loc7_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: SnowWarGameEventData = null;
        this._turn = param1.readInteger();
        this._checksum = param1.readInteger();
        this._SafeStr_5576 = new UtilsMap();
        let _loc2_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc2_) {
            _loc6_ = param1.readInteger();
            _loc8_ = [];
            _loc7_ = 0;
            while (_loc7_ < _loc6_) {
                _loc3_ = param1.readInteger();
                _loc4_ = SnowWarGameEventData.create(_loc3_);
                if (_loc4_) {
                    _loc4_.parse(param1);
                    _loc8_.push(_loc4_);
                }
                _loc7_++;
            }
            this._SafeStr_5576.add(_loc5_, _loc8_);
            _loc5_++;
        }
    }
}
