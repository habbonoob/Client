import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
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

export class BlockProgressBarRenderer extends BarVariableFxRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::BlockProgressBarRenderer'); }

    private static readonly BLOCK_WIDTH: number = 7;
    private static readonly SPLITTER_WIDTH: number = 1;
    private static readonly CHROME_EDGE_WIDTH: number = 3;
    private static readonly FRAME_HEIGHT: number = 13;
    private static readonly FILL_Y: number = 3;
    private static readonly FILL_HEIGHT: number = 7;
    private static readonly BLOCK_CHUNK_WIDTH: number = 8;

    private static readonly BLOCK_PROGRESS_BAR_ASSETS: any = { "background": "variablefx_block_bar_background", "bar": "variablefx_block_bar_fill", "darkening": "variablefx_block_bar_darkening", "lighting": "variablefx_block_bar_lighting", "metallic": "variablefx_block_bar_metallic", "splitters": "variablefx_block_bar_splitters" };

    declare private _assets: any;

    declare private _SafeStr_14717: BitmapData;

    declare private _barCache: BitmapData;

    private _SafeStr_14721: number = -1;

    declare private _SafeStr_14718: BitmapData;

    declare private _SafeStr_14722: BitmapData;

    declare private _iconLayout: VariableFxIconOverlayLayout;

    declare private _layout: any;

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
        if (this._SafeStr_14718 == null) {
            this._barCache = this.createTransparentBitmap(this._iconLayout.frameWidth, this._iconLayout.frameHeight);
        }
    }

    public static resolveBlockProgressBarBlockCount(param1: string, param2: UtilsMap): number {
        return VariableFxSegmentedProgress.resolveSegmentCount(param1, param2, BlockProgressBarRenderer.resolveDefaultBlockProgressBarBlockCount);
    }

    private static resolveDefaultBlockProgressBarBlockCount(param1: string): number {
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
                _loc4_.drawLayer(this.resolveBarPrebakeOrCache(), 0, 0, "normal", 255, this.resolveProgressClip(_loc2_));
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
        let isDynamicPaint: boolean = VariableFxColorType.isDynamicPaintColor(context.config.color);
        let backgroundPrebake: BitmapData = this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        let foregroundPrebake: BitmapData = this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        let barPrebake: BitmapData = isDynamicPaint ? null : this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        this.prebakeBackground(backgroundPrebake, assets, layout, iconLayout);
        this.prebakeForeground(foregroundPrebake, assets, layout, iconLayout, icon);
        if (barPrebake != null) {
            this.drawBarBitmap(barPrebake, (0xFF000000 | paintColor.rgb >>> 0) >>> 0, assets, layout, iconLayout);
        }
        return new VariableFxGenericRendererPrebake({ "assets": assets, "backgroundPrebake": backgroundPrebake, "barPrebake": barPrebake, "foregroundPrebake": foregroundPrebake, "iconLayout": iconLayout, "layout": layout }, (): void => {
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
        let _loc6_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc6_ = new VariableFxBitmapComposer(param1);
            _loc6_.clear(0);
            this.drawSplitters(_loc6_, param2.splitters, param4._SafeStr_14678, param4._SafeStr_14679, param3);
            if (param5 != null) {
                _loc6_.drawLayer(param5.bitmapData, param4._SafeStr_14681, param4._SafeStr_14682, "normal", 255);
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
            this.drawBarBitmap(this._barCache, this.displayedFillArgb, this._assets, this._layout, this._iconLayout);
        }
        return this._barCache;
    }

    private drawBarBitmap(param1: BitmapData, param2: number, param3: any, param4: any, param5: VariableFxIconOverlayLayout): void {
        let _loc8_: VariableFxBitmapComposer = null;
        let _loc7_: any = null;
        let _loc10_: number = param5._SafeStr_14678;
        let _loc9_: number = param5._SafeStr_14679;
        let _loc6_: VariableFxClipRect = this.resolveProgressClip(param4.fillWidth | 0, param4, param5);
        param1.lock();
        try {
            _loc8_ = new VariableFxBitmapComposer(param1);
            _loc8_.clear(0);
            _loc8_.fillRect(_loc10_ + (param4.fillX | 0), _loc9_ + (param4.fillY | 0), Number(param4.fillWidth), Number(param4.fillHeight), param2);
            this.drawRepeatedFillLayer(_loc8_, param3.bar, "multiply", _loc10_, _loc9_, _loc6_, param4);
            if (param3.metallic != null) {
                this.drawRepeatedFillLayer(_loc8_, param3.metallic, "normal", _loc10_, _loc9_, _loc6_, param4);
            }
            for (_loc7_ of valuesOf(param3.overlays)) {
                this.drawRepeatedFillLayer(_loc8_, _loc7_.layer, stringOrNull(_loc7_.blendMode), _loc10_, _loc9_, _loc6_, param4);
            }
        } finally {
            param1.unlock();
        }
    }

    private drawRepeatedFillLayer(param1: VariableFxBitmapComposer, param2: BitmapData, param3: string, param4: number, param5: number, param6: VariableFxClipRect, param7: any): void {
        if (param6.width <= 0) {
            return;
        }
        param1.drawTiledChunk(param2, new VariableFxClipRect(0, 0, 8, param7.fillHeight | 0), param4 + (param7.fillX | 0), param5 + (param7.fillY | 0), Number(param7.fillWidth), Number(param7.fillHeight), param3, 255, param6);
    }

    private drawSplitters(param1: VariableFxBitmapComposer, param2: BitmapData, param3: number, param4: number, param5: any): void {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        _loc6_ = 1;
        while (_loc6_ <= (param5.blockCount | 0)) {
            _loc7_ = param3 + (param5.fillX | 0) + _loc6_ * 8 - (param5.splitterWidth | 0);
            param1.drawTiledChunk(param2, new VariableFxClipRect(0, param5.fillY | 0, param5.splitterWidth | 0, param5.fillHeight | 0), _loc7_, param4 + (param5.fillY | 0), Number(param5.splitterWidth), Number(param5.fillHeight), "normal", 255);
            _loc6_++;
        }
    }

    private resolveProgressClip(param1: number, param2: any = null, param3: VariableFxIconOverlayLayout = null): VariableFxClipRect {
        param2 = param2 == null ? this._layout : param2;
        param3 = param3 == null ? this._iconLayout : param3;
        return new VariableFxClipRect(param3._SafeStr_14678 + (param2.fillX | 0), param3._SafeStr_14679 + (param2.fillY | 0), param1, param2.fillHeight | 0);
    }

    private resolveAssets(): any {
        let _loc1_: any = VariableFxColorType.resolvePaintColor(this.context.config.color, this.context.config.extra);
        let _loc3_: boolean = Boolean(_loc1_.isMetallic);
        let _loc4_: BitmapData = this.getLayer(stringOrNull(BlockProgressBarRenderer.BLOCK_PROGRESS_BAR_ASSETS.darkening));
        let _loc2_: BitmapData = this.getLayer(stringOrNull(BlockProgressBarRenderer.BLOCK_PROGRESS_BAR_ASSETS.lighting));
        return { "background": this.getLayer(stringOrNull(BlockProgressBarRenderer.BLOCK_PROGRESS_BAR_ASSETS.background)), "bar": this.getLayer(stringOrNull(BlockProgressBarRenderer.BLOCK_PROGRESS_BAR_ASSETS.bar)), "metallic": (_loc3_ ? this.getLayer(stringOrNull(BlockProgressBarRenderer.BLOCK_PROGRESS_BAR_ASSETS.metallic)) : null), "overlays": (_loc3_ ? [{ "blendMode": "add", "layer": _loc2_ }, { "blendMode": "multiply", "layer": _loc4_ }, { "blendMode": "add", "layer": _loc2_ }, { "blendMode": "multiply", "layer": _loc4_ }] : [{ "blendMode": "multiply", "layer": _loc4_ }, { "blendMode": "add", "layer": _loc2_ }]), "splitters": this.getLayer(stringOrNull(BlockProgressBarRenderer.BLOCK_PROGRESS_BAR_ASSETS.splitters)) };
    }

    private getLayer(param1: string): BitmapData {
        let _loc2_: BitmapData = this.context.assetProvider == null ? null : this.context.assetProvider.getBitmapData(param1);
        if (_loc2_ == null) {
            throw new Error("Missing Variable FX block progress bar layer \'" + param1 + "\'.");
        }
        return _loc2_;
    }

    private resolveIconOverlayLayout(param1: any, param2: VariableFxConfiguredIcon): VariableFxIconOverlayLayout {
        return VariableFxConfiguredIcon.resolveBarIconOverlayLayout(param1.width | 0, param1.height | 0, param2, VariableFxConfiguredIcon.resolveAlignment(this.context));
    }

    private resolveLayout(param1: string, param2: UtilsMap): any {
        let _loc3_: number = BlockProgressBarRenderer.resolveBlockProgressBarBlockCount(param1, param2);
        let _loc4_: number = _loc3_ * 7 + (_loc3_ - 1) * 1;
        return { "blockCount": _loc3_, "blockWidth": 7, "fillHeight": 7, "fillWidth": _loc4_, "fillX": 3, "fillY": 3, "height": 13, "sliceLeftWidth": 3, "sliceRightWidth": 3, "splitterWidth": 1, "width": _loc4_ + 3 * 2 };
    }

    private createTransparentBitmap(param1: number, param2: number): BitmapData {
        return new BitmapData(param1, param2, true, 0);
    }
}
