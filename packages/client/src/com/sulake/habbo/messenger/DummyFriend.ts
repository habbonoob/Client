import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFriend } from '@/com/sulake/habbo/friendlist/IFriend';

export class DummyFriend implements IFriend {
    static { registerClassName(this, 'com.sulake.habbo.messenger::DummyFriend'); }

    constructor(param1: number, param2: string, param3: string) {
        this._userId = param1;
        this._userName = param2;
        this._figure = param3;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    declare private _figure: string;

    public get id(): number {
        return this._userId;
    }

    public get name(): string {
        return this._userName;
    }

    public get gender(): number {
        return 0;
    }

    public get online(): boolean {
        return true;
    }

    public get followingAllowed(): boolean {
        return true;
    }

    public get figure(): string {
        return this._figure;
    }

    public get realName(): string {
        return "";
    }

    public get persistedMessageUser(): boolean {
        return true;
    }

    public get pocketHabboUser(): boolean {
        return false;
    }

    public get relationshipStatus(): number {
        return 0;
    }
}
