import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Button } from '@/onBoardingHcUi/LocalizedSprite.group';

const button_round_png_pngAsset = embedBitmap("onboarding/button_round_png.png");
const button_round_pressed_png_pngAsset = embedBitmap("onboarding/button_round_pressed_png.png");
const button_round_over_png_pngAsset = embedBitmap("onboarding/button_round_over_png.png");
const button_grid_currently_active_png_pngAsset = embedBitmap("onboarding/button_grid_currently_active_png.png");

export class RoundButton extends Button {
    static { registerClassName(this, 'onBoardingHcUi::RoundButton'); }

    private static readonly button_round_png = button_round_png_pngAsset;

    private static readonly button_round_pressed_png = button_round_pressed_png_pngAsset;

    private static readonly button_round_over_png = button_round_over_png_pngAsset;

    private static readonly button_grid_currently_active_png = button_grid_currently_active_png_pngAsset;

    declare private _icon_RoundButton: BitmapData;

    constructor(param1: number, param2: number, param3: (...args: any[]) => any, param4: number = 16777215) {
        super("", new Rectangle(param1, param2, 50, 53), false, param3, param4);
    }

    public addIcon(param1: BitmapData): void {
        this._icon_RoundButton = param1;
        let _loc2_: Bitmap = new Bitmap(param1);
        _loc2_.x = (this.width - _loc2_.width) / 2;
        _loc2_.y = (this.height - _loc2_.height) / 2;
        this.addChild(_loc2_);
    }

    protected override onAddedToStage(param1: Event = null): void {
        super.onAddedToStage(param1);
        if (this._icon_RoundButton) {
            this.addIcon(this._icon_RoundButton);
        }
    }

    protected override get defaultBackground(): DisplayObject {
        return asInstanceOf(new RoundButton.button_round_png(), Bitmap);
    }

    protected override get pressedBackground(): DisplayObject {
        return asInstanceOf(new RoundButton.button_round_pressed_png(), Bitmap);
    }

    protected override get inactiveBackground(): DisplayObject {
        return asInstanceOf(new RoundButton.button_round_png(), Bitmap);
    }

    protected override get rolloverBackground(): DisplayObject {
        return asInstanceOf(new RoundButton.button_round_over_png(), Bitmap);
    }

    protected override get currentlyActive(): DisplayObject {
        return asInstanceOf(new RoundButton.button_grid_currently_active_png(), Bitmap);
    }
}
