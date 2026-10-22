import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Button } from '@/onBoardingHcUi/Button';
import type { IUIContext } from '@/onBoardingHcUi/IUIContext';
import type { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';
import { NineSplitSprite } from '@/onBoardingHcUi/NineSplitSprite';

export class InputField extends Sprite {
    static { registerClassName(this, 'onBoardingHcUi::InputField'); }

    private _style: number = 2;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _context: IUIContext;

    declare private _frame: Sprite;

    declare private _promptField: TextField;

    declare private _field: TextField;

    declare private _submitButton: Button;

    declare private _skipButton: Button;

    declare private _background: Bitmap;

    declare private _inputClickedAlready: boolean;
    static { (this.prototype as any)._inputClickedAlready = false; }

    declare private _inputDefaultString: string;

    declare private _dialogWidth: number;
    static { (this.prototype as any)._dialogWidth = 0; }

    declare private _isPassword: boolean;
    static { (this.prototype as any)._isPassword = false; }

    declare private _caption: string;

    declare private _subCaption: string;

    declare private _maxWidth: number;
    static { (this.prototype as any)._maxWidth = NaN; }

    declare private _prompt: string;

    constructor(param1: IUIContext, param2: number, param3: string, param4: string, param5: string, param6: string, param7: boolean = false) {
        super();
        this._context = param1;
        this._dialogWidth = param2;
        this._prompt = param3;
        this._inputDefaultString = param4 == null ? "" : param4;
        this._caption = param5;
        this._subCaption = param6;
        this._isPassword = param7;
        this.init();
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._frame) {
            this.removeChild(this._frame);
        }
        this._field = null;
        this._promptField = null;
        this._submitButton = null;
        this._skipButton = null;
        this._background = null;
        this._frame = null;
        this._context = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private init(): void {
        this._frame = LoaderUI.createFrame(this._caption, this._subCaption, new Rectangle(0, 0, this._dialogWidth, 1), this._style);
        this.addChild(this._frame);
        let _loc2_: number = 0;
        let _loc1_: Sprite = new Sprite();
        this._background = NineSplitSprite.INPUT_FIELD_HITCH.render(this._dialogWidth, 31);
        _loc1_.addChild(this._background);
        this._frame.addChild(_loc1_);
        _loc1_.x = _loc2_;
        this._maxWidth = _loc1_.width - 30;
        this._promptField = LoaderUI.createTextField(this._prompt, 18, 6710886, true, false, false, false);
        this._promptField.alpha = 0.8;
        this._promptField.x = _loc1_.x + 16;
        this._promptField.y = _loc1_.y + ((_loc1_.height - this._promptField.height) / 2 | 0);
        this._promptField.width = this._maxWidth;
        this._promptField.visible = this._inputDefaultString == null || this._inputDefaultString.length == 0;
        this._frame.addChild(this._promptField);
        this._field = LoaderUI.createTextField(this._inputDefaultString, 18, 6710886, true, false, true, false);
        this._field.displayAsPassword = this._isPassword;
        this._frame.addChild(this._field);
        this._field.x = _loc1_.x + 16;
        this._field.y = _loc1_.y + ((_loc1_.height - this._field.height) / 2 | 0);
        this._field.width = this._maxWidth;
        this._field.addEventListener("click", this.onInputClicked);
        this._field.addEventListener("change", this.onInputChange);
        if (!this._inputDefaultString || this._inputDefaultString.length == 0) {
            this._field.autoSize = "none";
            this._field.width = this._maxWidth;
        }
        _loc1_.addEventListener("click", this.onInputBackgroundClicked);
        let _loc3_: number = -50;
        this._frame.y = -(_loc3_ / 2 | 0);
    }

    private onInputChange = (param1: Event): void => {
        this._promptField.visible = this._field.text.length == 0;
        if (this._field.width > this._maxWidth) {
            this._field.autoSize = "none";
            this._field.width = this._maxWidth;
        }
        if (param1 != null) {
            this.dispatchEvent(param1.clone());
        }
    };

    private onInputBackgroundClicked = (param1: MouseEvent): void => {
        this._context.stage.focus = this._field;
        this.onInputClicked(null);
    };

    private onInputClicked = (param1: Event): void => {
        if (this._inputClickedAlready) {
            return;
        }
        this._promptField.visible = false;
        this._inputClickedAlready = true;
        this._field.textColor = (this._style == 2 ? 6710886 : 0) >>> 0;
        this._field.removeEventListener("click", this.onInputClicked);
        this.onInputChange(null);
    };

    public get text(): string {
        return this._field.text;
    }
}
