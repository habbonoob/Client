import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BarVariableFxRendererBase } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/BarVariableFxRendererBase';
import { VariableFxBarSliceUtils } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/VariableFxBarSliceUtils';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxClipRect';
import { VariableFxConfiguredIcon } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxConfiguredIcon';
import { VariableFxIconOverlayLayout } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxIconOverlayLayout';
import { VariableFxColorType } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxColorType';
import { VariableFxConfigRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigRendererPrebake';
import { VariableFxGenericRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxGenericRendererPrebake';
import { VariableFxSegmentedProgress } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxSegmentedProgress';

export class ArrowProgressBarRenderer extends BarVariableFxRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::ArrowProgressBarRenderer'); }

    private static readonly FRAME_HEIGHT: number = 13;
    private static readonly CHROME_EDGE_WIDTH: number = 3;
    private static readonly FILL_Y: number = 3;
    private static readonly FILL_HEIGHT: number = 7;
    private static readonly ARROW_WIDTH: number = 9;
    private static readonly BAR_CHUNK_WIDTH: number = 11;
    private static readonly _SafeStr_14736: number = 7;

    private static readonly ARROW_PROGRESS_BAR_ASSETS: any = { "background": "variablefx_arrow_bar_background", "barChunk": "variablefx_arrow_bar_chunk", "darkening": "variablefx_arrow_bar_darkening", "lighting": "variablefx_arrow_bar_lighting", "metallic": "variablefx_arrow_bar_metallic", "splitter": "variablefx_arrow_bar_splitter", "splitterLeft": "variablefx_arrow_bar_splitter_left" };

    declare private _assets: any;

    declare private _SafeStr_14717: BitmapData;

    declare private _barCache: BitmapData;

    private _SafeStr_14721: number = -1;

    declare private _SafeStr_14718: BitmapData;

    declare private _SafeStr_14722: BitmapData;

    declare private _iconLayout: VariableFxIconOverlayLayout;

    declare private _layout: any;

    declare private _overlays: any[];

    constructor(param1: VariableFxRendererContext) {
        let prebake: VariableFxGenericRendererPrebake;
        let data: any;
        let context: VariableFxRendererContext = param1;
        super(context);
        prebake = asInstanceOf(VariableFxConfigRendererPrebake.getOrCreate(context.config, (): any => {
             return this.createPrebake(context);
         }), VariableFxGenericRendererPrebake);
        data = prebake.data;
        this._assets = data.assets;
        this._SafeStr_14717 = data.backgroundPrebake;
        this._SafeStr_14718 = data.barPrebake;
        this._SafeStr_14722 = data.foregroundPrebake;
        this._iconLayout = data.iconLayout instanceof VariableFxIconOverlayLayout ? data.iconLayout : null;
        this._layout = data.layout;
        this._overlays = Array.isArray(data.overlays) ? data.overlays : null;
        if (this._SafeStr_14718 == null) {
            this._barCache = this.createTransparentBitmap(this._iconLayout.frameWidth, this._iconLayout.frameHeight);
        }
    }

    public static resolveArrowProgressBarArrowCount(param1: string, param2: UtilsMap): number {
        return VariableFxSegmentedProgress.resolveSegmentCount(param1, param2, ArrowProgressBarRenderer.resolveDefaultArrowProgressBarArrowCount);
    }

    public static resolveArrowProgressBarFrameWidth(param1: string, param2: UtilsMap): number {
        return 3 * 2 + ArrowProgressBarRenderer.resolveArrowProgressBarArrowCount(param1, param2) * 9;
    }

    private static resolveDefaultArrowProgressBarArrowCount(param1: string): number {
        switch (param1) {
            case "extra_small":
                return 3;
            case "small":
                return 4;
            case "medium":
                return 6;
            case "large":
                return 8;
            case "extra_large":
                return 10;
            default:
                return 6;
        }
    }

    protected override get frameWidth(): number {
        return this._iconLayout.frameWidth;
    }

    protected override get frameHeight(): number {
        return this._iconLayout.frameHeight;
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
            _loc4_.drawLayer(this._SafeStr_14717, 0, 0, "normal", 255);
            if (_loc2_ > 0) {
                _loc4_.drawLayer(this.resolveBarPrebakeOrCache(), 0, 0, "normal", 255, this.createFillClip(_loc2_));
            }
            _loc4_.drawLayer(this._SafeStr_14722, 0, 0, "normal", 255);
        } finally {
            _loc3_.unlock();
        }
    }

    public override dispose(): void {
        super.dispose();
        if (this._barCache != null) {
            this._barCache.dispose();
            this._barCache = null;
        }
    }

    private createPrebake(param1: VariableFxRendererContext): VariableFxGenericRendererPrebake {
        let context: VariableFxRendererContext = param1;
        let layout: any = this.resolveLayout(context.config.width, context.config.extra);
        let assets: any = this.resolveAssets();
        let icon: VariableFxConfiguredIcon = VariableFxConfiguredIcon.resolve(context);
        let iconLayout: VariableFxIconOverlayLayout = this.resolveIconOverlayLayout(layout, icon);
        let paintColor: any = VariableFxColorType.resolvePaintColor(context.config.color, context.config.extra);
        let overlays: any[] = this.resolveOverlays(assets, Boolean(paintColor.isMetallic));
        let isDynamicPaint: boolean = VariableFxColorType.isDynamicPaintColor(context.config.color);
        let backgroundPrebake: BitmapData = this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        let foregroundPrebake: BitmapData = this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        let barPrebake: BitmapData = isDynamicPaint ? null : this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        this.prebakeBackground(backgroundPrebake, assets, layout, iconLayout);
        this.prebakeForeground(foregroundPrebake, assets, layout, iconLayout, icon);
        if (barPrebake != null) {
            this.drawBarBitmap(barPrebake, (0xFF000000 | paintColor.rgb >>> 0) >>> 0, assets, overlays, layout, iconLayout);
        }
        return new VariableFxGenericRendererPrebake({ "assets": assets, "backgroundPrebake": backgroundPrebake, "barPrebake": barPrebake, "foregroundPrebake": foregroundPrebake, "iconLayout": iconLayout, "layout": layout, "overlays": overlays }, (): void => {
             backgroundPrebake.dispose();
             foregroundPrebake.dispose();
             if (barPrebake != null) {
                 barPrebake.dispose();
             }
         });
    }

    private prebakeBackground(param1: BitmapData, param2: any, param3: any, param4: VariableFxIconOverlayLayout): void {
        let _loc5_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc5_ = new VariableFxBitmapComposer(param1);
            _loc5_.clear(0);
            _loc5_.drawThreeSlice(param2.background, VariableFxBarSliceUtils.resolveBackgroundSliceLeftWidth(param3), VariableFxBarSliceUtils.resolveBackgroundSliceRightWidth(param3), Number(param3.width), param4._SafeStr_14678, param4._SafeStr_14679, "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private prebakeForeground(param1: BitmapData, param2: any, param3: any, param4: VariableFxIconOverlayLayout, param5: VariableFxConfiguredIcon): void {
        let _loc8_: VariableFxBitmapComposer = null;
        let _loc7_: number = 0;
        let _loc6_: VariableFxClipRect = this.createFillClip(param3.fillWidth | 0, param3, param4);
        param1.lock();
        try {
            _loc8_ = new VariableFxBitmapComposer(param1);
            _loc8_.clear(0);
            _loc8_.drawLayer(param2.splitterLeft, param4._SafeStr_14678 + (param3.fillX | 0), param4._SafeStr_14679 + (param3.fillY | 0), "normal", 255, _loc6_);
            _loc7_ = 7;
            while (_loc7_ < (param3.fillWidth | 0)) {
                _loc8_.drawLayer(param2.splitter, param4._SafeStr_14678 + (param3.fillX | 0) + _loc7_, param4._SafeStr_14679 + (param3.fillY | 0), "normal", 255, _loc6_);
                _loc7_ += 9;
            }
            if (param5 != null) {
                _loc8_.drawLayer(param5.bitmapData, param4._SafeStr_14681, param4._SafeStr_14682, "normal", 255);
            }
        } finally {
            param1.unlock();
        }
    }

    private resolveBarPrebakeOrCache(): BitmapData {
        if (this._SafeStr_14718 != null) {
            return this._SafeStr_14718;
        }
        if (this._SafeStr_14721 != (this.displayedFillArgb | 0)) {
            this._SafeStr_14721 = this.displayedFillArgb | 0;
            this.drawBarBitmap(this._barCache, this.displayedFillArgb, this._assets, this._overlays, this._layout, this._iconLayout);
        }
        return this._barCache;
    }

    private drawBarBitmap(param1: BitmapData, param2: number, param3: any, param4: any[], param5: any, param6: VariableFxIconOverlayLayout): void {
        let _loc9_: VariableFxBitmapComposer = null;
        let _loc8_: number = 0;
        let _loc10_: BitmapData = this.createBarChunkBitmap(param2, param3, param4);
        let _loc7_: VariableFxClipRect = this.createFillClip(param5.fillWidth | 0, param5, param6);
        param1.lock();
        try {
            _loc9_ = new VariableFxBitmapComposer(param1);
            _loc9_.clear(0);
            _loc8_ = 0;
            while (_loc8_ < (param5.fillWidth | 0)) {
                _loc9_.drawLayer(_loc10_, param6._SafeStr_14678 + (param5.fillX | 0) + _loc8_, param6._SafeStr_14679 + (param5.fillY | 0), "normal", 255, _loc7_);
                _loc8_ += 9;
            }
        } finally {
            param1.unlock();
            _loc10_.dispose();
        }
    }

    private createBarChunkBitmap(param1: number, param2: any, param3: any[]): BitmapData {
        let _loc5_: VariableFxBitmapComposer = null;
        let _loc4_: any = null;
        let _loc6_: BitmapData = this.createTransparentBitmap(11, 7);
        _loc6_.lock();
        try {
            _loc5_ = new VariableFxBitmapComposer(_loc6_);
            _loc5_.clear(0);
            _loc5_.drawTintedLayer(param2.barChunk, 0, 0, param1, "normal", 255);
            if (param2.metallic != null) {
                _loc5_.drawLayer(param2.metallic, 0, 0, "add", 255);
            }
            for (_loc4_ of param3 ?? []) {
                _loc5_.drawLayer(_loc4_.layer, 0, 0, stringOrNull(_loc4_.blendMode), 255);
            }
        } finally {
            _loc6_.unlock();
        }
        return _loc6_;
    }

    private createFillClip(param1: number = -1, param2: any = null, param3: VariableFxIconOverlayLayout = null): VariableFxClipRect {
        param2 = param2 == null ? this._layout : param2;
        param3 = param3 == null ? this._iconLayout : param3;
        param1 = param1 < 0 ? param2.fillWidth | 0 : param1;
        return new VariableFxClipRect(param3._SafeStr_14678 + (param2.fillX | 0), param3._SafeStr_14679 + (param2.fillY | 0), param1, param2.fillHeight | 0);
    }

    private resolveAssets(): any {
        let _loc1_: any = VariableFxColorType.resolvePaintColor(this.context.config.color, this.context.config.extra);
        let _loc2_: boolean = Boolean(_loc1_.isMetallic);
        return { "background": this.getLayer(stringOrNull(ArrowProgressBarRenderer.ARROW_PROGRESS_BAR_ASSETS.background)), "barChunk": this.getLayer(stringOrNull(ArrowProgressBarRenderer.ARROW_PROGRESS_BAR_ASSETS.barChunk)), "darkening": this.getLayer(stringOrNull(ArrowProgressBarRenderer.ARROW_PROGRESS_BAR_ASSETS.darkening)), "lighting": this.getLayer(stringOrNull(ArrowProgressBarRenderer.ARROW_PROGRESS_BAR_ASSETS.lighting)), "metallic": (_loc2_ ? this.getLayer(stringOrNull(ArrowProgressBarRenderer.ARROW_PROGRESS_BAR_ASSETS.metallic)) : null), "splitter": this.getLayer(stringOrNull(ArrowProgressBarRenderer.ARROW_PROGRESS_BAR_ASSETS.splitter)), "splitterLeft": this.getLayer(stringOrNull(ArrowProgressBarRenderer.ARROW_PROGRESS_BAR_ASSETS.splitterLeft)) };
    }

    private resolveOverlays(param1: any, param2: boolean): any[] {
        return param2 ? [{ "blendMode": "add", "layer": param1.lighting }, { "blendMode": "multiply", "layer": param1.darkening }, { "blendMode": "add", "layer": param1.lighting }, { "blendMode": "multiply", "layer": param1.darkening }] : [{ "blendMode": "multiply", "layer": param1.darkening }, { "blendMode": "add", "layer": param1.lighting }];
    }

    private getLayer(param1: string): BitmapData {
        let _loc2_: BitmapData = this.context.assetProvider == null ? null : this.context.assetProvider.getBitmapData(param1);
        if (_loc2_ == null) {
            throw new Error("Missing Variable FX arrow progress bar layer \'" + param1 + "\'.");
        }
        return _loc2_;
    }

    private resolveIconOverlayLayout(param1: any, param2: VariableFxConfiguredIcon): VariableFxIconOverlayLayout {
        return VariableFxConfiguredIcon.resolveBarIconOverlayLayout(param1.width | 0, param1.height | 0, param2, VariableFxConfiguredIcon.resolveAlignment(this.context));
    }

    private resolveLayout(param1: string, param2: UtilsMap): any {
        let _loc4_: number = ArrowProgressBarRenderer.resolveArrowProgressBarArrowCount(param1, param2);
        let _loc3_: number = _loc4_ * 9;
        return { "arrowCount": _loc4_, "fillHeight": 7, "fillWidth": _loc3_, "fillX": 3, "fillY": 3, "height": 13, "sliceLeftWidth": 3, "sliceRightWidth": 3, "width": _loc3_ + 3 * 2 };
    }

    private createTransparentBitmap(param1: number, param2: number): BitmapData {
        return new BitmapData(param1, param2, true, 0);
    }
}
