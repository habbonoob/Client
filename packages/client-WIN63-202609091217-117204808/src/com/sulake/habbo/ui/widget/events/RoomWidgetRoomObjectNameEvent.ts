import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetRoomObjectNameEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetRoomObjectNameEvent'); }

    public static readonly OBJECT_NAME: string = "RWONE_TYPE";

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _userName: string;

    declare private _userType: number;
    static { (this.prototype as any)._userType = 0; }

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    constructor(param1: number, param2: number, param3: string, param4: number, param5: number) {
        super("RWONE_TYPE", false, false);
        this._userId = param1;
        this._category = param2;
        this._userName = param3;
        this._userType = param4;
        this._roomIndex = param5;
    }

    public get userId(): number {
        return this._userId;
    }

    public get category(): number {
        return this._category;
    }

    public get userName(): string {
        return this._userName;
    }

    public get userType(): number {
        return this._userType;
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }
}
