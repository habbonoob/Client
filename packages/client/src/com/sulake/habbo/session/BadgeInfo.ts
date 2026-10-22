import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class BadgeInfo {
    static { registerClassName(this, 'com.sulake.habbo.session::BadgeInfo'); }

    constructor(param1: BitmapData, param2: boolean) {
        this._image = param1;
        this._placeHolder = param2;
    }

    declare private _image: BitmapData;

    declare private _placeHolder: boolean;
    static { (this.prototype as any)._placeHolder = false; }

    public get image(): BitmapData {
        return this._image;
    }

    public get placeHolder(): boolean {
        return this._placeHolder;
    }
}
