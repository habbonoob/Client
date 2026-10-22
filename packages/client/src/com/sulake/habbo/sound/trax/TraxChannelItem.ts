import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TraxChannelItem {
    static { registerClassName(this, 'com.sulake.habbo.sound.trax::TraxChannelItem'); }

    constructor(param1: number, param2: number) {
        this._id = param1;
        this._length = param2;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _length: number;
    static { (this.prototype as any)._length = 0; }

    public get length(): number {
        return this._length;
    }

    public get id(): number {
        return this._id;
    }
}
