import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { JSONDecoder } from '@habbo-pixi/runtime/json/JSONDecoder';
import { IStuffData } from '@/com/sulake/habbo/room/IStuffData';

export class StuffDataBase implements IStuffData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::StuffDataBase'); }

    constructor() {
    }

    declare private _flags: number;
    static { (this.prototype as any)._flags = 0; }

    private _uniqueSeriesSize: number = 0;
    private _uniqueSerialNumber: number = 0;

    public get uniqueSerialNumber(): number {
        return this._uniqueSerialNumber;
    }

    public set uniqueSerialNumber(param1: number) {
        this._uniqueSerialNumber = param1;
    }

    public set flags(param1: number) {
        this._flags = param1;
    }

    public get uniqueSeriesSize(): number {
        return this._uniqueSeriesSize;
    }

    public set uniqueSeriesSize(param1: number) {
        this._uniqueSeriesSize = param1;
    }

    public get rarityLevel(): number {
        return -1;
    }

    public get contentsCount(): number {
        return 0;
    }

    public get chestName(): string {
        return "";
    }

    public get state(): number {
        let _loc1_: number = Number(this.getLegacyString());
        return isNaN(_loc1_) ? -1 : _loc1_ | 0;
    }

    public initializeFromIncomingMessage(param1: IMessageDataWrapper): void {
        if ((this._flags & 0x0100) > 0) {
            this._uniqueSerialNumber = param1.readInteger();
            this._uniqueSeriesSize = param1.readInteger();
        }
    }

    public initializeFromRoomObjectModel(param1: IRoomObjectModel): void {
        this._uniqueSerialNumber = param1.getNumber("furniture_unique_serial_number") | 0;
        this._uniqueSeriesSize = param1.getNumber("furniture_unique_edition_size") | 0;
    }

    public writeRoomObjectModel(param1: IRoomObjectModelController): void {
        param1.setNumber("furniture_unique_serial_number", this._uniqueSerialNumber);
        param1.setNumber("furniture_unique_edition_size", this._uniqueSeriesSize);
    }

    public getLegacyString(): string {
        return "";
    }

    public compare(param1: IStuffData): boolean {
        return false;
    }

    public getJSONValue(param1: string): string {
        let _loc5_: string;
        let _loc2_: any = null;
        try {
            return stringOrNull(new JSONDecoder(this.getLegacyString(), true).getValue()[param1]);
        } catch (error) {
            _loc5_ = "";
        }
        return _loc5_;
    }

    get [IStuffData](): true {
        return true;
    }
}
