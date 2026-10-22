import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class PetColorResult {
    static { registerClassName(this, 'com.sulake.habbo.room::PetColorResult'); }

    private static readonly COLOR_TAGS: any[] = ["Null", "Black", "White", "Grey", "Red", "Orange", "Pink", "Green", "Lime", "Blue", "Light-Blue", "Dark-Blue", "Yellow", "Brown", "Dark-Brown", "Beige", "Cyan", "Purple", "Gold"];

    constructor(param1: number, param2: number, param3: number, param4: number, param5: string, param6: boolean, param7: any[]) {
        this._primaryColor = param1 & 0xFFFFFF;
        this._secondaryColor = param2 & 0xFFFFFF;
        this._breed = param3;
        this._tag = stringOrNull(param4 > -1 && param4 < PetColorResult.COLOR_TAGS.length ? PetColorResult.COLOR_TAGS[param4] : "");
        this._id = param5;
        this._isMaster = param6;
        this._layerTags = param7;
    }

    declare private _breed: number;
    static { (this.prototype as any)._breed = 0; }

    declare private _tag: string;

    declare private _id: string;

    private _isMaster: boolean = false;
    private _layerTags: any[] = [];
    private _primaryColor: number = 0;

    public get primaryColor(): number {
        return this._primaryColor;
    }

    private _secondaryColor: number = 0;

    public get secondaryColor(): number {
        return this._secondaryColor;
    }

    public get breed(): number {
        return this._breed;
    }

    public get tag(): string {
        return this._tag;
    }

    public get id(): string {
        return this._id;
    }

    public get isMaster(): boolean {
        return this._isMaster;
    }

    public get layerTags(): any[] {
        return this._layerTags;
    }
}
