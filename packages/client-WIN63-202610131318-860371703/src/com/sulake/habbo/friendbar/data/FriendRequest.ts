import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriendRequest } from '@/com/sulake/habbo/friendbar/data/IFriendRequest';

export class FriendRequest implements IFriendRequest {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.data::FriendRequest'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    declare private _figure: string;

    constructor(param1: number, param2: string, param3: string) {
        this._id = param1;
        this._name = param2;
        this._figure = param3;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get figure(): string {
        return this._figure;
    }
}
