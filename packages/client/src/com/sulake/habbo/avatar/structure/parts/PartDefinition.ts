import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class PartDefinition {
    static { registerClassName(this, 'com.sulake.habbo.avatar.structure.parts::PartDefinition'); }

    constructor(param1: XML) {
        this._setType = String(param1.attribute("set-type"));
        this._flippedSetType = String(param1.attribute("flipped-set-type"));
        this._removeSetType = String(param1.attribute("remove-set-type"));
        this._appendToFigure = false;
    }

    declare private _setType: string;

    declare private _flippedSetType: string;

    declare private _removeSetType: string;

    declare private _appendToFigure: boolean;
    static { (this.prototype as any)._appendToFigure = false; }

    private _staticId: number = -1;

    public get staticId(): number {
        return this._staticId;
    }

    public set staticId(param1: number) {
        this._staticId = param1;
    }

    public get setType(): string {
        return this._setType;
    }

    public get flippedSetType(): string {
        return this._flippedSetType;
    }

    public set flippedSetType(param1: string) {
        this._flippedSetType = param1;
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

    public hasStaticId(): boolean {
        return this._staticId >= 0;
    }
}
