import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';

export class BitmapSpriteWithUserId extends Bitmap {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history.visualization.entry::BitmapSpriteWithUserId'); }

    constructor() {
        super();
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _canIgnore: boolean;
    static { (this.prototype as any)._canIgnore = false; }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public set userName(param1: string) {
        this._userName = param1;
    }

    public get canIgnore(): boolean {
        return this._canIgnore;
    }

    public set canIgnore(param1: boolean) {
        this._canIgnore = param1;
    }

    public get userId(): number {
        return this._userId;
    }

    public set userId(param1: number) {
        this._userId = param1;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public set roomId(param1: number) {
        this._roomId = param1;
    }
}
