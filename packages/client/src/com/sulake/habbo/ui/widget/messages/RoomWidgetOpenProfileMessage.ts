import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetOpenProfileMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetOpenProfileMessage'); }

    public static readonly _SafeStr_8665: string = "RWOPEM_OPEN_USER_PROFILE";

    constructor(param1: string, param2: number, param3: string) {
        super(param1);
        this._userId = param2;
        this._trackingLocation = param3;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _trackingLocation: string;

    public get userId(): number {
        return this._userId;
    }

    public get trackingLocation(): string {
        return this._trackingLocation;
    }
}
