import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { _SafeCls_6075 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6075';
import { BarVariableFxRendererBase } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/BarVariableFxRendererBase';
import { VariableFxBarSliceUtils } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/VariableFxBarSliceUtils';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxClipRect';
import { VariableFxGenericRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxGenericRendererPrebake';
import { VariableFxSegmentedProgress } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxSegmentedProgress';

export class ThermometerHealthPointsRenderer extends BarVariableFxRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::ThermometerHealthPointsRenderer'); }

    private static readonly FRAME_EDGE_WIDTH: number = 3;
    private static readonly DARKENING_SLICE_WIDTH: number = 4;
    private static readonly FILL_X: number = 2;
    private static readonly FILL_Y: number = 2;
    private static readonly LIGHTING_INSET_X: number = 3;
    private static readonly LIGHTING_Y: number = 3;
    private static readonly LIGHTING_SOURCE_X: number = 3;
    private static readonly LIGHTING_SOURCE_Y: number = 1;
    private static readonly LIGHTING_SOURCE_WIDTH: number = 1;
    private static readonly LIGHTING_SOURCE_HEIGHT: number = 1;
    private static readonly _SafeStr_14543: number = 5;
    private static readonly SPLITTER_WIDTH: number = 2;
    private static readonly _SafeStr_14544: number = 0;
    private static readonly _SafeStr_14545: number = 2;

    private static readonly THERMOMETER_HEALTH_POINTS_ASSETS: any = { "background": "variablefx_thermometer_health_points_background", "darkening": "variablefx_thermometer_health_points_darkening", "fill": "variablefx_thermometer_health_points_fill", "lighting": "variablefx_thermometer_health_points_lighting", "splitters": "variablefx_thermometer_health_points_splitters", "top": "variablefx_thermometer_health_points_top" };

    declare private _SafeStr_14520: BitmapData;

    declare private _SafeStr_14522: BitmapData;

    declare private _SafeStr_14546: BitmapData;

    declare private _layout: any;

    declare private _SafeStr_14547: BitmapData;

    constructor(param1: VariableFxRendererContext) {
        let prebake: VariableFxGenericRendererPrebake;
        let data: any;
        let context: VariableFxRendererContext = param1;
        super(context);
        prebake = asInstanceOf(_SafeCls_6075.getOrCreate(context.config, (): any => {
             return this.createPrebake(context);
         }), VariableFxGenericRendererPrebake);
        data = prebake.data;
        this._SafeStr_14520 = data.backgroundPrebake;
        this._SafeStr_14522 = data.barPrebake;
        this._SafeStr_14546 = data.darkeningPrebake;
        this._layout = data.layout;
        this._SafeStr_14547 = data.splittersPrebake;
    }

    public static resolveThermometerHealthPointsFrameWidth(param1: string, param2: UtilsMap = null): number {
        let _loc3_: number = ThermometerHealthPointsRenderer.resolveThermometerHealthPointsSegmentCount(param1, param2);
        return _loc3_ * 5 + 2 * 2 + 1;
    }

    public static resolveThermometerHealthPointsSegmentCount(param1: string, param2: UtilsMap = null): number {
        return VariableFxSegmentedProgress.resolveSegmentCount(param1, param2, ThermometerHealthPointsRenderer.resolveDefaultThermometerHealthPointsSegmentCount);
    }

    private static resolveDefaultThermometerHealthPointsSegmentCount(param1: string): number {
        switch (param1) {
            case "extra_small":
                return 4;
            case "small":
                return 6;
            case "medium":
                return 9;
            case "large":
                return 12;
            case "extra_large":
                return 15;
            default:
                return 9;
        }
    }

    protected override get frameWidth(): number {
        return this._layout.width | 0;
    }

    protected override get frameHeight(): number {
        return this._layout.height | 0;
    }

    protected override get progressPixelWidth(): number {
        return this._layout.fillWidth | 0;
    }

    protected override createFrameBitmap(param1: number, param2: number): BitmapData {
        return this.createTransparentBitmap(param1, param2);
    }

    protected override renderFrame(param1: number): void {
        let _loc4_: VariableFxBitmapComposer = null;
        let _loc2_: number = 0;
        let _loc3_: BitmapData = this.mutableFrame.bitmapData;
        if (_loc3_ == null) {
            return;
        }
        _loc3_.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(_loc3_);
            _loc2_ = this.calculateFilledPixelWidth();
            _loc4_.drawLayer(this._SafeStr_14520, 0, 0, "normal", 255);
            if (_loc2_ > 0) {
                _loc4_.drawLayer(this._SafeStr_14522, 0, 0, "normal", 255, this.createFillClip(_loc2_));
            }
            _loc4_.drawLayer(this._SafeStr_14546, 0, 0, "multiply", 255);
            _loc4_.drawLayer(this._SafeStr_14547, 0, 0, "normal", 255);
        } finally {
            _loc3_.unlock();
        }
    }

    private createPrebake(param1: VariableFxRendererContext): VariableFxGenericRendererPrebake {
        let context: VariableFxRendererContext = param1;
        let assets: any = this.resolveAssets();
        let layout: any = this.resolveLayout(context.config.width, context.config.extra, assets.background);
        let backgroundPrebake: BitmapData = this.createTransparentBitmap(layout.width | 0, layout.height | 0);
        let barPrebake: BitmapData = this.createTransparentBitmap(layout.width | 0, layout.height | 0);
        let darkeningPrebake: BitmapData = this.createTransparentBitmap(layout.width | 0, layout.height | 0);
        let splittersPrebake: BitmapData = this.createTransparentBitmap(layout.width | 0, layout.height | 0);
        this.prebakeBackground(backgroundPrebake, assets, layout);
        this.prebakeBar(barPrebake, assets, layout);
        this.prebakeDarkening(darkeningPrebake, assets, layout);
        this.prebakeSplitters(splittersPrebake, assets, layout);
        return new VariableFxGenericRendererPrebake({ "backgroundPrebake": backgroundPrebake, "barPrebake": barPrebake, "darkeningPrebake": darkeningPrebake, "layout": layout, "splittersPrebake": splittersPrebake }, (): void => {
             backgroundPrebake.dispose();
             barPrebake.dispose();
             darkeningPrebake.dispose();
             splittersPrebake.dispose();
         });
    }

    private prebakeBackground(param1: BitmapData, param2: any, param3: any): void {
        let _loc4_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(param1);
            _loc4_.clear(0);
            _loc4_.drawThreeSlice(param2.background, VariableFxBarSliceUtils.resolveBackgroundSliceLeftWidth(param3), VariableFxBarSliceUtils.resolveBackgroundSliceRightWidth(param3), Number(param3.width), 0, 0, "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private prebakeBar(param1: BitmapData, param2: any, param3: any): void {
        let _loc4_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(param1);
            _loc4_.clear(0);
            this.drawFill(_loc4_, param2.fill, param3.fillWidth | 0, param3);
            this.drawLighting(_loc4_, param2.lighting, param3.fillWidth | 0, param3);
        } finally {
            param1.unlock();
        }
    }

    private prebakeDarkening(param1: BitmapData, param2: any, param3: any): void {
        let _loc4_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(param1);
            _loc4_.clear(0);
            this.drawFullTrackLayer(_loc4_, param2.darkening, "normal", param3);
        } finally {
            param1.unlock();
        }
    }

    private prebakeSplitters(param1: BitmapData, param2: any, param3: any): void {
        let _loc4_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(param1);
            _loc4_.clear(0);
            this.drawTopPixels(_loc4_, param2.top, param3);
            this.drawSplitters(_loc4_, param2.splitters, param3);
        } finally {
            param1.unlock();
        }
    }

    private drawFill(param1: VariableFxBitmapComposer, param2: BitmapData, param3: number, param4: any): void {
        if (param3 <= 0 || param2.width <= 0 || param2.height <= 0) {
            return;
        }
        param1.drawTiledChunk(param2, new VariableFxClipRect(0, 0, 1, 1), Number(param4.fillX), Number(param4.fillY), param3, Number(param4.fillHeight), "normal", 255);
    }

    private drawFullTrackLayer(param1: VariableFxBitmapComposer, param2: BitmapData, param3: string, param4: any): void {
        param1.drawThreeSlice(param2, 4, 4, Number(param4.fillWidth), Number(param4.fillX), Number(param4.fillY), param3, 255);
    }

    private drawLighting(param1: VariableFxBitmapComposer, param2: BitmapData, param3: number, param4: any): void {
        let _loc5_: number = Math.min(param3 - 3, (param4.fillWidth | 0) - 3 * 2) | 0;
        if (_loc5_ <= 0 || param2.width < 3 + 1 || param2.height < 1 + 1) {
            return;
        }
        param1.drawTiledChunk(param2, new VariableFxClipRect(3, 1, 1, 1), (param4.fillX | 0) + 3, 3, _loc5_, 1, "add", 255);
    }

    private drawTopPixels(param1: VariableFxBitmapComposer, param2: BitmapData, param3: any): void {
        let _loc6_: number = Math.min(2, param2.width - 1) | 0;
        let _loc7_: number = Math.max(0, param2.width - 2 - 1) | 0;
        let _loc10_: number = Math.min(2, param2.height - 1) | 0;
        let _loc8_: number = Math.max(0, param2.height - 2 - 1) | 0;
        let _loc9_: number = param3.fillX | 0;
        let _loc11_: number = (param3.width | 0) - (param3.fillX | 0) - 1;
        let _loc4_: number = param3.fillY | 0;
        let _loc5_: number = (param3.fillY | 0) + (param3.fillHeight | 0) - 1;
        this.drawSingleSourcePixel(param1, param2, _loc6_, _loc10_, _loc9_, _loc4_);
        this.drawSingleSourcePixel(param1, param2, _loc6_, _loc8_, _loc9_, _loc5_);
        this.drawSingleSourcePixel(param1, param2, _loc7_, _loc10_, _loc11_, _loc4_);
        this.drawSingleSourcePixel(param1, param2, _loc7_, _loc8_, _loc11_, _loc5_);
    }

    private drawSingleSourcePixel(param1: VariableFxBitmapComposer, param2: BitmapData, param3: number, param4: number, param5: number, param6: number): void {
        param1.drawTiledChunk(param2, new VariableFxClipRect(param3, param4, 1, 1), param5, param6, 1, 1, "normal", 255);
    }

    private drawSplitters(param1: VariableFxBitmapComposer, param2: BitmapData, param3: any): void {
        let _loc5_: number = 0;
        let _loc7_: number = Math.min(param3.fillHeight | 0, param2.height - 2) | 0;
        let _loc6_: number = Math.min(2, param2.width - 0) | 0;
        let _loc4_: VariableFxClipRect = this.createFillClip(param3.fillWidth | 0, param3);
        if (_loc6_ <= 0 || _loc7_ <= 0) {
            return;
        }
        _loc5_ = 5;
        while (_loc5_ <= (param3.fillWidth | 0) - 5 - 1) {
            param1.drawTiledChunk(param2, new VariableFxClipRect(0, 2, _loc6_, _loc7_), (param3.fillX | 0) + _loc5_, Number(param3.fillY), _loc6_, Number(param3.fillHeight), "normal", 255, _loc4_);
            _loc5_ += 5;
        }
    }

    private createFillClip(param1: number, param2: any = null): VariableFxClipRect {
        param2 = param2 == null ? this._layout : param2;
        return new VariableFxClipRect(param2.fillX | 0, param2.fillY | 0, param1, param2.fillHeight | 0);
    }

    private resolveAssets(): any {
        return { "background": this.getLayer(stringOrNull(ThermometerHealthPointsRenderer.THERMOMETER_HEALTH_POINTS_ASSETS.background)), "darkening": this.getLayer(stringOrNull(ThermometerHealthPointsRenderer.THERMOMETER_HEALTH_POINTS_ASSETS.darkening)), "fill": this.getLayer(stringOrNull(ThermometerHealthPointsRenderer.THERMOMETER_HEALTH_POINTS_ASSETS.fill)), "lighting": this.getLayer(stringOrNull(ThermometerHealthPointsRenderer.THERMOMETER_HEALTH_POINTS_ASSETS.lighting)), "splitters": this.getLayer(stringOrNull(ThermometerHealthPointsRenderer.THERMOMETER_HEALTH_POINTS_ASSETS.splitters)), "top": this.getLayer(stringOrNull(ThermometerHealthPointsRenderer.THERMOMETER_HEALTH_POINTS_ASSETS.top)) };
    }

    private getLayer(param1: string): BitmapData {
        let _loc2_: BitmapData = this.context.assetProvider == null ? null : this.context.assetProvider.getBitmapData(param1);
        if (_loc2_ == null) {
            throw new Error("Missing Variable FX thermometer health points layer \'" + param1 + "\'.");
        }
        return _loc2_;
    }

    private resolveLayout(param1: string, param2: UtilsMap, param3: BitmapData): any {
        let _loc4_: number = ThermometerHealthPointsRenderer.resolveThermometerHealthPointsFrameWidth(param1, param2);
        let _loc5_: number = Math.max(1, param3.height - 2 * 2) | 0;
        return { "fillHeight": _loc5_, "fillWidth": Math.max(0, _loc4_ - 2 * 2), "fillX": 2, "fillY": 2, "height": param3.height, "sliceLeftWidth": 3, "sliceRightWidth": 3, "width": _loc4_ };
    }

    private createTransparentBitmap(param1: number, param2: number): BitmapData {
        return new BitmapData(param1, param2, true, 0);
    }
}
