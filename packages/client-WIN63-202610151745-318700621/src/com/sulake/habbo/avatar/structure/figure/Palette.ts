import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPalette } from '@/com/sulake/habbo/avatar/structure/figure/IPalette';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { PartColor } from '@/com/sulake/habbo/avatar/structure/figure/PartColor';

export class Palette implements IPalette {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.figure::Palette'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _colors: Map<any, any>;

    constructor(param1: XML) {
        this._id = parseInt(param1.attribute("id").toString()) | 0;
        this._colors = new Dictionary();
        this.append(param1);
    }

    public append(param1: XML): void {
        for (const _loc2_ of param1.child("color") ?? []) {
            this._colors.set(String(_loc2_.attribute("id")), new PartColor(_loc2_));
        }
    }

    public get id(): number {
        return this._id;
    }

    public getColor(param1: number): IPartColor {
        return this._colors.get(String(param1));
    }

    public get colors(): Map<any, any> {
        return this._colors;
    }
}
