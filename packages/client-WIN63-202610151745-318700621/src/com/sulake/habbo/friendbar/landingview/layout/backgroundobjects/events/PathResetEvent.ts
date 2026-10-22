import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class PathResetEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout.backgroundobjects.events::PathResetEvent'); }

    public static readonly MOVING_OBJECT_PATH_RESET: string = "LWMOPRE_MOVING_OBJECT_PATH_RESET";

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    constructor(param1: string, param2: number, param3: boolean = false, param4: boolean = false) {
        super("LWMOPRE_MOVING_OBJECT_PATH_RESET", param3, param4);
        this._objectId = param2;
    }

    public get objectId(): number {
        return this._objectId;
    }
}
