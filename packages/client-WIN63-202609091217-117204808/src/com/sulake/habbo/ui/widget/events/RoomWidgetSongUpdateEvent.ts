import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';

export class RoomWidgetSongUpdateEvent extends RoomWidgetUpdateEvent {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.events::RoomWidgetSongUpdateEvent'); }

    public static readonly SONG_PLAYING_CHANGED: string = "RWSUE_PLAYING_CHANGED";
    public static readonly SONG_DATA_RECEIVED: string = "RWSUE_DATA_RECEIVED";

    declare private _SafeStr_4873: number;
    static { (this.prototype as any)._SafeStr_4873 = 0; }

    declare private _songName: string;

    declare private _songAuthor: string;

    constructor(param1: string, param2: number, param3: string, param4: string, param5: boolean = false, param6: boolean = false) {
        super(param1, param5, param6);
        this._SafeStr_4873 = param2;
        this._songName = param3;
        this._songAuthor = param4;
    }

    public get songId(): number {
        return this._SafeStr_4873;
    }

    public get songName(): string {
        return this._songName;
    }

    public get songAuthor(): string {
        return this._songAuthor;
    }
}
