import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetLetUserInMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetLetUserInMessage'); }

    public static readonly LET_USER_IN: string = "RWLUIM_LET_USER_IN";

    declare private _userName: string;

    declare private _canEnter: boolean;
    static { (this.prototype as any)._canEnter = false; }

    constructor(param1: string, param2: boolean) {
        super("RWLUIM_LET_USER_IN");
        this._userName = param1;
        this._canEnter = param2;
    }

    public get userName(): string {
        return this._userName;
    }

    public get canEnter(): boolean {
        return this._canEnter;
    }
}
