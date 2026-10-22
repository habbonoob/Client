import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { StuffDataBase } from '@/com/sulake/habbo/room/object/data/StuffDataBase';

export class VoteResultStuffData extends StuffDataBase implements IStuffData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::VoteResultStuffData'); }

    public static readonly FORMAT_KEY: number = 3;
    private static readonly INTERNAL_STATE_KEY: string = "s";
    private static readonly INTERNAL_RESULT_KEY: string = "r";
    private _state: string = "";

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    constructor() {
        super();
    }

    public override initializeFromIncomingMessage(param1: IMessageDataWrapper): void {
        this._state = param1.readString();
        this._result = param1.readInteger();
        super.initializeFromIncomingMessage(param1);
    }

    public override writeRoomObjectModel(param1: IRoomObjectModelController): void {
        super.writeRoomObjectModel(param1);
        param1.setNumber("furniture_data_format", 3);
        let _loc2_: UtilsMap = new UtilsMap();
        _loc2_.add("s", this._state);
        _loc2_.add("r", this._result.toString());
        param1.setStringToStringMap("furniture_data", _loc2_);
    }

    public override initializeFromRoomObjectModel(param1: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(param1);
        let _loc2_: UtilsMap = param1.getStringToStringMap("furniture_data");
        this._state = stringOrNull(_loc2_.getValue("s"));
        this._result = _loc2_.getValue("r") | 0;
    }

    public override getLegacyString(): string {
        return this._state;
    }

    public setString(param1: string): void {
        this._state = param1;
    }

    public get result(): number {
        return this._result;
    }

    public override compare(param1: IStuffData): boolean {
        return true;
    }
}
