import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class AssetAlias {
    static { registerClassName(this, 'com.sulake.habbo.avatar.alias::AssetAlias'); }

    declare private _name: string;

    declare private _link: string;

    declare private _flipH: boolean;
    static { (this.prototype as any)._flipH = false; }

    declare private _flipV: boolean;
    static { (this.prototype as any)._flipV = false; }

    constructor(param1: XML) {
        this._name = String(param1.attribute("name"));
        this._link = String(param1.attribute("link"));
        this._flipH = Boolean(parseInt(param1.attribute("fliph").toString()));
        this._flipV = Boolean(parseInt(param1.attribute("flipv").toString()));
    }

    public get name(): string {
        return this._name;
    }

    public get link(): string {
        return this._link;
    }

    public get flipH(): boolean {
        return this._flipH;
    }

    public get flipV(): boolean {
        return this._flipV;
    }
}
