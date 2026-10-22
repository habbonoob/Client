import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TextParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::TextParam'); }

    static #staticsReady = false;

    public static readonly NO_COLOR_OVERRIDE: number = 0;
    public static readonly MODE_STRETCH: number = 0;
    public static readonly MODE_MULTILINE: number = 1;
    public static readonly MODE_OVERFLOW: number = 2;

    public static get DEFAULT(): TextParam {
        TextParam.#initStatics();
        return TextParam.DEFAULT;
    }

    constructor(param1: number, param2: boolean = false, param3: number = 0, param4: boolean = false, param5: string = null) {
        this._mode = param1;
        this._bold = param2;
        this._maxLines = param3;
        this._underline = param4;
        this._alignment = param5;
    }

    declare private _bold: boolean;
    static { (this.prototype as any)._bold = false; }

    declare private _underline: boolean;
    static { (this.prototype as any)._underline = false; }

    declare private _alignment: string;

    private _fontSize: number = -1;

    declare private _mode: number;
    static { (this.prototype as any)._mode = 0; }

    public get mode(): number {
        return this._mode;
    }

    declare private _maxLines: number;
    static { (this.prototype as any)._maxLines = 0; }

    public get maxLines(): number {
        return this._maxLines;
    }

    private _textColor: number = 0;

    public get textColor(): number {
        return this._textColor;
    }

    public set textColor(param1: number) {
        this._textColor = param1;
    }

    public get bold(): boolean {
        return this._bold;
    }

    public get underline(): boolean {
        return this._underline;
    }

    public get alignment(): string {
        return this._alignment;
    }

    public get fontSize(): number {
        return this._fontSize;
    }

    public set fontSize(param1: number) {
        this._fontSize = param1;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TextParam.#staticsReady) return;
        TextParam.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TextParam, name, { value, writable: true, configurable: true, enumerable: true });
        set("DEFAULT", null);
        set("DEFAULT", new TextParam(1, false));
    }
}
