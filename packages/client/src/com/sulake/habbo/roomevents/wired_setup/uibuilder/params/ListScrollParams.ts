import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ListScrollParams {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::ListScrollParams'); }

    constructor(param1: boolean, param2: number, param3: number) {
        this._alwaysShowScrollbar = param1;
        this._minHeight = param2;
        this._maxHeight = param3;
    }

    declare private _minHeight: number;
    static { (this.prototype as any)._minHeight = 0; }

    declare private _maxHeight: number;
    static { (this.prototype as any)._maxHeight = 0; }

    declare private _alwaysShowScrollbar: boolean;
    static { (this.prototype as any)._alwaysShowScrollbar = false; }

    public get alwaysShowScrollbar(): boolean {
        return this._alwaysShowScrollbar;
    }

    public get minHeight(): number {
        return this._minHeight;
    }

    public get maxHeight(): number {
        return this._maxHeight;
    }
}
