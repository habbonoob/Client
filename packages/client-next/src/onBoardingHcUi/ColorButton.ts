import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Button } from '@/onBoardingHcUi/LocalizedSprite.group';

const button_coloritem_png_pngAsset = embedBitmap("onboarding/button_coloritem_png.png");
const button_color_hover_png_pngAsset = embedBitmap("onboarding/button_color_hover_png.png");
const button_color_selected_png_pngAsset = embedBitmap("onboarding/button_color_selected_png.png");
const button_color_inside_png_pngAsset = embedBitmap("onboarding/button_color_inside_png.png");

const preSuperColorButton: ((self: ColorButton) => void)[] = [];

export class ColorButton extends Button {
    static { registerClassName(this, 'onBoardingHcUi::ColorButton'); }

    private static readonly button_coloritem_png = button_coloritem_png_pngAsset;

    private static readonly button_color_hover_png = button_color_hover_png_pngAsset;

    private static readonly button_color_selected_png = button_color_selected_png_pngAsset;

    private static readonly button_color_inside_png = button_color_inside_png_pngAsset;

    declare private _index: number;

    declare private _club: boolean;

    declare private _color: number;

    declare private _mainSprite: Sprite;

    declare private _colorBmd: BitmapData;

    constructor(param1: number, param2: number, param3: (...args: any[]) => any, param4: number = 16777215, param5: number = 16777215) {
        preSuperColorButton.push((self: ColorButton) => {
            self._color = param5;
        });
        super("", new Rectangle(param1, param2, 44, 46), false, param3, param4);
    }

    public setColor(param1: number): void {
        this._color = param1;
        this._mainSprite = new Sprite();
        let _loc2_: BitmapData = new ColorButton.button_color_inside_png().bitmapData;
        let _loc3_: ColorTransform = new ColorTransform();
        _loc3_.color = param1 >>> 0;
        _loc2_.colorTransform(new Rectangle(0, 0, _loc2_.width, _loc2_.height), _loc3_);
        this._colorBmd = _loc2_;
    }

    protected override onAddedToStage(param1: Event = null): void {
        super.onAddedToStage(param1);
        if (this._color > 0) {
            this.setColor(this._color);
        }
    }

    public set index(param1: number) {
        this._index = param1;
    }

    public get index(): number {
        return this._index;
    }

    public set club(param1: boolean) {
        this._club = param1;
    }

    public get club(): boolean {
        return this._club;
    }

    protected override get defaultBackground(): DisplayObject {
        let _loc2_: BitmapData = castTo(new ColorButton.button_coloritem_png(), Bitmap).bitmapData;
        let _loc1_: BitmapData = new BitmapData(_loc2_.width, _loc2_.height, true, this._color >>> 0);
        _loc1_.copyPixels(this._colorBmd, this._colorBmd.rect, new Point(0, 0));
        _loc1_.copyPixels(_loc2_, _loc2_.rect, new Point(0, 0), null, null, true);
        return new Bitmap(_loc1_);
    }

    protected override get pressedBackground(): DisplayObject {
        let _loc2_: BitmapData = castTo(new ColorButton.button_color_selected_png(), Bitmap).bitmapData;
        let _loc1_: BitmapData = new BitmapData(_loc2_.width, _loc2_.height, true, this._color >>> 0);
        _loc1_.copyPixels(this._colorBmd, this._colorBmd.rect, new Point(0, 0));
        _loc1_.copyPixels(_loc2_, _loc2_.rect, new Point(0, 0), null, null, true);
        return new Bitmap(_loc1_);
    }

    protected override get inactiveBackground(): DisplayObject {
        let _loc2_: BitmapData = castTo(new ColorButton.button_coloritem_png(), Bitmap).bitmapData;
        let _loc1_: BitmapData = new BitmapData(_loc2_.width, _loc2_.height, true, this._color >>> 0);
        _loc1_.copyPixels(this._colorBmd, this._colorBmd.rect, new Point(0, 0));
        _loc1_.copyPixels(_loc2_, _loc2_.rect, new Point(0, 0), null, null, true);
        return new Bitmap(_loc1_);
    }

    protected override get rolloverBackground(): DisplayObject {
        let _loc2_: BitmapData = castTo(new ColorButton.button_color_hover_png(), Bitmap).bitmapData;
        let _loc1_: BitmapData = new BitmapData(_loc2_.width, _loc2_.height, true, this._color >>> 0);
        _loc1_.copyPixels(this._colorBmd, this._colorBmd.rect, new Point(0, 0));
        _loc1_.copyPixels(_loc2_, _loc2_.rect, new Point(0, 0), null, null, true);
        return new Bitmap(_loc1_);
    }

    protected override initInstanceFields(): void {
        this._index = 0;
        this._club = false;
        this._color = -1;
        preSuperColorButton.pop()!(this);
        super.initInstanceFields();
    }
}
