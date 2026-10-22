import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetChatInputContentUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetChatInputContentUpdateEvent'); }

    public static readonly CHAT_INPUT_CONTENT: string = "RWWCIDE_CHAT_INPUT_CONTENT";
    public static readonly MESSAGE_TYPE_WHISPER: string = "whisper";
    public static readonly MESSAGE_TYPE_SHOUT: string = "shout";
    private _SafeStr_6717: string = "";
    private _userName: string = "";

    constructor(param1: string, param2: string = null, param3: boolean = false, param4: boolean = false) {
        super("RWWCIDE_CHAT_INPUT_CONTENT", param3, param4);
        this._SafeStr_6717 = param1;
        this._userName = param2;
    }

    public get messageType(): string {
        return this._SafeStr_6717;
    }

    public get userName(): string {
        return this._userName;
    }
}
