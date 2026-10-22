import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class AssetAlias {
    static { registerClassName(this, 'com.sulake.habbo.avatar.alias::AssetAlias'); }

    constructor(param1: XML) {
        this._name = String(param1.attribute("name"));
        this._link = String(param1.attribute("link"));
        this._flipH = Boolean(parseInt(param1.attribute("fliph").toString()));
        this._flipV = Boolean(parseInt(param1.attribute("flipv").toString()));
    }

    declare private _link: string;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    declare private _flipH: boolean;
    static { (this.prototype as any)._flipH = false; }

    public get flipH(): boolean {
        return this._flipH;
    }

    declare private _flipV: boolean;
    static { (this.prototype as any)._flipV = false; }

    public get flipV(): boolean {
        return this._flipV;
    }

    public get link(): string {
        return this._link;
    }
}
