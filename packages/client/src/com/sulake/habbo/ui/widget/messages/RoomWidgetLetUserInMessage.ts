import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetLetUserInMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetLetUserInMessage'); }

    public static readonly LET_USER_IN: string = "RWLUIM_LET_USER_IN";

    constructor(param1: string, param2: boolean) {
        super("RWLUIM_LET_USER_IN");
        this._userName = param1;
        this._canEnter = param2;
    }

    declare private _canEnter: boolean;
    static { (this.prototype as any)._canEnter = false; }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public get canEnter(): boolean {
        return this._canEnter;
    }
}
