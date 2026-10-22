import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';

export class BitmapSpriteWithUserId extends Bitmap {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history.visualization.entry::BitmapSpriteWithUserId'); }

    declare private _userIndex: number;
    static { (this.prototype as any)._userIndex = 0; }

    declare private _webId: number;
    static { (this.prototype as any)._webId = 0; }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _SafeStr_6758: boolean;
    static { (this.prototype as any)._SafeStr_6758 = false; }

    declare private _userName: string;

    constructor() {
        super();
    }

    public get canIgnore(): boolean {
        return this._SafeStr_6758;
    }

    public set canIgnore(param1: boolean) {
        this._SafeStr_6758 = param1;
    }

    public get userName(): string {
        return this._userName;
    }

    public set userName(param1: string) {
        this._userName = param1;
    }

    public get userIndex(): number {
        return this._userIndex;
    }

    public set userIndex(param1: number) {
        this._userIndex = param1;
    }

    public get webId(): number {
        return this._webId;
    }

    public set webId(param1: number) {
        this._webId = param1;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public set roomId(param1: number) {
        this._roomId = param1;
    }
}
