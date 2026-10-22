import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { TextStyle } from '@/com/sulake/core/window/utils/TextStyle';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { TextLabelController } from '@/com/sulake/core/window/Classes.group';
import { SkinRenderer } from '@/com/sulake/core/window/graphics/renderer/SkinRenderer';
import { TextFieldCache } from '@/com/sulake/core/window/utils/TextFieldCache';

export class LabelRenderer extends SkinRenderer {
    static { registerClassName(this, 'com.sulake.core.window.graphics.renderer::LabelRenderer'); }

    private static readonly _SafeStr_4058: ColorTransform = new ColorTransform(0, 0, 0, 1, 255, 255, 255, 0);

    constructor(param1: string) {
        super(param1);
        this._SafeStr_2189 = new Matrix();
    }

    declare protected _SafeStr_2189: Matrix;

    declare protected _SafeStr_7102: TextStyle;

    declare protected _SafeStr_3123: TextField;

    public override draw(param1: IWindow, param2: BitmapData, param3: Rectangle, param4: number, param5: boolean): void {
        let _loc9_: TextLabelController = null;
        let _loc6_: any = 0;
        let _loc7_: any = null;
        let _loc10_: ColorTransform = null;
        if (param2 != null) {
            _loc9_ = castTo(param1, TextLabelController);
            let _loc8_: TextStyle = _loc9_.textStyle;
            if (_loc8_ != this._SafeStr_7102) {
                this._SafeStr_3123 = TextFieldCache.getTextFieldByStyle(_loc8_);
                this._SafeStr_7102 = _loc8_;
            }
            this._SafeStr_2189.tx = _loc9_.drawOffsetX;
            this._SafeStr_2189.ty = _loc9_.drawOffsetY;
            this._SafeStr_3123.text = _loc9_.text;
            _loc6_ = _loc8_.color >>> 0;
            this._SafeStr_3123.textColor = Number(_loc9_.hasTextColor ? _loc9_.textColor : _loc6_) >>> 0;
            this._SafeStr_3123.antiAliasType = "advanced";
            this._SafeStr_3123.gridFitType = "pixel";
            if (_loc9_.vertical) {
                this._SafeStr_2189.a = 0;
                this._SafeStr_2189.b = -1;
                this._SafeStr_2189.c = 1;
                this._SafeStr_2189.d = 0;
                this._SafeStr_2189.ty += _loc9_.height;
            }
            if ((_loc8_.etchingColor >>> 0 & 0xFF000000) != 0) {
                LabelRenderer._SafeStr_4058.redOffset = _loc8_.etchingColor >>> 0 >> 16 & 0xFF;
                LabelRenderer._SafeStr_4058.greenOffset = _loc8_.etchingColor >>> 0 >> 8 & 0xFF;
                LabelRenderer._SafeStr_4058.blueOffset = _loc8_.etchingColor >>> 0 & 0xFF;
                _loc7_ = SkinRenderer.ETCHING_POSITION.get(_loc8_.etchingPosition);
                if (_loc7_ != null) {
                    if (_loc9_.vertical) {
                        this._SafeStr_2189.tx += _loc7_.y;
                        this._SafeStr_2189.ty -= _loc7_.x;
                        param2.draw(this._SafeStr_3123, this._SafeStr_2189, LabelRenderer._SafeStr_4058, null, null, false);
                        this._SafeStr_2189.tx -= _loc7_.y;
                        this._SafeStr_2189.ty += _loc7_.x;
                    } else {
                        this._SafeStr_2189.tx += _loc7_.x;
                        this._SafeStr_2189.ty += _loc7_.y;
                        param2.draw(this._SafeStr_3123, this._SafeStr_2189, LabelRenderer._SafeStr_4058, null, null, false);
                        this._SafeStr_2189.tx -= _loc7_.x;
                        this._SafeStr_2189.ty -= _loc7_.y;
                    }
                }
            }
            if (param1.dynamicStyleColor) {
                _loc10_ = param1.dynamicStyleColor;
            }
            param2.draw(this._SafeStr_3123, this._SafeStr_2189, _loc10_, null, null, false);
            if (_loc9_.vertical) {
                this._SafeStr_2189.a = 1;
                this._SafeStr_2189.b = 0;
                this._SafeStr_2189.c = 0;
                this._SafeStr_2189.d = 1;
                this._SafeStr_2189.ty -= _loc9_.height;
            }
            this._SafeStr_3123.textColor = _loc6_ >>> 0;
        }
    }

    public override isStateDrawable(param1: number): boolean {
        return param1 == 0;
    }
}
