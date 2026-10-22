import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class BufferedRoomObjectModelDataEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::BufferedRoomObjectModelDataEvent'); }

    public static readonly CAPTURE: string = "BROMDME_CAPTURE";
    public static readonly RESTORE: string = "BROMDME_RESTORE";

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _roomObject: IRoomObjectController;

    declare private _SafeStr_14802: string;

    declare private _data: any;

    declare private _SafeStr_14803: boolean;
    static { (this.prototype as any)._SafeStr_14803 = false; }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: IRoomObjectController, param6: string = null, param7: any = null) {
        super(param1);
        this._roomId = param2;
        this._objectId = param3;
        this._category = param4;
        this._roomObject = param5;
        this._SafeStr_14802 = param6;
        this._data = param7;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get category(): number {
        return this._category;
    }

    public get roomObject(): IRoomObjectController {
        return this._roomObject;
    }

    public get dataType(): string {
        return this._SafeStr_14802;
    }

    public get data(): any {
        return this._data;
    }

    public get restored(): boolean {
        return this._SafeStr_14803;
    }

    public markRestored(): void {
        this._SafeStr_14803 = true;
    }
}
