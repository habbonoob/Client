import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TextInputParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::TextInputParam'); }

    static #staticsReady = false;

    public static get DEFAULT(): TextInputParam {
        TextInputParam.#initStatics();
        return TextInputParam.DEFAULT;
    }
    public static set DEFAULT(value: TextInputParam) {
        TextInputParam.#initStatics();
        TextInputParam.DEFAULT = value;
    }

    declare private _initialText: string;

    declare private _maxCharacters: number;
    static { (this.prototype as any)._maxCharacters = 0; }

    declare private _placeholder: string;

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _restrict: string;

    declare private _editable: boolean;
    static { (this.prototype as any)._editable = false; }

    declare private _tooltip: string;

    constructor(param1: string = "", param2: number = 1000, param3: string = null, param4: number = -1, param5: string = null, param6: boolean = true, param7: string = null) {
        this._initialText = param1;
        this._maxCharacters = param2;
        this._placeholder = param3;
        this._width = param4;
        this._restrict = param5;
        this._editable = param6;
        this._tooltip = param7;
    }

    public get initialText(): string {
        return this._initialText;
    }

    public get maxCharacters(): number {
        return this._maxCharacters;
    }

    public get placeholder(): string {
        return this._placeholder;
    }

    public get width(): number {
        return this._width;
    }

    public get restrict(): string {
        return this._restrict;
    }

    public get editable(): boolean {
        return this._editable;
    }

    public get tooltip(): string {
        return this._tooltip;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TextInputParam.#staticsReady) return;
        TextInputParam.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TextInputParam, name, { value, writable: true, configurable: true, enumerable: true });
        set("DEFAULT", null);
        set("DEFAULT", new TextInputParam());
    }
}
