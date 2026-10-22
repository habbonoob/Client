import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { StuffDataBase } from '@/com/sulake/habbo/room/object/data/StuffDataBase';

export class StringArrayStuffData extends StuffDataBase implements IStuffData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::StringArrayStuffData'); }

    public static readonly FORMAT_KEY: number = 2;
    private static readonly STATE_DEFAULT_INDEX: number = 0;

    constructor() {
        super();
    }

    private _data: any[] = [];

    public override initializeFromIncomingMessage(param1: IMessageDataWrapper): void {
        let _loc3_: number = 0;
        let _loc4_: string = null;
        this._data = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = param1.readString();
            this._data.push(_loc4_);
            _loc3_++;
        }
        super.initializeFromIncomingMessage(param1);
    }

    public override initializeFromRoomObjectModel(param1: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(param1);
        this._data = param1.getStringArray("furniture_data");
    }

    public override writeRoomObjectModel(param1: IRoomObjectModelController): void {
        super.writeRoomObjectModel(param1);
        param1.setNumber("furniture_data_format", 2);
        param1.setStringArray("furniture_data", this._data);
    }

    public override getLegacyString(): string {
        if (!this._data) {
            return "";
        }
        return stringOrNull(this._data[0]);
    }

    public override compare(param1: IStuffData): boolean {
        let _loc3_: number = 0;
        let _loc2_: StringArrayStuffData = param1 instanceof StringArrayStuffData ? param1 : null;
        if (!_loc2_) {
            return false;
        }
        _loc3_ = 0;
        while (_loc3_ < this._data.length) {
            if (_loc3_ != 0) {
                if (this._data[_loc3_] != _loc2_.getValue(_loc3_)) {
                    return false;
                }
            }
            _loc3_++;
        }
        return true;
    }

    public getValue(param1: number): string {
        if (this._data && param1 < this._data.length) {
            return stringOrNull(this._data[param1]);
        }
        return "";
    }

    public setArray(param1: any[]): void {
        this._data = param1;
    }
}
