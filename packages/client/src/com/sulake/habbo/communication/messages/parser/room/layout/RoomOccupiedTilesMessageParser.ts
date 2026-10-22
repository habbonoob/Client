import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomOccupiedTilesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.layout::RoomOccupiedTilesMessageParser'); }

    constructor() {
    }

    declare private _occupiedTiles: any[];

    public get occupiedTiles(): any[] {
        return this._occupiedTiles;
    }

    public flush(): boolean {
        this._occupiedTiles = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = param1.readInteger();
            _loc5_ = param1.readInteger();
            this._occupiedTiles.push({ "x": _loc4_, "y": _loc5_ });
            _loc3_++;
        }
        return true;
    }
}
