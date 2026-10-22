import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6078 {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::_SafeCls_6078'); }

    public static readonly _SafeStr_2166: number = 0;
    public static readonly _SafeStr_14068: number = 1;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _text: string;

    declare private _SafeStr_14064: number;
    static { (this.prototype as any)._SafeStr_14064 = 0; }

    constructor(param1: number, param2: string = "", param3: number = 0) {
        this._type = param1;
        this._text = param2;
        this._SafeStr_14064 = param3;
    }

    public static text(param1: string): _SafeCls_6078 {
        return new _SafeCls_6078(0, param1);
    }

    public static habbicon(param1: number): _SafeCls_6078 {
        return new _SafeCls_6078(1, "", param1);
    }

    public get type(): number {
        return this._type;
    }

    public get textValue(): string {
        return this._text;
    }

    public get habbiconId(): number {
        return this._SafeStr_14064;
    }
}
