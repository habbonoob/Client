import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPlayListEditorEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPlayListEditorEvent'); }

    public static readonly SHOW_PLAYLIST_EDITOR: string = "RWPLEE_SHOW_PLAYLIST_EDITOR";
    public static readonly _SafeStr_8485: string = "RWPLEE_HIDE_PLAYLIST_EDITOR";
    public static readonly INVENTORY_UPDATED: string = "RWPLEE_INVENTORY_UPDATED";
    public static readonly SONG_DISK_INVENTORY_UPDATED: string = "RWPLEE_SONG_DISK_INVENTORY_UPDATED";
    public static readonly PLAY_LIST_UPDATED: string = "RWPLEE_PLAY_LIST_UPDATED";
    public static readonly PLAY_LIST_FULL: string = "RWPLEE_PLAY_LIST_FULL";

    constructor(param1: string, param2: number = -1, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._furniId = param2;
    }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    public get furniId(): number {
        return this._furniId;
    }
}
