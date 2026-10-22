import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { StuffDataBase } from '@/com/sulake/habbo/room/object/data/StuffDataBase';

export class LegacyStuffData extends StuffDataBase implements IStuffData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::LegacyStuffData'); }

    public static readonly FORMAT_KEY: number = 0;

    constructor() {
        super();
    }

    private _data: string = "";

    public override initializeFromIncomingMessage(param1: IMessageDataWrapper): void {
        this._data = param1.readString();
        super.initializeFromIncomingMessage(param1);
    }

    public override initializeFromRoomObjectModel(param1: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(param1);
        this._data = param1.getString("furniture_data");
    }

    public override writeRoomObjectModel(param1: IRoomObjectModelController): void {
        super.writeRoomObjectModel(param1);
        param1.setNumber("furniture_data_format", 0);
        param1.setString("furniture_data", this._data);
    }

    public override getLegacyString(): string {
        return this._data;
    }

    public override compare(param1: IStuffData): boolean {
        return this._data == param1.getLegacyString();
    }

    public setString(param1: string): void {
        this._data = param1;
    }
}
