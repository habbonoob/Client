import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TextAreaParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::TextAreaParam'); }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    declare private _width: number;
    static { (this.prototype as any)._width = 0; }

    declare private _maxLines: number;
    static { (this.prototype as any)._maxLines = 0; }

    declare private _SafeStr_6144: number;
    static { (this.prototype as any)._SafeStr_6144 = 0; }

    declare private _maxCharacters: number;
    static { (this.prototype as any)._maxCharacters = 0; }

    declare private _initialText: string;

    declare private _placeholder: string;

    declare private _restrict: string;

    declare private _editable: boolean;
    static { (this.prototype as any)._editable = false; }

    declare private _wordwrap: boolean;
    static { (this.prototype as any)._wordwrap = false; }

    declare private _tooltip: string;

    constructor(param1: number, param2: number = -1, param3: number = -1, param4: number = -1, param5: number = 1000, param6: string = "", param7: string = null, param8: string = null, param9: boolean = true, param10: boolean = false, param11: string = null) {
        this._height = param1;
        this._width = param2;
        this._maxLines = param3;
        this._SafeStr_6144 = param4;
        this._maxCharacters = param5;
        this._initialText = param6;
        this._placeholder = param7;
        this._restrict = param8;
        this._editable = param9;
        this._wordwrap = param10;
        this._tooltip = param11;
    }

    public get height(): number {
        return this._height;
    }

    public get width(): number {
        return this._width;
    }

    public get maxLines(): number {
        return this._maxLines;
    }

    public get maxCharactersPerLine(): number {
        return this._SafeStr_6144;
    }

    public get maxCharacters(): number {
        return this._maxCharacters;
    }

    public get initialText(): string {
        return this._initialText;
    }

    public get placeholder(): string {
        return this._placeholder;
    }

    public get editable(): boolean {
        return this._editable;
    }

    public get restrict(): string {
        return this._restrict;
    }

    public get wordwrap(): boolean {
        return this._wordwrap;
    }

    public get tooltip(): string {
        return this._tooltip;
    }
}
