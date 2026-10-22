import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class TraxSongLoadEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.sound.events::TraxSongLoadEvent'); }

    public static readonly TRAX_LOAD_COMPLETE: string = "TSLE_TRAX_LOAD_COMPLETE";
    public static readonly TRAX_LOAD_FAILED: string = "TSLE_TRAX_LOAD_FAILED";

    constructor(param1: string, param2: number, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._id = param2;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    public get id(): number {
        return this._id;
    }
}
