import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICaption } from '@/com/sulake/core/window/utils/ICaption';

export class AlertDialogCaption implements ICaption {
    static { registerClassName(this, 'com.sulake.habbo.window.utils::AlertDialogCaption'); }

    declare private _text: string;

    declare private _toolTip: string;

    declare private _visible: boolean;
    static { (this.prototype as any)._visible = false; }

    constructor(param1: string, param2: string, param3: boolean) {
        this._text = param1;
        this._toolTip = param2;
        this._visible = param3;
    }

    public get text(): string {
        return this._text;
    }

    public set text(param1: string) {
        this._text = param1;
    }

    public get toolTip(): string {
        return this._toolTip;
    }

    public set toolTip(param1: string) {
        this._toolTip = param1;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(param1: boolean) {
        this._visible = param1;
    }
}
