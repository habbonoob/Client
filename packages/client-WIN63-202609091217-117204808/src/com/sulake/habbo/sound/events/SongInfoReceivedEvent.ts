import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class SongInfoReceivedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.sound.events::SongInfoReceivedEvent'); }

    public static readonly TRAX_SONG_INFO_RECEIVED: string = "SIR_TRAX_SONG_INFO_RECEIVED";

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    constructor(param1: string, param2: number, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._id = param2;
    }

    public get id(): number {
        return this._id;
    }
}
