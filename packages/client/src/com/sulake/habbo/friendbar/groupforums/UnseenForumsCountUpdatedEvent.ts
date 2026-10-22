import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class UnseenForumsCountUpdatedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::UnseenForumsCountUpdatedEvent'); }

    public static readonly TYPE: string = "UNSEEN_FORUMS_COUNT";

    constructor(param1: string, param2: number) {
        super(param1);
        this._unseenForumsCount = param2;
    }

    declare private _unseenForumsCount: number;
    static { (this.prototype as any)._unseenForumsCount = 0; }

    public get unseenForumsCount(): number {
        return this._unseenForumsCount;
    }
}
