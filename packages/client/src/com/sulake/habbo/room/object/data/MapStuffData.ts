import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { StuffDataBase } from '@/com/sulake/habbo/room/object/data/StuffDataBase';

export class MapStuffData extends StuffDataBase implements IStuffData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::MapStuffData'); }

    public static readonly FORMAT_KEY: number = 1;
    private static readonly STATE_DEFAULT_KEY: string = "state";
    private static readonly _SafeStr_7749: string = "rarity";

    constructor(param1: UtilsMap = null) {
        super();
        if (param1) {
            this._data = param1;
        }
    }

    declare private _data: UtilsMap;

    public override get rarityLevel(): number {
        let _loc1_: string = stringOrNull(this._data["rarity"]);
        if (_loc1_) {
            return Number(_loc1_) | 0;
        }
        return -1;
    }

    public override get contentsCount(): number {
        let _loc1_: string = stringOrNull(this._data["contents_count"]);
        if (_loc1_) {
            return Number(_loc1_) | 0;
        }
        return 0;
    }

    public override get chestName(): string {
        let _loc1_: string = stringOrNull(this._data["chest_name"]);
        if (_loc1_ != null) {
            return _loc1_;
        }
        return "";
    }

    public override initializeFromIncomingMessage(param1: IMessageDataWrapper): void {
        let _loc3_: number = 0;
        let _loc5_: string = null;
        let _loc4_: string = null;
        this._data = new UtilsMap();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc5_ = param1.readString();
            _loc4_ = param1.readString();
            this._data.add(_loc5_, _loc4_);
            _loc3_++;
        }
        super.initializeFromIncomingMessage(param1);
    }

    public override initializeFromRoomObjectModel(param1: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(param1);
        this._data = param1.getStringToStringMap("furniture_data");
    }

    public override writeRoomObjectModel(param1: IRoomObjectModelController): void {
        super.writeRoomObjectModel(param1);
        param1.setNumber("furniture_data_format", 1);
        param1.setStringToStringMap("furniture_data", this._data);
    }

    public override getLegacyString(): string {
        if (this._data && this._data.getValue("state") != null) {
            return stringOrNull(this._data["state"]);
        }
        return "";
    }

    public override compare(param1: IStuffData): boolean {
        return false;
    }

    public getValue(param1: string): string {
        if (this._data == null) {
            return null;
        }
        return stringOrNull(this._data[param1]);
    }
}
