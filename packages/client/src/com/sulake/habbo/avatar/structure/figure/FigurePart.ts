import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFigurePart } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePart';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class FigurePart implements IFigurePart {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.figure::FigurePart'); }

    constructor(param1: XML) {
        this._id = parseInt(param1.attribute("id").toString()) | 0;
        this._type = String(param1.attribute("type"));
        this._index = parseInt(param1.attribute("index").toString()) | 0;
        this._colorLayerIndex = parseInt(param1.attribute("colorindex").toString()) | 0;
        let _loc2_: string = param1.attribute("palettemapid").toString();
        if (_loc2_ != "") {
            this._SafeStr_6580 = Number(_loc2_) | 0;
        }
        let _loc3_: string = param1.attribute("breed").toString();
        if (_loc3_ != "") {
            this._breed = Number(_loc3_) | 0;
        }
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _type: string;

    private _breed: number = -1;

    declare private _colorLayerIndex: number;
    static { (this.prototype as any)._colorLayerIndex = 0; }

    private _SafeStr_6580: number = -1;

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    public get index(): number {
        return this._index;
    }

    public get id(): number {
        return this._id;
    }

    public get type(): string {
        return this._type;
    }

    public get breed(): number {
        return this._breed;
    }

    public get colorLayerIndex(): number {
        return this._colorLayerIndex;
    }

    public get paletteMap(): number {
        return this._SafeStr_6580;
    }

    public dispose(): void {
    }
}
