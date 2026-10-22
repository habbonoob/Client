import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class PartDefinition {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.parts::PartDefinition'); }

    declare private _SafeStr_6084: string;

    declare private _SafeStr_5334: string;

    declare private _removeSetType: string;

    declare private _appendToFigure: boolean;
    static { (this.prototype as any)._appendToFigure = false; }

    private _SafeStr_5900: number = -1;

    constructor(param1: XML) {
        this._SafeStr_6084 = String(param1.attribute("set-type"));
        this._SafeStr_5334 = String(param1.attribute("flipped-set-type"));
        this._removeSetType = String(param1.attribute("remove-set-type"));
        this._appendToFigure = false;
    }

    public hasStaticId(): boolean {
        return this._SafeStr_5900 >= 0;
    }

    public get staticId(): number {
        return this._SafeStr_5900;
    }

    public set staticId(param1: number) {
        this._SafeStr_5900 = param1;
    }

    public get setType(): string {
        return this._SafeStr_6084;
    }

    public get flippedSetType(): string {
        return this._SafeStr_5334;
    }

    public get removeSetType(): string {
        return this._removeSetType;
    }

    public get appendToFigure(): boolean {
        return this._appendToFigure;
    }

    public set appendToFigure(param1: boolean) {
        this._appendToFigure = param1;
    }

    public set flippedSetType(param1: string) {
        this._SafeStr_5334 = param1;
    }
}
