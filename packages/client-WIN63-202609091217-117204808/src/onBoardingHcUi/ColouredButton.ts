import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';
import { Button } from '@/onBoardingHcUi/LocalizedSprite.group';

const button_green_png_pngAsset = embedBitmap("onboarding/button_green_png.png");
const button_green_pressed_png_pngAsset = embedBitmap("onboarding/button_green_pressed_png.png");
const button_green_inactive_png_pngAsset = embedBitmap("onboarding/button_green_inactive_png.png");
const button_green_rollover_png_pngAsset = embedBitmap("onboarding/button_green_rollover_png.png");
const button_red_png_pngAsset = embedBitmap("onboarding/button_red_png.png");
const button_red_pressed_png_pngAsset = embedBitmap("onboarding/button_red_pressed_png.png");
const button_red_rollover_png_pngAsset = embedBitmap("onboarding/button_red_rollover_png.png");
const button_red_inactive_png_pngAsset = embedBitmap("onboarding/button_red_inactive_png.png");
const button_yellow_png_pngAsset = embedBitmap("onboarding/button_yellow_png.png");
const button_yellow_pressed_png_pngAsset = embedBitmap("onboarding/button_yellow_pressed_png.png");
const button_yellow_rollover_png_pngAsset = embedBitmap("onboarding/button_yellow_rollover_png.png");
const button_yellow_inactive_png_pngAsset = embedBitmap("onboarding/button_yellow_inactive_png.png");
const ColouredButton_icon_hc_pngAsset = embedBitmap("onboarding/ColouredButton_icon_hc.png");

const preSuperColouredButton: ((self: ColouredButton) => void)[] = [];

export class ColouredButton extends Button {
    static { registerClassName(this, 'onBoardingHcUi::ColouredButton'); }

    public static readonly BUTTON_RED: string = "red";
    public static readonly BUTTON_GREEN: string = "gfreen";
    public static readonly BUTTON_YELLOW: string = "yellow";

    private static readonly button_green_png = button_green_png_pngAsset;

    private static readonly button_green_pressed_png = button_green_pressed_png_pngAsset;

    private static readonly button_green_inactive_png = button_green_inactive_png_pngAsset;

    private static readonly button_green_rollover_png = button_green_rollover_png_pngAsset;

    private static readonly button_red_png = button_red_png_pngAsset;

    private static readonly button_red_pressed_png = button_red_pressed_png_pngAsset;

    private static readonly button_red_rollover_png = button_red_rollover_png_pngAsset;

    private static readonly button_red_inactive_png = button_red_inactive_png_pngAsset;

    private static readonly button_yellow_png = button_yellow_png_pngAsset;

    private static readonly button_yellow_pressed_png = button_yellow_pressed_png_pngAsset;

    private static readonly button_yellow_rollover_png = button_yellow_rollover_png_pngAsset;

    private static readonly button_yellow_inactive_png = button_yellow_inactive_png_pngAsset;

    private static readonly icon_hc = ColouredButton_icon_hc_pngAsset;

    declare private defaultBg: DisplayObject;

    declare private pressedBg: DisplayObject;

    declare private inactiveBg: DisplayObject;

    declare private rolloverBg: DisplayObject;

    declare private _icon_ColouredButton: Bitmap;

    constructor(param1: string, param2: string, param3: Rectangle, param4: boolean, param5: (...args: any[]) => any, param6: number = 16777215) {
        preSuperColouredButton.push((self: ColouredButton) => {
            switch (param1) {
                case "red":
                    self.defaultBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_red_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    self.pressedBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_red_pressed_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    self.inactiveBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_red_inactive_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    self.rolloverBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_red_rollover_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    break;
                case "gfreen":
                    self.defaultBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_green_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    self.pressedBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_green_pressed_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    self.inactiveBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_green_inactive_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    self.rolloverBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_green_rollover_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    break;
                case "yellow":
                    self.defaultBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_yellow_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    self.pressedBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_yellow_pressed_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    self.inactiveBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_yellow_inactive_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    self.rolloverBg = LoaderUI.createScale9GridShapeFromImage(castTo(new ColouredButton.button_yellow_rollover_png(), Bitmap).bitmapData, new Rectangle(8, 10, 6, 4));
                    self._icon_ColouredButton = castTo(new ColouredButton.icon_hc(), Bitmap);
            }
        });
        super(param2, param3, param4, param5, param6);
    }

    protected override get defaultBackground(): DisplayObject {
        return this.defaultBg;
    }

    protected override get pressedBackground(): DisplayObject {
        return this.pressedBg;
    }

    protected override get inactiveBackground(): DisplayObject {
        return this.inactiveBg;
    }

    protected override get rolloverBackground(): DisplayObject {
        return this.rolloverBg;
    }

    protected override get etching(): boolean {
        return false;
    }

    protected override get padding(): number {
        return 64;
    }

    protected override get textColour(): number {
        return 16777215;
    }

    protected override get icon(): Bitmap {
        return this._icon_ColouredButton;
    }

    protected override initInstanceFields(): void {
        preSuperColouredButton.pop()!(this);
        super.initInstanceFields();
    }
}
