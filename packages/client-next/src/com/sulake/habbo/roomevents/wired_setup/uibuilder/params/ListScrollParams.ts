import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ListScrollParams {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::ListScrollParams'); }

    declare private _alwaysShowScrollbar: boolean;
    static { (this.prototype as any)._alwaysShowScrollbar = false; }

    declare private _minHeight: number;
    static { (this.prototype as any)._minHeight = 0; }

    declare private _maxHeight: number;
    static { (this.prototype as any)._maxHeight = 0; }

    declare private _SafeStr_14676: boolean;
    static { (this.prototype as any)._SafeStr_14676 = false; }

    declare private _SafeStr_14677: boolean;
    static { (this.prototype as any)._SafeStr_14677 = false; }

    constructor(param1: boolean, param2: number, param3: number, param4: boolean = false, param5: boolean = false) {
        this._alwaysShowScrollbar = param1;
        this._minHeight = param2;
        this._maxHeight = param3;
        this._SafeStr_14676 = param4;
        this._SafeStr_14677 = param5;
    }

    public get alwaysShowScrollbar(): boolean {
        return this._alwaysShowScrollbar;
    }

    public get minHeight(): number {
        return this._minHeight;
    }

    public get maxHeight(): number {
        return this._maxHeight;
    }

    public get stickyFooter(): boolean {
        return this._SafeStr_14676;
    }

    public get stickyHeader(): boolean {
        return this._SafeStr_14677;
    }
}
