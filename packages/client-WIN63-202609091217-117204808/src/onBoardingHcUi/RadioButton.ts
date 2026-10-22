import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { RadioButtonGroup } from '@/onBoardingHcUi/RadioButtonGroup';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';

const radio_button_off_png_pngAsset = embedBitmap("onboarding/radio_button_off_png.png");
const radio_button_on_png_pngAsset = embedBitmap("onboarding/radio_button_on_png.png");
const radio_button_off_hitch_png_pngAsset = embedBitmap("onboarding/radio_button_off_hitch_png.png");
const radio_button_on_hitch_png_pngAsset = embedBitmap("onboarding/radio_button_on_hitch_png.png");

export class RadioButton extends Sprite {
    static { registerClassName(this, 'onBoardingHcUi::RadioButton'); }

    private radio_button_off_png = radio_button_off_png_pngAsset;

    private radio_button_on_png = radio_button_on_png_pngAsset;

    private radio_button_off_hitch_png = radio_button_off_hitch_png_pngAsset;

    private radio_button_on_hitch_png = radio_button_on_hitch_png_pngAsset;

    declare private _caption: string;

    declare private _group: RadioButtonGroup;

    declare private _radioMark: Bitmap;

    declare private _captionElement: TextField;

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    declare private _skinOn: BitmapData;

    declare private _skinOff: BitmapData;

    declare private _unselectedFontColor: number;
    static { (this.prototype as any)._unselectedFontColor = 0; }

    declare private _style: number;
    static { (this.prototype as any)._style = 0; }

    constructor(param1: string, param2: RadioButtonGroup, param3: number = 1, param4: BitmapData = null, param5: BitmapData = null, param6: number = 0) {
        super();
        this._caption = param1;
        this._group = param2;
        this._style = param3;
        this.mouseChildren = false;
        this.buttonMode = true;
        this._unselectedFontColor = param6;
        let _loc7_: boolean = param3 == 2;
        this._captionElement = LoaderUI.createTextField(this._caption, 20, (param3 == 2 ? 15201722 : 0) >>> 0, true, false, false, _loc7_);
        this._captionElement.alpha = param3 == 2 ? 0.7 : 1;
        if (param3 == 1) {
            LoaderUI.addEtching(this._captionElement);
        }
        switch (param3 - 1) {
            case 0:
                this._skinOn = param4 ?? castTo(new this.radio_button_on_png(), Bitmap).bitmapData;
                this._skinOff = param5 ?? castTo(new this.radio_button_off_png(), Bitmap).bitmapData;
                break;
            case 1:
                this._skinOn = param4 ?? castTo(new this.radio_button_on_hitch_png(), Bitmap).bitmapData;
                this._skinOff = param5 ?? castTo(new this.radio_button_off_hitch_png(), Bitmap).bitmapData;
        }
        this._radioMark = new Bitmap(this._skinOff);
        this.addChild(this._radioMark);
        this._radioMark.y = (this._captionElement.height - this._radioMark.height) / 2 | 0;
        this._radioMark.alpha = param3 == 2 ? 0.8 : 1;
        this.addChild(this._captionElement);
        this._captionElement.x = this._radioMark.width + 6;
        if (this._group != null && this._group.buttons.indexOf(this) < 0) {
            this._group.buttons.push(this);
        }
        this.addEventListener("mouseDown", this.onMouseDown);
    }

    private onMouseDown = (param1: MouseEvent): void => {
        this.addEventListener("mouseUp", this.onMouseUp);
    };

    private onMouseUp = (param1: MouseEvent): void => {
        param1.stopImmediatePropagation();
        this.removeEventListener("mouseUp", this.onMouseUp);
        this.selected = true;
    };

    public get group(): RadioButtonGroup {
        return this._group;
    }

    public set group(param1: RadioButtonGroup) {
        if (this._group == param1) {
            return;
        }
        if (this._group != null && this._group.buttons.indexOf(this) >= 0) {
            this._group.buttons.splice(this._group.buttons.indexOf(this), 1);
        }
        this._group = param1;
        this.selected = false;
    }

    public setUnselectedFontColor(param1: number): void {
        this._unselectedFontColor = param1;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(param1: boolean) {
        if (this._selected == param1) {
            return;
        }
        this._selected = param1;
        if (this._selected && this._group != null) {
            for (const _loc2_ of this._group.buttons ?? []) {
                if (_loc2_ != this) {
                    _loc2_.selected = false;
                    if (this._unselectedFontColor) {
                        _loc2_._captionElement.textColor = this._unselectedFontColor;
                        _loc2_._captionElement.alpha = 0.6;
                    }
                } else {
                    _loc2_._captionElement.textColor = (this._style == 2 ? 15201722 : 0) >>> 0;
                    _loc2_._captionElement.alpha = 0.7;
                }
            }
            this._group.performSelectedAction();
        }
        this._radioMark.bitmapData = this._selected ? this._skinOn : this._skinOff;
    }
}
