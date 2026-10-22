import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf, valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { _SafeCls_6078 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6078';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';

export class StackedHealthPointsHeartPrebake implements _SafeCls_6078 {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.healthpoints::StackedHealthPointsHeartPrebake'); }

    declare public heartHeight: number;
    static { (this.prototype as any).heartHeight = 0; }

    declare public heartWidth: number;
    static { (this.prototype as any).heartWidth = 0; }

    declare private _assets: any;

    private _SafeStr_14548: any = {};

    constructor(param1: any) {
        this._assets = param1;
        this.heartWidth = param1.background.width | 0;
        this.heartHeight = param1.background.height | 0;
    }

    public getOrCreateHeartPrebake(param1: number): BitmapData {
        let _loc3_: string = String(param1);
        let _loc2_: BitmapData = asInstanceOf(this._SafeStr_14548[_loc3_], BitmapData);
        if (_loc2_ != null) {
            return _loc2_;
        }
        _loc2_ = this.createHeartPrebake(param1);
        this._SafeStr_14548[_loc3_] = _loc2_;
        return _loc2_;
    }

    public dispose(): void {
        let _loc2_: string = null;
        let _loc1_: BitmapData = null;
        for (_loc2_ of keysOf(this._SafeStr_14548)) {
            _loc1_ = asInstanceOf(this._SafeStr_14548[_loc2_], BitmapData);
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
        }
        this._SafeStr_14548 = {};
        this._assets = null;
    }

    private createHeartPrebake(param1: number): BitmapData {
        let _loc4_: VariableFxBitmapComposer = null;
        let _loc2_: any = null;
        let _loc3_: BitmapData = new BitmapData(this.heartWidth, this.heartHeight, true, 0);
        _loc3_.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(_loc3_);
            _loc4_.clear(0);
            _loc4_.drawTintedLayer(this._assets.background, 0, 0, param1, "normal", 255);
            if (this._assets.metallic != null) {
                _loc4_.drawLayer(this._assets.metallic, 0, 0, "add", 255);
            }
            for (_loc2_ of valuesOf(this._assets.overlays)) {
                _loc4_.drawLayer(_loc2_.layer, 0, 0, stringOrNull(_loc2_.blendMode), 255);
            }
        } finally {
            _loc3_.unlock();
        }
        return _loc3_;
    }

    get [_SafeCls_6078](): true {
        return true;
    }
}
