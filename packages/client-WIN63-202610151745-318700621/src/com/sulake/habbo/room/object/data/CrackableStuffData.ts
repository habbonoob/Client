import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { StuffDataBase } from '@/com/sulake/habbo/room/object/data/StuffDataBase';

export class CrackableStuffData extends StuffDataBase implements IStuffData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.data::CrackableStuffData'); }

    public static readonly FORMAT_KEY: number = 7;
    private static readonly INTERNAL_STATE_KEY: string = "furniture_crackable_state";
    private static readonly INTERNAL_HIT_KEY: string = "furniture_crackable_hits";
    private static readonly INTERNAL_TARGET_KEY: string = "furniture_crackable_target";
    private _state: string = "";

    declare private _hits: number;
    static { (this.prototype as any)._hits = 0; }

    declare private _target: number;
    static { (this.prototype as any)._target = 0; }

    constructor() {
        super();
    }

    public override initializeFromIncomingMessage(param1: IMessageDataWrapper): void {
        this._state = param1.readString();
        this._hits = param1.readInteger();
        this._target = param1.readInteger();
        super.initializeFromIncomingMessage(param1);
    }

    public override writeRoomObjectModel(param1: IRoomObjectModelController): void {
        super.writeRoomObjectModel(param1);
        param1.setNumber("furniture_data_format", 7);
        param1.setString("furniture_crackable_state", this._state);
        param1.setNumber("furniture_crackable_hits", this._hits);
        param1.setNumber("furniture_crackable_target", this._target);
    }

    public override initializeFromRoomObjectModel(param1: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(param1);
        this._state = param1.getString("furniture_crackable_state");
        this._hits = param1.getNumber("furniture_crackable_hits") | 0;
        this._target = param1.getNumber("furniture_crackable_target") | 0;
    }

    public override getLegacyString(): string {
        return this._state;
    }

    public setString(param1: string): void {
        this._state = param1;
    }

    public get hits(): number {
        return this._hits;
    }

    public get target(): number {
        return this._target;
    }

    public override compare(param1: IStuffData): boolean {
        return true;
    }
}
