import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class FriendBarSelectionEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.events::FriendBarSelectionEvent'); }

    public static readonly FRIEND_SELECTED: string = "FBVE_FRIEND_SELECTED";

    constructor(param1: number, param2: string) {
        super("FBVE_FRIEND_SELECTED");
        this._friendId = param1;
        this._friendName = param2;
    }

    declare private _friendId: number;
    static { (this.prototype as any)._friendId = 0; }

    declare private _friendName: string;

    public get friendName(): string {
        return this._friendName;
    }

    public get friendId(): number {
        return this._friendId;
    }
}
