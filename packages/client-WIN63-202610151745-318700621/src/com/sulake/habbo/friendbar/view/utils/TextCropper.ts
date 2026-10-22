import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class TextCropper implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.utils::TextCropper'); }

    private _disposed: boolean = false;

    declare private _SafeStr_2179: TextField;

    declare private _textFormat: TextFormat;

    private _tailText: string = "...";
    private _SafeStr_7446: number = 20;

    constructor() {
        this._SafeStr_2179 = new TextField();
        this._SafeStr_2179.autoSize = "left";
        this._SafeStr_2179.antiAliasType = "advanced";
        this._SafeStr_2179.gridFitType = "pixel";
        this._textFormat = this._SafeStr_2179.defaultTextFormat;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._SafeStr_2179 = null;
            this._disposed = true;
        }
    }

    public crop(param1: ITextWindow): void {
        let _loc2_: number = 0;
        this._textFormat.font = param1.fontFace;
        this._textFormat.size = param1.fontSize;
        this._textFormat.bold = param1.bold;
        this._textFormat.italic = param1.italic;
        this._SafeStr_2179.setTextFormat(this._textFormat);
        this._SafeStr_2179.text = param1.getLineText(0);
        let _loc3_: number = this._SafeStr_2179.textWidth | 0;
        if (_loc3_ > param1.width) {
            _loc2_ = this._SafeStr_2179.getCharIndexAtPoint(param1.width - this._SafeStr_7446, this._SafeStr_2179.textHeight / 2);
            param1.text = param1.text.slice(0, _loc2_) + this._tailText;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
