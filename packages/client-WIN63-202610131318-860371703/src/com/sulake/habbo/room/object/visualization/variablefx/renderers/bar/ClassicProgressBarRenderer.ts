import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
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

export class ClassicProgressBarRenderer extends BarVariableFxRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::ClassicProgressBarRenderer'); }

    private static readonly CLASSIC_PROGRESS_BAR_ASSETS: any = { "background": "variablefx_classic_bar_background", "bar": "variablefx_classic_bar_fill", "darkening": "variablefx_classic_bar_darkening", "lighting": "variablefx_classic_bar_lighting", "metallic": "variablefx_classic_bar_metallic" };

    private static readonly BASE_LAYOUT_METRICS: any = { "fillX": 1, "fillY": 1, "sliceLeftWidth": 2, "sliceRightWidth": 2 };

    private static readonly _SafeStr_14723: any = { "leftWidth": 3, "rightWidth": 3 };

    declare private _assets: any;

    declare private _SafeStr_14705: BitmapData;

    declare private _barCache: BitmapData;

    private _SafeStr_14709: number = -1;

    declare private _barEndCache: BitmapData;

    declare private _SafeStr_14711: BitmapData;

    declare private _SafeStr_14706: BitmapData;

    declare private _icon: VariableFxConfiguredIcon;

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
        this._SafeStr_14705 = data.backgroundPrebake;
        this._SafeStr_14711 = data.barEndPrebake;
        this._SafeStr_14706 = data.barPrebake;
        this._icon = data.icon instanceof VariableFxConfiguredIcon ? data.icon : null;
        this._iconLayout = data.iconLayout instanceof VariableFxIconOverlayLayout ? data.iconLayout : null;
        this._layout = data.layout;
        if (this._SafeStr_14706 == null) {
            this._barCache = this.createTransparentBitmap(this._iconLayout.frameWidth, this._iconLayout.frameHeight);
            this._barEndCache = this.createTransparentBitmap(this.barEndWidthPx, this._layout.height | 0);
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

    protected get assetNames(): any {
        return ClassicProgressBarRenderer.CLASSIC_PROGRESS_BAR_ASSETS;
    }

    protected get baseLayoutMetrics(): any {
        return ClassicProgressBarRenderer.BASE_LAYOUT_METRICS;
    }

    protected get iconContentYOffsetPx(): number {
        return 2;
    }

    protected get layerDescription(): string {
        return "classic progress bar";
    }

    protected get overlaySlice(): any {
        return ClassicProgressBarRenderer._SafeStr_14723;
    }

    protected get barEndWidthPx(): number {
        return 2;
    }

    protected get barEndMinimumFillWidthPx(): number {
        return 4;
    }

    protected get barBodyIncludesEndWidth(): boolean {
        return true;
    }

    protected get barEndSourceRightPaddingPx(): number {
        return 1;
    }

    protected get barEndBaseSourceRightPaddingPx(): number {
        return this.barEndSourceRightPaddingPx;
    }

    protected get usesSeparateBarEndOverlaySource(): boolean {
        return false;
    }

    protected override createFrameBitmap(param1: number, param2: number): BitmapData {
        return this.createTransparentBitmap(param1, param2);
    }

    protected override renderFrame(param1: number): void {
        let _loc4_: VariableFxBitmapComposer = null;
        let _loc2_: number = 0;
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: BitmapData = this.mutableFrame.bitmapData;
        if (_loc3_ == null) {
            return;
        }
        _loc3_.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(_loc3_);
            _loc2_ = this.calculateFilledPixelWidth();
            _loc6_ = this._iconLayout._SafeStr_14666;
            _loc5_ = this._iconLayout._SafeStr_14667;
            _loc4_.drawLayer(this._SafeStr_14705, 0, 0, "normal", 255);
            if (_loc2_ > 0) {
                _loc4_.drawLayer(this.resolveBarPrebakeOrCache(), 0, 0, "normal", 255, this.resolveBarBodyClip(_loc2_));
                if (this.shouldDrawBarEnd(_loc2_)) {
                    _loc4_.drawLayer(this.resolveBarEndPrebakeOrCache(), _loc6_ + (this._layout.fillX | 0) + _loc2_ - this.barEndWidthPx, _loc5_, "normal", 255, this.resolveBarEndClip(_loc2_));
                }
            }
            this.drawIconOverlay(_loc4_, this._layout, this._iconLayout, this._icon);
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
        if (this._barEndCache != null) {
            this._barEndCache.dispose();
            this._barEndCache = null;
        }
    }

    protected drawIconOverlay(param1: VariableFxBitmapComposer, param2: any, param3: VariableFxIconOverlayLayout, param4: VariableFxConfiguredIcon): void {
        if (param4 == null) {
            return;
        }
        param1.drawLayer(param4.bitmapData, param3._SafeStr_14669, param3._SafeStr_14670, "normal", 255);
    }

    protected resolveFrameWidth(param1: string): number {
        switch (param1) {
            case "extra_small":
                return 29;
            case "small":
                return 45;
            case "medium":
                return 61;
            case "large":
                return 77;
            case "extra_large":
                return 93;
            default:
                return 61;
        }
    }

    protected resolveMetallicOverlays(param1: BitmapData, param2: BitmapData): any[] {
        return [{ "blendMode": "add", "layer": param2 }, { "blendMode": "multiply", "layer": param1 }, { "blendMode": "add", "layer": param2 }, { "blendMode": "multiply", "layer": param1 }];
    }

    protected resolveNormalOverlays(param1: BitmapData, param2: BitmapData): any[] {
        return [{ "blendMode": "multiply", "layer": param1 }, { "blendMode": "add", "layer": param2 }];
    }

    private createPrebake(param1: VariableFxRendererContext): VariableFxGenericRendererPrebake {
        let context: VariableFxRendererContext = param1;
        let layout: any = this.resolveLayout(context.config.width);
        let assets: any = this.resolveAssets();
        let icon: VariableFxConfiguredIcon = VariableFxConfiguredIcon.resolve(context);
        let iconLayout: VariableFxIconOverlayLayout = this.resolveIconOverlayLayout(layout, icon);
        let paintColor: any = VariableFxColorType.resolvePaintColor(context.config.color, context.config.extra);
        let isDynamicPaint: boolean = VariableFxColorType.isDynamicPaintColor(context.config.color);
        let backgroundPrebake: BitmapData = this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        let barPrebake: BitmapData = isDynamicPaint ? null : this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        let barEndPrebake: BitmapData = isDynamicPaint ? null : this.createTransparentBitmap(this.barEndWidthPx, layout.height | 0);
        this.prebakeBackground(backgroundPrebake, assets, layout, iconLayout);
        if (barPrebake != null && barEndPrebake != null) {
            this.drawBarBitmap(barPrebake, barEndPrebake, (0xFF000000 | paintColor.rgb >>> 0) >>> 0, assets, layout, iconLayout);
        }
        return new VariableFxGenericRendererPrebake({ "assets": assets, "backgroundPrebake": backgroundPrebake, "barEndPrebake": barEndPrebake, "barPrebake": barPrebake, "icon": icon, "iconLayout": iconLayout, "layout": layout }, (): void => {
             backgroundPrebake.dispose();
             if (barPrebake != null) {
                 barPrebake.dispose();
             }
             if (barEndPrebake != null) {
                 barEndPrebake.dispose();
             }
         });
    }

    private prebakeBackground(param1: BitmapData, param2: any, param3: any, param4: VariableFxIconOverlayLayout): void {
        let _loc5_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc5_ = new VariableFxBitmapComposer(param1);
            _loc5_.clear(0);
            _loc5_.drawThreeSlice(param2.background, VariableFxBarSliceUtils.resolveBackgroundSliceLeftWidth(param3), VariableFxBarSliceUtils.resolveBackgroundSliceRightWidth(param3), Number(param3.width), param4._SafeStr_14666, param4._SafeStr_14667, "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private resolveBarPrebakeOrCache(): BitmapData {
        if (this._SafeStr_14706 != null) {
            return this._SafeStr_14706;
        }
        this.resolveDynamicBarCaches();
        return this._barCache;
    }

    private resolveBarEndPrebakeOrCache(): BitmapData {
        if (this._SafeStr_14711 != null) {
            return this._SafeStr_14711;
        }
        this.resolveDynamicBarCaches();
        return this._barEndCache;
    }

    private resolveDynamicBarCaches(): void {
        let _loc1_: number = this.displayedFillArgb;
        if (this._SafeStr_14709 == (_loc1_ | 0)) {
            return;
        }
        this._SafeStr_14709 = _loc1_ | 0;
        this.drawBarBitmap(this._barCache, this._barEndCache, _loc1_, this._assets, this._layout, this._iconLayout);
    }

    private drawBarBitmap(param1: BitmapData, param2: BitmapData, param3: number, param4: any, param5: any, param6: VariableFxIconOverlayLayout): void {
        let _loc9_: VariableFxBitmapComposer = null;
        let _loc11_: number = 0;
        let _loc10_: number = 0;
        let _loc7_: VariableFxClipRect = null;
        let _loc8_: any = null;
        param1.lock();
        param2.lock();
        try {
            _loc9_ = new VariableFxBitmapComposer(param1);
            _loc11_ = param6._SafeStr_14666;
            _loc10_ = param6._SafeStr_14667;
            _loc7_ = this.resolveFullFillClip(param5, param6);
            _loc9_.clear(0);
            _loc9_.drawThreeSlice(param4.bar, Number(param5.sliceLeftWidth), Number(param5.sliceRightWidth), Number(param5.fillWidth), _loc11_ + (param5.fillX | 0), _loc10_ + (param5.fillY | 0), "normal", 255, _loc7_, param3);
            if (param4.metallic != null) {
                this.drawOverlayLayer(_loc9_, param4.metallic, "add", param5.fillWidth | 0, _loc11_, _loc10_, param5);
            }
            for (_loc8_ of valuesOf(param4.overlays)) {
                this.drawOverlayLayer(_loc9_, _loc8_.layer, stringOrNull(_loc8_.blendMode), param5.fillWidth | 0, _loc11_, _loc10_, param5);
            }
            this.drawBarEndBitmap(param2, param1, param4, param5, param6);
        } finally {
            param2.unlock();
            param1.unlock();
        }
    }

    private drawBarEndBitmap(param1: BitmapData, param2: BitmapData, param3: any, param4: any, param5: VariableFxIconOverlayLayout): void {
        let _loc8_: any = null;
        let _loc9_: VariableFxBitmapComposer = new VariableFxBitmapComposer(param1);
        let _loc6_: number = param5._SafeStr_14666 + (param4.width | 0) - this.barEndSourceRightPaddingPx - this.barEndWidthPx;
        let _loc7_: number = param5._SafeStr_14667;
        _loc9_.clear(0);
        if (this.usesSeparateBarEndOverlaySource) {
            _loc6_ = param5._SafeStr_14666 + (param4.width | 0) - this.barEndBaseSourceRightPaddingPx - this.barEndWidthPx;
            _loc9_.drawLayer(param2, -_loc6_, -_loc7_, "normal", 255);
            if (param3.metallic != null) {
                this.drawOverlayEndLayer(_loc9_, param3.metallic, "add", param4);
            }
            for (_loc8_ of valuesOf(param3.overlays)) {
                this.drawOverlayEndLayer(_loc9_, _loc8_.layer, stringOrNull(_loc8_.blendMode), param4);
            }
            return;
        }
        _loc9_.drawLayer(param2, -_loc6_, -_loc7_, "normal", 255);
    }

    private drawOverlayEndLayer(param1: VariableFxBitmapComposer, param2: BitmapData, param3: string, param4: any): void {
        let _loc5_: number = (param4.fillWidth | 0) - this.barEndSourceRightPaddingPx - this.barEndWidthPx;
        param1.drawThreeSlice(param2, Number(this.overlaySlice.leftWidth), Number(this.overlaySlice.rightWidth), Number(param4.fillWidth), -_loc5_, Number(param4.fillY), param3, 255);
    }

    private drawOverlayLayer(param1: VariableFxBitmapComposer, param2: BitmapData, param3: string, param4: number, param5: number, param6: number, param7: any, param8: VariableFxClipRect = null): void {
        let _loc9_: number = 0;
        if (param4 <= 0) {
            return;
        }
        _loc9_ = Math.min(param7.fillWidth | 0, param4) | 0;
        param1.drawThreeSlice(param2, Number(this.overlaySlice.leftWidth), Number(this.overlaySlice.rightWidth), _loc9_, param5 + (param7.fillX | 0), param6 + (param7.fillY | 0), param3, 255, param8);
    }

    private resolveBarBodyClip(param1: number): VariableFxClipRect {
        let _loc2_: number = (this.barBodyIncludesEndWidth ? param1 : Math.max(0, param1 - this.barEndWidthPx)) | 0;
        return new VariableFxClipRect(this._iconLayout._SafeStr_14666 + (this._layout.fillX | 0), this._iconLayout._SafeStr_14667 + (this._layout.fillY | 0), _loc2_, this._layout.fillHeight | 0);
    }

    private shouldDrawBarEnd(param1: number): boolean {
        return param1 >= this.barEndMinimumFillWidthPx;
    }

    private resolveBarEndClip(param1: number): VariableFxClipRect {
        return new VariableFxClipRect(this._iconLayout._SafeStr_14666 + (this._layout.fillX | 0), this._iconLayout._SafeStr_14667 + (this._layout.fillY | 0), this._layout.fillWidth | 0, this._layout.fillHeight | 0);
    }

    private resolveFullFillClip(param1: any, param2: VariableFxIconOverlayLayout): VariableFxClipRect {
        return new VariableFxClipRect(param2._SafeStr_14666 + (param1.fillX | 0), param2._SafeStr_14667 + (param1.fillY | 0), param1.fillWidth | 0, param1.fillHeight | 0);
    }

    protected createTransparentBitmap(param1: number, param2: number): BitmapData {
        return new BitmapData(param1, param2, true, 0);
    }

    private resolveAssets(): any {
        let _loc2_: any = VariableFxColorType.resolvePaintColor(this.context.config.color, this.context.config.extra);
        let _loc1_: any = this.assetNames;
        let _loc4_: BitmapData = this.getLayer(stringOrNull(_loc1_.darkening));
        let _loc3_: BitmapData = this.getLayer(stringOrNull(_loc1_.lighting));
        let _loc5_: boolean = Boolean(_loc2_.isMetallic);
        return { "background": this.getLayer(stringOrNull(_loc1_.background)), "bar": this.getLayer(stringOrNull(_loc1_.bar)), "metallic": (_loc5_ && _loc1_.metallic != null ? this.getLayer(stringOrNull(_loc1_.metallic)) : null), "overlays": (_loc5_ ? this.resolveMetallicOverlays(_loc4_, _loc3_) : this.resolveNormalOverlays(_loc4_, _loc3_)) };
    }

    protected getLayer(param1: string): BitmapData {
        let _loc2_: BitmapData = this.context.assetProvider == null ? null : this.context.assetProvider.getBitmapData(param1);
        if (_loc2_ == null) {
            throw new Error("Missing Variable FX " + this.layerDescription + " layer \'" + param1 + "\'.");
        }
        return _loc2_;
    }

    private resolveLayout(param1: string): any {
        let _loc4_: number = 0;
        let _loc3_: BitmapData = this.context.assetProvider == null ? null : this.context.assetProvider.getBitmapData(stringOrNull(this.assetNames.background));
        let _loc5_: any = this.baseLayoutMetrics;
        let _loc2_: number = this.resolveFrameWidth(param1);
        if (_loc3_ == null) {
            throw new Error("Missing Variable FX " + this.layerDescription + " background layer for layout resolution.");
        }
        _loc4_ = Math.max(1, _loc3_.height - (_loc5_.fillY | 0) * 2) | 0;
        return { "fillHeight": _loc4_, "fillWidth": Math.max(0, _loc2_ - (_loc5_.fillX | 0) * 2), "fillX": _loc5_.fillX | 0, "fillY": _loc5_.fillY | 0, "height": _loc3_.height, "sliceLeftWidth": _loc5_.sliceLeftWidth | 0, "sliceRightWidth": _loc5_.sliceRightWidth | 0, "width": _loc2_ };
    }

    protected resolveIconOverlayLayout(param1: any, param2: VariableFxConfiguredIcon): VariableFxIconOverlayLayout {
        return VariableFxConfiguredIcon.resolveBarIconOverlayLayout(param1.width | 0, param1.height | 0, param2, VariableFxConfiguredIcon.resolveAlignment(this.context), this.iconContentYOffsetPx);
    }
}
