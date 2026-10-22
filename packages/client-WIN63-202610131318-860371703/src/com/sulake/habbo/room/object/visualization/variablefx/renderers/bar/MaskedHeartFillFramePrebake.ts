import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf, valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxClipRect';
import { VariableFxRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererPrebake';

export class MaskedHeartFillFramePrebake implements VariableFxRendererPrebake {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::MaskedHeartFillFramePrebake'); }

    private static readonly FILL_X: number = 2;
    private static readonly FILL_RIGHT_PADDING: number = 2;
    private static readonly _SafeStr_14720: number = 1;
    private static readonly POINTER_VERTICAL_PADDING: number = 2;

    declare public frameWidth: number;
    static { (this.prototype as any).frameWidth = 0; }

    declare public frameHeight: number;
    static { (this.prototype as any).frameHeight = 0; }

    declare public progressPixelWidth: number;
    static { (this.prototype as any).progressPixelWidth = 0; }

    declare private _assets: any;

    private _SafeStr_14721: any = {};

    constructor(param1: any) {
        this._assets = param1;
        this.frameWidth = param1.background.width | 0;
        this.frameHeight = param1.background.height | 0;
        this.progressPixelWidth = Math.max(0, this.frameWidth - 2 - 2) | 0;
    }

    public getOrCreateFrame(param1: number, param2: number): BitmapData {
        let _loc6_: BitmapData = null;
        let _loc3_: number = Math.max(0, Math.min(this.progressPixelWidth, param2)) | 0;
        let _loc4_: string = String(param1);
        let _loc5_: any = this._SafeStr_14721[_loc4_];
        if (_loc5_ == null) {
            _loc5_ = {};
            this._SafeStr_14721[_loc4_] = _loc5_;
        }
        _loc6_ = asInstanceOf(_loc5_[String(_loc3_)], BitmapData);
        if (_loc6_ != null) {
            return _loc6_;
        }
        _loc6_ = this.createFrame(param1, _loc3_);
        _loc5_[String(_loc3_)] = _loc6_;
        return _loc6_;
    }

    public dispose(): void {
        let _loc2_: any = null;
        let _loc3_: string = null;
        let _loc1_: string = null;
        let _loc4_: BitmapData = null;
        for (_loc3_ of keysOf(this._SafeStr_14721)) {
            _loc2_ = this._SafeStr_14721[_loc3_];
            for (_loc1_ of keysOf(_loc2_)) {
                _loc4_ = asInstanceOf(_loc2_[_loc1_], BitmapData);
                if (_loc4_ != null) {
                    _loc4_.dispose();
                }
            }
        }
        this._SafeStr_14721 = {};
        this._assets = null;
    }

    private createFrame(param1: number, param2: number): BitmapData {
        let _loc5_: VariableFxBitmapComposer = null;
        let _loc4_: any = null;
        let _loc6_: BitmapData = new BitmapData(this.frameWidth, this.frameHeight, true, 0);
        let _loc3_: VariableFxClipRect = this.createProgressClip(param2);
        _loc6_.lock();
        try {
            _loc5_ = new VariableFxBitmapComposer(_loc6_);
            _loc5_.drawLayer(this._assets.background, 0, 0, "normal", 255);
            if (param2 > 0 && _loc3_ != null) {
                _loc5_.drawTintedLayer(this._assets.bar, 0, 0, param1, "normal", 255, _loc3_);
                this.drawEndPointer(_loc5_, this._assets.endPointer, this._assets.mask, param2);
                if (this._assets.metallic != null) {
                    _loc5_.drawLayer(this._assets.metallic, 0, 0, "add", 255, _loc3_);
                }
                for (_loc4_ of valuesOf(this._assets.overlays)) {
                    _loc5_.drawLayer(_loc4_.layer, 0, 0, stringOrNull(_loc4_.blendMode), 255, _loc3_);
                }
            }
        } finally {
            _loc6_.unlock();
        }
        return _loc6_;
    }

    private drawEndPointer(param1: VariableFxBitmapComposer, param2: BitmapData, param3: BitmapData, param4: number): void {
        let _loc8_: number = 2 + param4 - 1;
        let _loc6_: number = _loc8_ - 1;
        let _loc7_: number = param3.width >= this.frameWidth ? 0 : _loc8_ - (param3.width / 2 | 0);
        let _loc5_: number = param3.height >= this.frameHeight ? 0 : (this.frameHeight - param3.height) / 2 | 0;
        param1.drawMaskedLayer(param2, param3, _loc6_, 0, _loc7_, _loc5_, "multiply", 255, new VariableFxClipRect(_loc8_, 2, 1, Math.max(0, this.frameHeight - 2 * 2) | 0));
    }

    private createProgressClip(param1: number): VariableFxClipRect {
        if (param1 <= 0) {
            return null;
        }
        return new VariableFxClipRect(2, 0, param1, this.frameHeight);
    }

    get [VariableFxRendererPrebake](): true {
        return true;
    }
}
