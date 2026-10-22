import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class ChatStyleGridEntry {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chatinput.styleselector::ChatStyleGridEntry'); }

    constructor(param1: number, param2: BitmapData) {
        this._id = param1;
        this._bitmap = param2;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _bitmap: BitmapData;

    public get bitmap(): BitmapData {
        return this._bitmap;
    }

    public get id(): number {
        return this._id;
    }
}
