import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class FriendRequestEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendlist.events::FriendRequestEvent'); }

    public static readonly ACCEPTED: string = "FRE_ACCEPTED";
    public static readonly DECLINED: string = "FRE_DECLINED";

    declare private _requestId: number;
    static { (this.prototype as any)._requestId = 0; }

    constructor(param1: string, param2: number, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._requestId = param2;
    }

    public get requestId(): number {
        return this._requestId;
    }
}
