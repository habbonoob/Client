import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedFont } from '@habbo-pixi/runtime/embed/embed';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Shape } from '@habbo-pixi/runtime/display/Shape';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { DropShadowFilter } from '@habbo-pixi/runtime/filters/DropShadowFilter';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { LocalizedTextField } from '@/onBoardingHcUi/LocalizedTextField';
import { NineSplitSprite } from '@/onBoardingHcUi/NineSplitSprite';

const border_text_hitch_png_pngAsset = embedBitmap("onboarding/border_text_hitch_png.png");
const LoaderUI_ubuntu_regular_ttfAsset = embedFont("onboarding/LoaderUI_ubuntu_regular.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu Condensed", fontWeight: "normal", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_bold_ttfAsset = embedFont("shared/ubuntu_bold.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "bold", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_italic_ttfAsset = embedFont("shared/ubuntu_italic.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "normal", fontStyle: "italic", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_bold_italic_ttfAsset = embedFont("shared/ubuntu_bold_italic.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "bold", fontStyle: "italic", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const block_dark_point_down_png_pngAsset = embedBitmap("onboarding/block_dark_point_down_png.png");
const block_dark_point_up_png_pngAsset = embedBitmap("onboarding/block_dark_point_up_png.png");
const block_dark_point_left_png_pngAsset = embedBitmap("onboarding/block_dark_point_left_png.png");
const block_dark_point_right_png_pngAsset = embedBitmap("onboarding/block_dark_point_right_png.png");

export class LoaderUI {
    static { registerClassName(this, 'onBoardingHcUi::LoaderUI'); }

    public static readonly STYLE_ILLUMINA: number = 1;
    public static readonly STYLE_HITCH: number = 2;
    public static readonly ANCHOR_LEFT: string = "l";
    public static readonly ANCHOR_CENTRE: string = "c";
    public static readonly ANCHOR_RIGHT: string = "r";
    public static readonly ANCHOR_TOP: string = "t";
    public static readonly ANCHOR_MIDDLE: string = "m";
    public static readonly ANCHOR_BOTTOM: string = "b";
    public static readonly HITCH_TEXT_BODY_COLOUR: number = 8309486;
    public static readonly HITCH_TEXT_HIGHLIGHT_COLOUR: number = 16777215;

    private static readonly border_text_hitch_png = border_text_hitch_png_pngAsset;

    public static ubuntu_regular = LoaderUI_ubuntu_regular_ttfAsset;

    public static ubuntu_bold = ubuntu_bold_ttfAsset;

    public static ubuntu_italic = ubuntu_italic_ttfAsset;

    public static ubuntu_bold_italic = ubuntu_bold_italic_ttfAsset;

    private static readonly block_dark_point_down_png = block_dark_point_down_png_pngAsset;

    private static readonly block_dark_point_up_png = block_dark_point_up_png_pngAsset;

    private static readonly block_dark_point_left_png = block_dark_point_left_png_pngAsset;

    private static readonly block_dark_point_right_png = block_dark_point_right_png_pngAsset;

    private static readonly ETCHING_FILTER: DropShadowFilter = new DropShadowFilter(1, 90, 13751296, 1, 1, 1);
    private static readonly NEGATIVE_ETCHING_FILTER: DropShadowFilter = new DropShadowFilter(1, 270, 0, 0.7, 1, 1);

    constructor() {
    }

    public static createTextField(param1: string, param2: number, param3: number, param4: boolean = false, param5: boolean = false, param6: boolean = false, param7: boolean = false, param8: string = "left", param9: boolean = false, param10: boolean = false): TextField {
        let _loc11_: TextFormat = new TextFormat("Ubuntu", param2, param3, param4, param7, param10);
        _loc11_.align = param8;
        _loc11_.kerning = param9;
        let _loc12_: LocalizedTextField = new LocalizedTextField();
        _loc12_.embedFonts = true;
        _loc12_.antiAliasType = "advanced";
        _loc12_.defaultTextFormat = _loc11_;
        _loc12_.multiline = param5;
        _loc12_.wordWrap = param5;
        _loc12_.type = param6 ? "input" : "dynamic";
        _loc12_.selectable = param6;
        _loc12_.htmlText = param1;
        _loc12_.autoSize = "left";
        _loc12_.width = _loc12_.textWidth;
        _loc12_.height = _loc12_.textHeight;
        return _loc12_;
    }

    public static addEtching(param1: DisplayObject, param2: boolean = false): void {
        param1.filters = [param2 ? LoaderUI.NEGATIVE_ETCHING_FILTER.clone() : LoaderUI.ETCHING_FILTER.clone()];
    }

    public static lineUpHorizontally(param1: DisplayObject, ...rest: any[]): void {
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc6_: DisplayObject = null;
        let _loc4_: number = rest.length / 2 | 0;
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc3_ = rest[_loc5_ * 2] | 0;
            _loc6_ = rest[_loc5_ * 2 + 1];
            _loc6_.x = param1.x + param1.width + _loc3_;
            param1 = _loc6_;
            _loc5_++;
        }
    }

    public static lineUpHorizontallyRevers(param1: DisplayObject, ...rest: any[]): void {
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc6_: DisplayObject = null;
        let _loc4_: number = rest.length / 2 | 0;
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc3_ = rest[_loc5_ * 2] | 0;
            _loc6_ = rest[_loc5_ * 2 + 1];
            _loc6_.x = param1.x - _loc3_ - _loc6_.width;
            param1 = _loc6_;
            _loc5_++;
        }
    }

    public static lineUpVerticallyRevers(param1: DisplayObject, ...rest: any[]): void {
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc6_: DisplayObject = null;
        let _loc4_: number = rest.length / 2 | 0;
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc3_ = rest[_loc5_ * 2] | 0;
            _loc6_ = rest[_loc5_ * 2 + 1];
            _loc6_.y = param1.y - _loc3_ - _loc6_.height;
            param1 = _loc6_;
            _loc5_++;
        }
    }

    public static lineUpVertically(param1: DisplayObject, ...rest: any[]): void {
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc6_: DisplayObject = null;
        let _loc4_: number = rest.length / 2 | 0;
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc3_ = rest[_loc5_ * 2] | 0;
            _loc6_ = rest[_loc5_ * 2 + 1];
            _loc6_.y = param1.y + param1.height + _loc3_;
            param1 = _loc6_;
            _loc5_++;
        }
    }

    public static lineUpElementsVertically(param1: DisplayObject[], param2: number): void {
        let _loc3_: number = 0;
        let _loc5_: DisplayObject = null;
        if (param1 == null || param1.length < 2) {
            return;
        }
        let _loc4_: DisplayObject = param1[0];
        _loc3_ = 0;
        while (_loc3_ < param1.length - 1) {
            _loc5_ = param1[_loc3_ + 1];
            _loc5_.y = _loc4_.y + _loc4_.height + param2;
            _loc4_ = _loc5_;
            _loc3_++;
        }
    }

    public static alignAnchors(param1: DisplayObject, param2: number, param3: string, ...rest: any[]): void {
        for (const _loc5_ of rest ?? []) {
            if (param3.indexOf("l") >= 0) {
                _loc5_.x = param1.x + param2;
            }
            if (param3.indexOf("c") >= 0) {
                _loc5_.x = param1.x + ((param1.width - _loc5_.width) / 2 | 0);
            }
            if (param3.indexOf("r") >= 0) {
                _loc5_.x = param1.x + param1.width - _loc5_.width - param2;
            }
            if (param3.indexOf("t") >= 0) {
                _loc5_.y = param1.y + param2;
            }
            if (param3.indexOf("m") >= 0) {
                _loc5_.y = param1.y + ((param1.height - _loc5_.height) / 2 | 0);
            }
            if (param3.indexOf("b") >= 0) {
                _loc5_.y = param1.y + param1.height - _loc5_.height - param2;
            }
        }
    }

    public static createBalloon(param1: number, param2: number, param3: number, param4: boolean, param5: number = 16777215, param6: string = "up"): Bitmap {
        let _loc9_: Bitmap = null;
        let _loc10_: number = 0;
        let _loc11_: number = 0;
        let _loc8_: Bitmap = null;
        if (param3 < 0) {
            param3 = (param1 - 9) / 2 | 0;
        }
        let _loc7_: NineSplitSprite = NineSplitSprite.DARK_BALLOON;
        switch (param6) {
            case "up":
                _loc9_ = new LoaderUI.block_dark_point_up_png();
                _loc10_ = _loc9_.height | 0;
                _loc8_ = new Bitmap(new BitmapData(param1, param2 + _loc9_.height | 0, true, 860986));
                _loc7_.renderOn(_loc8_, new Rectangle(0, _loc10_, param1, param2));
                _loc8_.bitmapData.copyPixels(_loc9_.bitmapData, _loc9_.bitmapData.rect, new Point(param3, 0));
                break;
            case "down":
                _loc9_ = new LoaderUI.block_dark_point_down_png();
                _loc10_ = _loc9_.height | 0;
                _loc8_ = new Bitmap(new BitmapData(param1, param2 + _loc9_.height | 0, true, 860986));
                _loc7_.renderOn(_loc8_, new Rectangle(0, _loc10_, param1, param2));
                _loc8_.bitmapData.copyPixels(_loc9_.bitmapData, _loc9_.bitmapData.rect, new Point(param3, param2 + _loc10_));
                break;
            case "left":
                _loc9_ = new LoaderUI.block_dark_point_left_png();
                _loc11_ = _loc9_.width | 0;
                _loc8_ = new Bitmap(new BitmapData(param1 + _loc11_, param2, true, 16777215));
                _loc7_.renderOn(_loc8_, new Rectangle(_loc11_, 0, param1, param2));
                _loc8_.bitmapData.copyPixels(_loc9_.bitmapData, _loc9_.bitmapData.rect, new Point(0, param3 - _loc11_));
                break;
            case "right":
                _loc9_ = new LoaderUI.block_dark_point_right_png();
                _loc11_ = _loc9_.width | 0;
                _loc8_ = new Bitmap(new BitmapData(param1 + _loc11_, param2, true, 860986));
                _loc7_.renderOn(_loc8_, new Rectangle(0, 0, param1, param2));
                _loc8_.bitmapData.copyPixels(_loc9_.bitmapData, _loc9_.bitmapData.rect, new Point(param1, param3 - _loc11_));
                break;
            case "none":
                _loc8_ = new Bitmap(new BitmapData(param1, param2, true, 860986));
                _loc7_.renderOn(_loc8_, new Rectangle(0, 0, param1, param2));
        }
        _loc8_.bitmapData.colorTransform(_loc8_.bitmapData.rect, new ColorTransform((param5 >> 16 & 0xFF) / 255, (param5 >> 8 & 0xFF) / 255, (param5 & 0xFF) / 255));
        return _loc8_;
    }

    public static createFrame(param1: string, param2: string, param3: Rectangle, param4: number = 1): Sprite {
        let _loc8_: TextField = null;
        let _loc9_: Sprite = new Sprite();
        _loc9_.x = param3.x;
        _loc9_.y = param3.y;
        if (param4 == 1) {
            _loc9_.addChild(NineSplitSprite.FRAME.render(param3.width | 0, param3.height | 0));
        }
        let _loc5_: number = (param4 == 2 ? 8309486 : 16777215) >>> 0;
        let _loc6_: number = param4 == 2 ? 24 : 40;
        let _loc7_: TextField = LoaderUI.createTextField(param1, _loc6_, _loc5_, false, false, false, false);
        _loc7_.y = -(_loc6_ + 8);
        _loc7_.autoSize = "left";
        _loc9_.addChild(_loc7_);
        if (param4 == 2) {
            _loc7_.width = param3.width;
            _loc7_.thickness = 50;
        }
        if (param2 != null && param2 != "") {
            _loc8_ = LoaderUI.createTextField(param2, 10, 11184810, true);
            _loc8_.x = 8;
            _loc8_.y = -(_loc6_ + 16);
            _loc8_.autoSize = "left";
            _loc9_.addChild(_loc8_);
        }
        return _loc9_;
    }

    public static resizeFrame(param1: Sprite, param2: number, param3: number): void {
        param1.removeChildAt(0);
        param1.addChildAt(NineSplitSprite.FRAME.render(param2, param3), 0);
    }

    public static createScale9GridShapeFromImage(param1: BitmapData, param2: Rectangle): Shape {
        let _loc8_: number = 0;
        let _loc6_: number = NaN;
        let _loc9_: number = 0;
        let _loc3_: any[] = [param2.left - 0.001, param2.right + 0.001, param1.width];
        let _loc4_: any[] = [param2.top - 0.001, param2.bottom + 0.001, param1.height];
        let _loc5_: Shape = new Shape();
        let _loc7_: number = 0;
        _loc8_ = 0;
        while (_loc8_ < 3) {
            _loc6_ = 0;
            _loc9_ = 0;
            while (_loc9_ < 3) {
                _loc5_.graphics.beginBitmapFill(param1);
                _loc5_.graphics.drawRect(_loc7_, _loc6_, _loc3_[_loc8_] - _loc7_, _loc4_[_loc9_] - _loc6_);
                _loc5_.graphics.endFill();
                _loc6_ = Number(_loc4_[_loc9_]);
                _loc9_++;
            }
            _loc7_ = Number(_loc3_[_loc8_]);
            _loc8_++;
        }
        _loc5_.scale9Grid = param2;
        return _loc5_;
    }

    public static createTextBorder(): Shape {
        return LoaderUI.createScale9GridShapeFromImage(castTo(new LoaderUI.border_text_hitch_png(), Bitmap).bitmapData, new Rectangle(10, 10, 10, 10));
    }
}
