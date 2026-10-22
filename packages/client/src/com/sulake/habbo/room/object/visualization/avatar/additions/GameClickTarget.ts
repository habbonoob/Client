import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IAvatarAddition';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class GameClickTarget implements IAvatarAddition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar.additions::GameClickTarget'); }

    private static readonly WIDTH: number = 46;
    private static readonly HEIGHT: number = 60;
    private static readonly _SafeStr_8224: number = -23;
    private static readonly _SafeStr_8360: number = -48;

    constructor(param1: number) {
        this._id = param1;
    }

    private _id: number = -1;

    declare private _bitmap: BitmapData;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get id(): number {
        return this._id;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._bitmap = null;
            this._disposed = true;
        }
    }

    public animate(param1: IRoomObjectSprite): boolean {
        return false;
    }

    public update(param1: IRoomObjectSprite, param2: number): void {
        if (!param1) {
            return;
        }
        if (!this._bitmap) {
            this._bitmap = new BitmapData(46, 60, true, 0);
        }
        param1.visible = true;
        param1.asset = this._bitmap;
        param1.offsetX = -23;
        param1.offsetY = -48;
        param1.alphaTolerance = -1;
    }

    get [IDisposable](): true {
        return true;
    }
}
