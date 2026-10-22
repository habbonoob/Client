import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TableCell {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.tableview::TableCell'); }

    public static _SafeStr_2166: number = 0;
    public static _SafeStr_3709: number = 1;

    constructor(param1: number, param2: any, param3: boolean = false, param4: boolean = false, param5: string = null, param6: (...args: any[]) => any = null, param7: boolean = false, param8: string = null, param9: number = 0) {
        this._type = param1;
        this._contents = param2;
        this._isEditable = param3;
        this._isInspectable = param4;
        this._linkClickCallback = param6;
        if (param5 == null && (param3 || param4)) {
            param5 = typeof param2 === "string" ? param2 : null;
        }
        this._textFieldValue = param5;
        this._highlightOnChange = param7;
        this._tooltipText = param8;
        this._textColor = param9 | 0;
    }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _contents: any;

    declare private _isInspectable: boolean;
    static { (this.prototype as any)._isInspectable = false; }

    declare private _isEditable: boolean;
    static { (this.prototype as any)._isEditable = false; }

    declare private _textFieldValue: string;

    declare private _tooltipText: string;

    declare private _extraBtn: string;

    declare private _linkClickCallback: (...args: any[]) => any;

    public get linkClickCallback(): (...args: any[]) => any {
        return this._linkClickCallback;
    }

    declare private _highlightOnChange: boolean;
    static { (this.prototype as any)._highlightOnChange = false; }

    public get highlightOnChange(): boolean {
        return this._highlightOnChange;
    }

    declare private _textColor: number;
    static { (this.prototype as any)._textColor = 0; }

    public get textColor(): number {
        return this._textColor;
    }

    declare private _extraBtnCallback: (...args: any[]) => any;

    public get extraBtnCallback(): (...args: any[]) => any {
        return this._extraBtnCallback;
    }

    public get type(): number {
        return this._type;
    }

    public get isEditable(): boolean {
        return this._isEditable;
    }

    public get contents(): any {
        return this._contents;
    }

    public get isInspectable(): boolean {
        return this._isInspectable;
    }

    public get textFieldValue(): string {
        return this._textFieldValue;
    }

    public get tooltipText(): string {
        return this._tooltipText;
    }

    public get extraBtn(): string {
        return this._extraBtn;
    }

    public setExtraBtn(param1: string, param2: (...args: any[]) => any): any {
        this._extraBtn = param1;
        this._extraBtnCallback = param2;
    }
}
