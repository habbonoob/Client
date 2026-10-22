import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class DirectionDataContainer {
    static { registerClassName(this, 'com.sulake.habbo.avatar.animation::DirectionDataContainer'); }

    declare private _offset: number;
    static { (this.prototype as any)._offset = 0; }

    constructor(param1: XML) {
        this._offset = parseInt(param1.attribute("offset").toString()) | 0;
    }

    public get offset(): number {
        return this._offset;
    }
}
