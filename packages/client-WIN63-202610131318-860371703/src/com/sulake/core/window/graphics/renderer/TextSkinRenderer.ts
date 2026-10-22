import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ITextFieldContainer } from '@/com/sulake/core/window/utils/ITextFieldContainer';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';
import { isITextFieldContainer } from '@/com/sulake/core/window/utils/ITextFieldContainer';
import { TextStyleManager } from '@/com/sulake/core/window/utils/TextStyleManager';

export class TextSkinRenderer extends SkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::TextSkinRenderer'); }

    private static readonly _SafeStr_4058: ColorTransform = new ColorTransform(0, 0, 0, 1, 255, 255, 255, 0);

    declare protected _SafeStr_2189: Matrix;

    constructor(param1: string) {
        super(param1);
        this._SafeStr_2189 = new Matrix();
    }

    public override parse(param1: IAsset, param2: XMLList, param3: IAssetLibrary): void {
        let _loc4_: string = stringOrNull(param1.content.toString());
        TextStyleManager.setStyles(TextStyleManager.parseCSS(_loc4_));
    }

    public override draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void {
        let _loc7_: ITextFieldContainer = null;
        let _loc9_: any = null;
        let _loc11_: ColorTransform = null;
        if (param2 != null) {
            _loc7_ = castGuarded(param1, isITextFieldContainer, "com.sulake.core.window.utils.ITextFieldContainer");
            let _loc10_: ITextWindow = castGuarded(param1, isITextWindow, "com.sulake.core.window.components.ITextWindow");
            let _loc6_: string = _loc10_.autoSize;
            let _loc8_: TextField = _loc7_.textField;
            this._SafeStr_2189.tx = _loc7_.margins.left;
            this._SafeStr_2189.ty = _loc7_.margins.top;
            if (_loc6_ == "right") {
                this._SafeStr_2189.tx = Math.floor(param1.width - _loc8_.width - _loc7_.margins.right);
            } else if (_loc6_ == "center") {
                this._SafeStr_2189.tx = Math.floor(param1.width / 2 - _loc8_.width / 2);
            }
            if ((_loc10_.etchingColor & 0xFF000000) != 0) {
                TextSkinRenderer._SafeStr_4058.redOffset = _loc10_.etchingColor >> 16 & 0xFF;
                TextSkinRenderer._SafeStr_4058.greenOffset = _loc10_.etchingColor >> 8 & 0xFF;
                TextSkinRenderer._SafeStr_4058.blueOffset = _loc10_.etchingColor & 0xFF;
                TextSkinRenderer._SafeStr_4058.alphaMultiplier = (_loc10_.etchingColor >> 24 & 0xFF) / 255;
                _loc9_ = SkinRenderer.ETCHING_POSITION.get(_loc10_.etchingPosition);
                if (_loc9_ != null) {
                    this._SafeStr_2189.tx += _loc9_.x;
                    this._SafeStr_2189.ty += _loc9_.y;
                    param2.draw(_loc8_, this._SafeStr_2189, TextSkinRenderer._SafeStr_4058, null, null, false);
                    this._SafeStr_2189.tx -= _loc9_.x;
                    this._SafeStr_2189.ty -= _loc9_.y;
                }
            }
            if (param1.dynamicStyleColor) {
                _loc11_ = param1.dynamicStyleColor;
            }
            param2.draw(_loc8_, this._SafeStr_2189, _loc11_, null, null, false);
        }
    }

    public override isStateDrawable(param1: number): boolean {
        return param1 == 0;
    }
}
