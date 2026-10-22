import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Button } from '@/onBoardingHcUi/LocalizedSprite.group';

const rnd_button_png_pngAsset = embedBitmap("shared/rnd_button_png.png");

export class randomizeButton extends Button {
    static { registerClassName(this, 'onBoardingHcUi::randomizeButton'); }

    private static readonly rnd_button_png = rnd_button_png_pngAsset;

    constructor(param1: number, param2: number, param3: (...args: any[]) => any, param4: number = 16777215) {
        super("", new Rectangle(param1, param2, 50, 52), false, param3, param4);
    }

    protected override onAddedToStage(param1: Event = null): void {
        super.onAddedToStage(param1);
    }

    protected override get defaultBackground(): DisplayObject {
        return asInstanceOf(new randomizeButton.rnd_button_png(), Bitmap);
    }

    protected override get pressedBackground(): DisplayObject {
        return asInstanceOf(new randomizeButton.rnd_button_png(), Bitmap);
    }

    protected override get inactiveBackground(): DisplayObject {
        return asInstanceOf(new randomizeButton.rnd_button_png(), Bitmap);
    }

    protected override get rolloverBackground(): DisplayObject {
        return asInstanceOf(new randomizeButton.rnd_button_png(), Bitmap);
    }
}
