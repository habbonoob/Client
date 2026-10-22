import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetAvatarInfoEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetAvatarInfoEvent'); }

    public static readonly AVATAR_INFO: string = "RWAIE_AVATAR_INFO";

    constructor(param1: number, param2: string, param3: number, param4: number, param5: boolean, param6: boolean = false, param7: boolean = false) {
        super("RWAIE_AVATAR_INFO", param6, param7);
        this._userId = param1;
        this._userName = param2;
        this._userType = param3;
        this._roomIndex = param4;
        this._allowNameChange = param5;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userType: number;
    static { (this.prototype as any)._userType = 0; }

    declare private _allowNameChange: boolean;
    static { (this.prototype as any)._allowNameChange = false; }

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public get userId(): number {
        return this._userId;
    }

    public get userType(): number {
        return this._userType;
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get allowNameChange(): boolean {
        return this._allowNameChange;
    }
}
