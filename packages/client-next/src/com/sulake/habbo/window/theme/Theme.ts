import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PropertyMap } from '@/com/sulake/core/window/theme/PropertyMap';

export class Theme {
    static { registerClassName(this, 'com.sulake.habbo.window.theme::Theme'); }

    public static readonly NONE: string = "None";
    public static readonly ICON: string = "Icon";
    public static readonly LEGACY_BORDER: string = "Legacy border";
    public static readonly VOLTER: string = "Volter";
    public static readonly UBUNTU: string = "Ubuntu";
    public static readonly MISC: string = "Misc";
    public static readonly ILLUMINA_LIGHT: string = "Illumina Light";
    public static readonly ILLUMINA_DARK: string = "Illumina Dark";

    declare private _name: string;

    declare private _isReal: boolean;
    static { (this.prototype as any)._isReal = false; }

    declare private _baseStyle: number;
    static { (this.prototype as any)._baseStyle = 0; }

    declare private _styleCount: number;
    static { (this.prototype as any)._styleCount = 0; }

    declare private _propertyDefaults: PropertyMap;

    constructor(param1: string, param2: boolean, param3: number, param4: number, param5: PropertyMap) {
        this._name = param1;
        this._isReal = param2;
        this._baseStyle = param3;
        this._styleCount = param4;
        this._propertyDefaults = param5;
    }

    public get name(): string {
        return this._name;
    }

    public get isReal(): boolean {
        return this._isReal;
    }

    public get baseStyle(): number {
        return this._baseStyle;
    }

    public get styleCount(): number {
        return this._styleCount;
    }

    public get propertyDefaults(): PropertyMap {
        return this._propertyDefaults;
    }

    public coversStyle(param1: number): boolean {
        return param1 >= this._baseStyle && param1 < this._baseStyle + this._styleCount;
    }
}
