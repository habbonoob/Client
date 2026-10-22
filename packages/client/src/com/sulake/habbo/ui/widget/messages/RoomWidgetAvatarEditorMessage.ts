import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetAvatarEditorMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetAvatarEditorMessage'); }

    public static readonly _SafeStr_7949: string = "RWCM_OPEN_AVATAR_EDITOR";
    public static readonly WIDGET_MESSAGE_GET_WARDROBE: string = "RWCM_GET_WARDROBE";
    public static readonly _SafeStr_8010: string = "RWAEM_AVATAR_EDITOR_VIEW_DISPOSED";

    constructor(param1: string, param2: IWindowContainer = null) {
        super(param1);
        this._context = param2;
    }

    declare private _context: IWindowContainer;

    public get context(): IWindowContainer {
        return this._context;
    }
}
