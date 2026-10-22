import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class NowPlayingEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.sound.events::NowPlayingEvent'); }

    public static readonly USER_PLAY_SONG: string = "NPE_USER_PLAY_SONG";
    public static readonly USER_STOP_SONG: string = "NPW_USER_STOP_SONG";
    public static readonly NOW_PLAYING_SONG_CHANGED: string = "NPE_SONG_CHANGED";

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _position: number;
    static { (this.prototype as any)._position = 0; }

    declare private _priority: number;
    static { (this.prototype as any)._priority = 0; }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: boolean = false, param6: boolean = false) {
        super(param1, param5, param6);
        this._id = param3;
        this._position = param4;
        this._priority = param2;
    }

    public get id(): number {
        return this._id;
    }

    public get position(): number {
        return this._position;
    }

    public get priority(): number {
        return this._priority;
    }
}
