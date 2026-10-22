import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetPlayListEditorNowPlayingEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetPlayListEditorNowPlayingEvent'); }

    public static readonly USER_PLAY_SONG: string = "RWPLENPE_USER_PLAY_SONG";
    public static readonly USER_STOP_SONG: string = "RWPLENPW_USER_STOP_SONG";
    public static readonly NOW_PLAYING_SONG_CHANGED: string = "RWPLENPE_SONG_CHANGED";

    constructor(param1: string, param2: number, param3: number, param4: number, param5: boolean = false, param6: boolean = false) {
        super(param1, param5, param6);
        this._id = param2;
        this._position = param3;
        this._priority = param4;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _position: number;
    static { (this.prototype as any)._position = 0; }

    declare private _priority: number;
    static { (this.prototype as any)._priority = 0; }

    public get priority(): number {
        return this._priority;
    }

    public get id(): number {
        return this._id;
    }

    public get position(): number {
        return this._position;
    }
}
