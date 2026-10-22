import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PetCustomPart {
    static { registerClassName(this, 'com.sulake.habbo.avatar.pets::PetCustomPart'); }

    declare private _layerId: number;
    static { (this.prototype as any)._layerId = 0; }

    declare private _partId: number;
    static { (this.prototype as any)._partId = 0; }

    declare private _paletteId: number;
    static { (this.prototype as any)._paletteId = 0; }

    constructor(param1: number, param2: number, param3: number) {
        this._layerId = param1;
        this._partId = param2;
        this._paletteId = param3;
    }

    public get paletteId(): number {
        return this._paletteId;
    }

    public set paletteId(param1: number) {
        this._paletteId = param1;
    }

    public get partId(): number {
        return this._partId;
    }

    public set partId(param1: number) {
        this._partId = param1;
    }

    public get layerId(): number {
        return this._layerId;
    }

    public set layerId(param1: number) {
        this._layerId = param1;
    }
}
