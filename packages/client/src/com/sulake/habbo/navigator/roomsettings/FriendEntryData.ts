import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFlatUser } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/IFlatUser';

export class FriendEntryData implements IFlatUser {
    static { registerClassName(this, 'com.sulake.habbo.navigator.roomsettings::FriendEntryData'); }

    constructor(param1: number, param2: string) {
        this._userId = param1;
        this._userName = param2;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public get userId(): number {
        return this._userId;
    }
}
