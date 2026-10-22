import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetOpenCatalogMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetOpenCatalogMessage'); }

    public static readonly _SafeStr_8385: string = "RWGOI_MESSAGE_OPEN_CATALOG";
    public static readonly CATALOG_CLUB: string = "RWOCM_CLUB_MAIN";
    public static readonly PIXELS: string = "RWOCM_PIXELS";
    public static readonly CREDITS: string = "RWOCM_CREDITS";
    public static readonly SHELLS: string = "RWOCM_SHELLS";
    private _pageKey: string = "";

    constructor(param1: string) {
        super("RWGOI_MESSAGE_OPEN_CATALOG");
        this._pageKey = param1;
    }

    public get pageKey(): string {
        return this._pageKey;
    }
}
