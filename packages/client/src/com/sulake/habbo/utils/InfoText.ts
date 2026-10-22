import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class InfoText {
    static { registerClassName(this, 'com.sulake.habbo.utils::InfoText'); }

    constructor(param1: ITextFieldWindow, param2: string = null) {
        this._input = param1;
        if (param2 != null) {
            this._includeInfo = true;
            this._SafeStr_5194 = param2;
            this._input.text = param2;
        }
        this._input.addEventListener("WE_FOCUSED", this.onFocus);
    }

    declare private _input: ITextFieldWindow;

    declare private _includeInfo: boolean;
    static { (this.prototype as any)._includeInfo = false; }

    private _SafeStr_5194: string = "";

    public get input(): ITextFieldWindow {
        return this._input;
    }

    public dispose(): void {
        if (this._input) {
            this._input.dispose();
            this._input = null;
        }
    }

    public goBackToInitialState(): void {
        this._input.text = this._SafeStr_5194;
        this._includeInfo = true;
    }

    public getText(): string {
        return this._includeInfo ? "" : this._input.text;
    }

    public setText(param1: string): void {
        this._includeInfo = false;
        this._input.text = param1;
    }

    private onFocus = (param1: WindowEvent): void => {
        if (!this._includeInfo) {
            return;
        }
        this._input.text = "";
        this._includeInfo = false;
    };
}
