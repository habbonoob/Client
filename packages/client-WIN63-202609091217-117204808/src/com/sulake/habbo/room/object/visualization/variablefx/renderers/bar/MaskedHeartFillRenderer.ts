import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { _SafeCls_6075 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6075';
import { _SafeCls_6080 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6080';
import { BarVariableFxRendererBase } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/BarVariableFxRendererBase';
import { MaskedHeartFillFramePrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/MaskedHeartFillFramePrebake';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';

export class MaskedHeartFillRenderer extends BarVariableFxRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::MaskedHeartFillRenderer'); }

    private static readonly MASKED_HEART_FILL_ASSETS: any = { "background": "variablefx_masked_heart_fill_background", "bar": "variablefx_masked_heart_fill_bar", "darkening": "variablefx_masked_heart_fill_darkening", "darkeningMetallic": "variablefx_masked_heart_fill_darkening_metallic", "endPointer": "variablefx_masked_heart_fill_end_pointer", "lighting": "variablefx_masked_heart_fill_lighting", "lightingMetallic": "variablefx_masked_heart_fill_lighting_metallic", "mask": "variablefx_masked_heart_fill_mask", "metallic": "variablefx_masked_heart_fill_metallic" };

    declare private _SafeStr_14538: MaskedHeartFillFramePrebake;

    constructor(param1: VariableFxRendererContext) {
        let context: VariableFxRendererContext = param1;
        super(context);
        this._SafeStr_14538 = asInstanceOf(_SafeCls_6075.getOrCreate(context.config, (): any => {
             return this.createPrebake();
         }), MaskedHeartFillFramePrebake);
    }

    protected override get frameWidth(): number {
        return this._SafeStr_14538.frameWidth;
    }

    protected override get frameHeight(): number {
        return this._SafeStr_14538.frameHeight;
    }

    protected override get progressPixelWidth(): number {
        return this._SafeStr_14538.progressPixelWidth;
    }

    protected override createFrameBitmap(param1: number, param2: number): BitmapData {
        return new BitmapData(param1, param2, true, 0);
    }

    protected override renderFrame(param1: number): void {
        let _loc4_: VariableFxBitmapComposer = null;
        let _loc2_: number = 0;
        let _loc5_: BitmapData = null;
        let _loc3_: BitmapData = this.mutableFrame.bitmapData;
        if (_loc3_ == null) {
            return;
        }
        _loc3_.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(_loc3_);
            _loc2_ = this.calculateFilledPixelWidth();
            _loc5_ = this._SafeStr_14538.getOrCreateFrame(this.displayedFillArgb, _loc2_);
            _loc4_.drawLayer(_loc5_, 0, 0, "normal", 255);
        } finally {
            _loc3_.unlock();
        }
    }

    private createPrebake(): MaskedHeartFillFramePrebake {
        let _loc2_: any = _SafeCls_6080.resolvePaintColor(this.context.config.color, this.context.config.extra);
        let _loc1_: any = this.resolveAssets(Boolean(_loc2_.isMetallic));
        return new MaskedHeartFillFramePrebake(_loc1_);
    }

    private resolveAssets(param1: boolean): any {
        let _loc3_: BitmapData = param1 ? this.getLayer(stringOrNull(MaskedHeartFillRenderer.MASKED_HEART_FILL_ASSETS.darkeningMetallic)) : this.getLayer(stringOrNull(MaskedHeartFillRenderer.MASKED_HEART_FILL_ASSETS.darkening));
        let _loc2_: BitmapData = param1 ? this.getLayer(stringOrNull(MaskedHeartFillRenderer.MASKED_HEART_FILL_ASSETS.lightingMetallic)) : this.getLayer(stringOrNull(MaskedHeartFillRenderer.MASKED_HEART_FILL_ASSETS.lighting));
        return { "background": this.getLayer(stringOrNull(MaskedHeartFillRenderer.MASKED_HEART_FILL_ASSETS.background)), "bar": this.getLayer(stringOrNull(MaskedHeartFillRenderer.MASKED_HEART_FILL_ASSETS.bar)), "endPointer": this.getLayer(stringOrNull(MaskedHeartFillRenderer.MASKED_HEART_FILL_ASSETS.endPointer)), "mask": this.getLayer(stringOrNull(MaskedHeartFillRenderer.MASKED_HEART_FILL_ASSETS.mask)), "metallic": (param1 ? this.getLayer(stringOrNull(MaskedHeartFillRenderer.MASKED_HEART_FILL_ASSETS.metallic)) : null), "overlays": [{ "blendMode": "multiply", "layer": _loc3_ }, { "blendMode": "add", "layer": _loc2_ }] };
    }

    private getLayer(param1: string): BitmapData {
        let _loc2_: BitmapData = this.context.assetProvider == null ? null : this.context.assetProvider.getBitmapData(param1);
        if (_loc2_ == null) {
            throw new Error("Missing Variable FX masked heart fill layer \'" + param1 + "\'.");
        }
        return _loc2_;
    }
}
