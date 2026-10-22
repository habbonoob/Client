import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { MathUtils } from '@/com/sulake/habbo/utils/MathUtils';

const border_sunk_png_pngAsset = embedBitmap("onboarding/border_sunk_png.png");
const dark_popup_png_pngAsset = embedBitmap("onboarding/dark_popup_png.png");
const divider_png_pngAsset = embedBitmap("onboarding/divider_png.png");
const frame_png_pngAsset = embedBitmap("shared/frame_png.png");
const input_corrected_png_pngAsset = embedBitmap("onboarding/input_corrected_png.png");
const input_error_png_pngAsset = embedBitmap("onboarding/input_error_png.png");
const input_field_png_pngAsset = embedBitmap("onboarding/input_field_png.png");
const input_corrected_hitch_png_pngAsset = embedBitmap("onboarding/input_corrected_hitch_png.png");
const input_error_hitch_png_pngAsset = embedBitmap("onboarding/input_error_hitch_png.png");
const input_field_hitch_png_pngAsset = embedBitmap("onboarding/input_field_hitch_png.png");
const white_balloon_png_pngAsset = embedBitmap("onboarding/white_balloon_png.png");
const block_dark_base_png_pngAsset = embedBitmap("onboarding/block_dark_base_png.png");

export class NineSplitSprite {
    static { registerClassName(this, 'onBoardingHcUi::NineSplitSprite'); }

    static #staticsReady = false;

    private static readonly border_sunk_png = border_sunk_png_pngAsset;

    private static readonly dark_popup_png = dark_popup_png_pngAsset;

    private static readonly divider_png = divider_png_pngAsset;

    private static readonly frame_png = frame_png_pngAsset;

    private static readonly input_corrected_png = input_corrected_png_pngAsset;

    private static readonly input_error_png = input_error_png_pngAsset;

    private static readonly input_field_png = input_field_png_pngAsset;

    private static readonly input_corrected_hitch_png = input_corrected_hitch_png_pngAsset;

    private static readonly input_error_hitch_png = input_error_hitch_png_pngAsset;

    private static readonly input_field_hitch_png = input_field_hitch_png_pngAsset;

    private static readonly white_balloon_png = white_balloon_png_pngAsset;

    private static readonly block_dark_base_png = block_dark_base_png_pngAsset;

    private static get BORDER_SUNK_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.BORDER_SUNK_BITMAP;
    }

    public static get DARK_POPUP_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.DARK_POPUP_BITMAP;
    }

    private static get DIVIDER_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.DIVIDER_BITMAP;
    }

    private static get FRAME_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.FRAME_BITMAP;
    }

    private static get INPUT_CORRECTED_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_CORRECTED_BITMAP;
    }

    private static get INPUT_ERROR_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_ERROR_BITMAP;
    }

    private static get INPUT_FIELD_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_FIELD_BITMAP;
    }

    private static get INPUT_CORRECTED_HITCH_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_CORRECTED_HITCH_BITMAP;
    }

    private static get INPUT_ERROR_HITCH_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_ERROR_HITCH_BITMAP;
    }

    private static get INPUT_FIELD_HITCH_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_FIELD_HITCH_BITMAP;
    }

    private static get WHITE_BALLOON_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.WHITE_BALLOON_BITMAP;
    }

    private static get DARK_BALLOON_BITMAP(): Bitmap {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.DARK_BALLOON_BITMAP;
    }

    public static get BALLOON_HIGHLIGHTED(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.BALLOON_HIGHLIGHTED;
    }
    public static set BALLOON_HIGHLIGHTED(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.BALLOON_HIGHLIGHTED = value;
    }

    public static get BALLOON_SHADED(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.BALLOON_SHADED;
    }
    public static set BALLOON_SHADED(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.BALLOON_SHADED = value;
    }

    public static get BORDER_SUNK(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.BORDER_SUNK;
    }
    public static set BORDER_SUNK(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.BORDER_SUNK = value;
    }

    public static get DARK_POPUP(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.DARK_POPUP;
    }
    public static set DARK_POPUP(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.DARK_POPUP = value;
    }

    public static get DIVIDER(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.DIVIDER;
    }
    public static set DIVIDER(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.DIVIDER = value;
    }

    public static get FRAME(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.FRAME;
    }
    public static set FRAME(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.FRAME = value;
    }

    public static get INPUT_CORRECTED(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_CORRECTED;
    }
    public static set INPUT_CORRECTED(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.INPUT_CORRECTED = value;
    }

    public static get INPUT_ERROR(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_ERROR;
    }
    public static set INPUT_ERROR(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.INPUT_ERROR = value;
    }

    public static get INPUT_FIELD(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_FIELD;
    }
    public static set INPUT_FIELD(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.INPUT_FIELD = value;
    }

    public static get INPUT_CORRECTED_HITCH(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_CORRECTED_HITCH;
    }
    public static set INPUT_CORRECTED_HITCH(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.INPUT_CORRECTED_HITCH = value;
    }

    public static get INPUT_ERROR_HITCH(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_ERROR_HITCH;
    }
    public static set INPUT_ERROR_HITCH(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.INPUT_ERROR_HITCH = value;
    }

    public static get INPUT_FIELD_HITCH(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.INPUT_FIELD_HITCH;
    }
    public static set INPUT_FIELD_HITCH(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.INPUT_FIELD_HITCH = value;
    }

    public static get DARK_BALLOON(): NineSplitSprite {
        NineSplitSprite.#initStatics();
        return NineSplitSprite.DARK_BALLOON;
    }
    public static set DARK_BALLOON(value: NineSplitSprite) {
        NineSplitSprite.#initStatics();
        NineSplitSprite.DARK_BALLOON = value;
    }

    declare private _bitmapData: BitmapData;

    declare private _widths: number[];

    declare private _heights: number[];

    constructor(param1: BitmapData, param2: number[], param3: number[]) {
        this._bitmapData = param1;
        this._widths = param2;
        this._heights = param3;
    }

    public render(param1: number, param2: number): Bitmap {
        let _loc3_: Bitmap = new Bitmap(new BitmapData(param1, param2, true, 16777215));
        this.renderOn(_loc3_, new Rectangle(0, 0, param1, param2));
        return _loc3_;
    }

    public renderOn(param1: Bitmap, param2: Rectangle): void {
        let _loc10_: number = 0;
        let _loc11_: number = 0;
        let _loc7_: Rectangle = null;
        let _loc5_: Rectangle = null;
        let _loc17_: number = param2.x | 0;
        let _loc18_: number = param2.y | 0;
        let _loc16_: number = param2.width | 0;
        let _loc9_: number = param2.height | 0;
        let _loc6_: number[] = [0, this._widths[0], this._widths[0] + this._widths[1]];
        let _loc8_: number[] = [0, this._heights[0], this._heights[0] + this._heights[1]];
        let _loc3_: number[] = this._widths;
        let _loc14_: number[] = this._heights;
        let _loc13_: number[] = [_loc17_, _loc17_ + this._widths[0], _loc17_ + _loc16_ - this._widths[2]];
        let _loc15_: number[] = [_loc18_, _loc18_ + this._heights[0], _loc18_ + _loc9_ - this._heights[2]];
        let _loc12_: number[] = [this._widths[0], _loc16_ - this._widths[0] - this._widths[2], this._widths[2]];
        let _loc4_: number[] = [this._heights[0], _loc9_ - this._heights[0] - this._heights[2], this._heights[2]];
        _loc10_ = 0;
        while (_loc10_ < 3) {
            _loc11_ = 0;
            while (_loc11_ < 3) {
                if (!(_loc12_[_loc10_] < 1 || _loc4_[_loc11_] < 1 || _loc3_[_loc10_] < 1 || _loc14_[_loc11_] < 1)) {
                    _loc7_ = new Rectangle(_loc6_[_loc10_], _loc8_[_loc11_], _loc3_[_loc10_], _loc14_[_loc11_]);
                    if (_loc10_ != 1 && _loc11_ != 1) {
                        param1.bitmapData.copyPixels(this._bitmapData, _loc7_, new Point(_loc13_[_loc10_], _loc15_[_loc11_]));
                    } else {
                        _loc5_ = new Rectangle(_loc13_[_loc10_], _loc15_[_loc11_], _loc12_[_loc10_], _loc4_[_loc11_]);
                        param1.bitmapData.draw(this._bitmapData, MathUtils.rectangleTransformMatrix(_loc7_, _loc5_), null, null, _loc5_, false);
                    }
                }
                _loc11_++;
            }
            _loc10_++;
        }
    }

    public get bitmapData(): BitmapData {
        return this._bitmapData;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (NineSplitSprite.#staticsReady) return;
        NineSplitSprite.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(NineSplitSprite, name, { value, writable: true, configurable: true, enumerable: true });
        set("BORDER_SUNK_BITMAP", null);
        set("DARK_POPUP_BITMAP", null);
        set("DIVIDER_BITMAP", null);
        set("FRAME_BITMAP", null);
        set("INPUT_CORRECTED_BITMAP", null);
        set("INPUT_ERROR_BITMAP", null);
        set("INPUT_FIELD_BITMAP", null);
        set("INPUT_CORRECTED_HITCH_BITMAP", null);
        set("INPUT_ERROR_HITCH_BITMAP", null);
        set("INPUT_FIELD_HITCH_BITMAP", null);
        set("WHITE_BALLOON_BITMAP", null);
        set("DARK_BALLOON_BITMAP", null);
        set("BALLOON_HIGHLIGHTED", null);
        set("BALLOON_SHADED", null);
        set("BORDER_SUNK", null);
        set("DARK_POPUP", null);
        set("DIVIDER", null);
        set("FRAME", null);
        set("INPUT_CORRECTED", null);
        set("INPUT_ERROR", null);
        set("INPUT_FIELD", null);
        set("INPUT_CORRECTED_HITCH", null);
        set("INPUT_ERROR_HITCH", null);
        set("INPUT_FIELD_HITCH", null);
        set("DARK_BALLOON", null);
        set("BORDER_SUNK_BITMAP", new NineSplitSprite.border_sunk_png());
        set("DARK_POPUP_BITMAP", new NineSplitSprite.dark_popup_png());
        set("DIVIDER_BITMAP", new NineSplitSprite.divider_png());
        set("FRAME_BITMAP", new NineSplitSprite.frame_png());
        set("INPUT_CORRECTED_BITMAP", new NineSplitSprite.input_corrected_png());
        set("INPUT_ERROR_BITMAP", new NineSplitSprite.input_error_png());
        set("INPUT_FIELD_BITMAP", new NineSplitSprite.input_field_png());
        set("INPUT_CORRECTED_HITCH_BITMAP", new NineSplitSprite.input_corrected_hitch_png());
        set("INPUT_ERROR_HITCH_BITMAP", new NineSplitSprite.input_error_hitch_png());
        set("INPUT_FIELD_HITCH_BITMAP", new NineSplitSprite.input_field_hitch_png());
        set("WHITE_BALLOON_BITMAP", new NineSplitSprite.white_balloon_png());
        set("DARK_BALLOON_BITMAP", new NineSplitSprite.block_dark_base_png());
        set("BALLOON_HIGHLIGHTED", new NineSplitSprite(NineSplitSprite.WHITE_BALLOON_BITMAP.bitmapData, [5, 4, 5], [11, 1, 5]));
        set("BALLOON_SHADED", new NineSplitSprite(NineSplitSprite.WHITE_BALLOON_BITMAP.bitmapData, [5, 4, 5], [5, 1, 11]));
        set("BORDER_SUNK", new NineSplitSprite(NineSplitSprite.BORDER_SUNK_BITMAP.bitmapData, [12, 2, 6], [14, 2, 4]));
        set("DARK_POPUP", new NineSplitSprite(NineSplitSprite.DARK_POPUP_BITMAP.bitmapData, [5, 5, 5], [5, 12, 5]));
        set("DIVIDER", new NineSplitSprite(NineSplitSprite.DIVIDER_BITMAP.bitmapData, [2, 2, 2], [8, 0, 0]));
        set("FRAME", new NineSplitSprite(NineSplitSprite.FRAME_BITMAP.bitmapData, [4, 3, 4], [5, 1, 7]));
        set("INPUT_CORRECTED", new NineSplitSprite(NineSplitSprite.INPUT_CORRECTED_BITMAP.bitmapData, [5, 2, 5], [5, 2, 6]));
        set("INPUT_ERROR", new NineSplitSprite(NineSplitSprite.INPUT_ERROR_BITMAP.bitmapData, [5, 2, 5], [5, 2, 6]));
        set("INPUT_FIELD", new NineSplitSprite(NineSplitSprite.INPUT_FIELD_BITMAP.bitmapData, [5, 4, 5], [7, 2, 5]));
        set("INPUT_CORRECTED_HITCH", new NineSplitSprite(NineSplitSprite.INPUT_FIELD_HITCH_BITMAP.bitmapData, [10, 310, 10], [5, 21, 5]));
        set("INPUT_ERROR_HITCH", new NineSplitSprite(NineSplitSprite.INPUT_ERROR_HITCH_BITMAP.bitmapData, [10, 310, 10], [5, 21, 5]));
        set("INPUT_FIELD_HITCH", new NineSplitSprite(NineSplitSprite.INPUT_FIELD_HITCH_BITMAP.bitmapData, [10, 310, 10], [5, 21, 5]));
        set("DARK_BALLOON", new NineSplitSprite(NineSplitSprite.DARK_BALLOON_BITMAP.bitmapData, [5, 4, 5], [11, 1, 5]));
    }
}
