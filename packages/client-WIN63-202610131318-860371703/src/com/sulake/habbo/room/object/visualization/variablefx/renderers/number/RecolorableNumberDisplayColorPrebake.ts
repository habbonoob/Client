import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererPrebake';

export class RecolorableNumberDisplayColorPrebake implements VariableFxRendererPrebake {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.number::RecolorableNumberDisplayColorPrebake'); }

    declare public _SafeStr_14674: BitmapData;

    declare private _layers: any;

    private _SafeStr_14675: any = {};

    constructor(param1: any) {
        this._layers = param1;
        this._SafeStr_14674 = param1.numbers;
    }

    public getOrCreateNumbersPrebake(param1: number): BitmapData {
        let _loc3_: number = (param1 & 0xFFFFFF) >>> 0;
        let _loc4_: string = String(_loc3_);
        let _loc2_: BitmapData = asInstanceOf(this._SafeStr_14675[_loc4_], BitmapData);
        if (_loc2_ != null) {
            return _loc2_;
        }
        _loc2_ = this.createNumbersPrebake(_loc3_);
        this._SafeStr_14675[_loc4_] = _loc2_;
        return _loc2_;
    }

    public dispose(): void {
        let _loc2_: string = null;
        let _loc1_: BitmapData = null;
        for (_loc2_ of keysOf(this._SafeStr_14675)) {
            _loc1_ = asInstanceOf(this._SafeStr_14675[_loc2_], BitmapData);
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
        }
        this._SafeStr_14675 = {};
        this._layers = null;
        this._SafeStr_14674 = null;
    }

    private createNumbersPrebake(param1: number): BitmapData {
        let _loc3_: VariableFxBitmapComposer = null;
        let _loc4_: BitmapData = this._layers.numbers;
        let _loc2_: BitmapData = new BitmapData(_loc4_.width, _loc4_.height, true, 0);
        _loc2_.lock();
        try {
            _loc3_ = new VariableFxBitmapComposer(_loc2_);
            _loc3_.clear(0);
            _loc3_.drawSourceRegion(_loc4_, 0, 0, _loc4_.width, _loc4_.height, 0, 0, "normal", 255, null, this.createBaseColorTransformFromRgb(param1));
            this.drawOptionalPrebakeLayer(_loc3_, this._layers.numberLines instanceof BitmapData ? this._layers.numberLines : null, "normal");
            this.drawOptionalPrebakeLayer(_loc3_, this._layers.darkening instanceof BitmapData ? this._layers.darkening : null, "multiply");
            this.drawOptionalPrebakeLayer(_loc3_, this._layers.lighting instanceof BitmapData ? this._layers.lighting : null, "add");
        } finally {
            _loc2_.unlock();
        }
        return _loc2_;
    }

    private drawOptionalPrebakeLayer(param1: VariableFxBitmapComposer, param2: BitmapData, param3: string): void {
        if (param2 != null) {
            param1.drawLayer(param2, 0, 0, param3, 255);
        }
    }

    private createBaseColorTransformFromRgb(param1: number): ColorTransform {
        return new ColorTransform((param1 >>> 16 & 0xFF) / 255, (param1 >>> 8 & 0xFF) / 255, (param1 & 0xFF) / 255, 1);
    }

    get [VariableFxRendererPrebake](): true {
        return true;
    }
}
