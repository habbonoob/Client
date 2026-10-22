import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class NumberInputParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::NumberInputParam'); }

    static #staticsReady = false;

    public static get DEFAULT(): TextInputParam {
        NumberInputParam.#initStatics();
        return NumberInputParam.DEFAULT;
    }
    public static set DEFAULT(value: TextInputParam) {
        NumberInputParam.#initStatics();
        NumberInputParam.DEFAULT = value;
    }

    declare private _initialValue: number;
    static { (this.prototype as any)._initialValue = 0; }

    declare private _min: number;
    static { (this.prototype as any)._min = 0; }

    declare private _SafeStr_4035: number;
    static { (this.prototype as any)._SafeStr_4035 = 0; }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _precision: number;
    static { (this.prototype as any)._precision = 0; }

    declare private _endsWithFive: boolean;
    static { (this.prototype as any)._endsWithFive = false; }

    declare private _nonDecimalNotations: boolean;
    static { (this.prototype as any)._nonDecimalNotations = false; }

    declare private _tooltip: string;

    constructor(param1: number, param2: number, param3: number, param4: number = 45, param5: number = 0, param6: boolean = false, param7: boolean = false, param8: string = null) {
        this._initialValue = param1;
        this._min = param2;
        this._SafeStr_4035 = param3;
        this._precision = param5;
        this._endsWithFive = param6;
        this._width = param4;
        this._nonDecimalNotations = param7;
        this._tooltip = param8;
    }

    public get initialValue(): number {
        return this._initialValue;
    }

    public get min(): number {
        return this._min;
    }

    public get max(): number {
        return this._SafeStr_4035;
    }

    public get precision(): number {
        return this._precision;
    }

    public get endsWithFive(): boolean {
        return this._endsWithFive;
    }

    public get width(): number {
        return this._width;
    }

    public get nonDecimalNotations(): boolean {
        return this._nonDecimalNotations;
    }

    public get tooltip(): string {
        return this._tooltip;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (NumberInputParam.#staticsReady) return;
        NumberInputParam.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(NumberInputParam, name, { value, writable: true, configurable: true, enumerable: true });
        set("DEFAULT", null);
        set("DEFAULT", new TextInputParam());
    }
}
