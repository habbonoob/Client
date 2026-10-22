import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class AssetCallbackInfo {
    static { registerClassName(this, 'com.sulake.habbo.room::AssetCallbackInfo'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _listeners: IGetImageListener[];

    constructor(param1: number) {
        this._id = param1;
        this._listeners = [];
    }

    public get id(): number {
        return this._id;
    }

    public get listeners(): IGetImageListener[] {
        return this._listeners;
    }
}
