import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { _SafeCls_6075 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6075';
import { _SafeCls_6080 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6080';
import { BarVariableFxRendererBase } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/BarVariableFxRendererBase';
import { VariableFxBarSliceUtils } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/VariableFxBarSliceUtils';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxClipRect';
import { VariableFxColorUtils } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxColorUtils';
import { VariableFxConfiguredIcon } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxConfiguredIcon';
import { VariableFxIconOverlayLayout } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxIconOverlayLayout';
import { VariableFxGenericRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxGenericRendererPrebake';

export class StripedProgressBarRenderer extends BarVariableFxRendererBase {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::StripedProgressBarRenderer'); }

    private static readonly FRAME_HEIGHT: number = 13;
    private static readonly CHROME_EDGE_WIDTH: number = 3;
    private static readonly FILL_Y: number = 3;
    private static readonly FILL_HEIGHT: number = 7;
    private static readonly FILL_OVERLAY_SLICE_WIDTH: number = 3;
    private static readonly LIGHTING_SLICE_LEFT_WIDTH: number = 9;
    private static readonly BAR_END_WIDTH: number = 2;
    private static readonly BAR_END_MINIMUM_FILL_WIDTH: number = 4;
    private static readonly STRIPE_PERIOD_PX: number = 10;
    private static readonly STRIPE_STEP_MS: number = 70;
    private static readonly STRIPE_VALUE_SCALE: number = 0.5;

    private static readonly STRIPED_PROGRESS_BAR_ASSETS: any = { "background": "variablefx_striped_bar_background", "bar": "variablefx_striped_bar_fill", "darkening": "variablefx_striped_bar_darkening", "darkeningMetallic": "variablefx_striped_bar_darkening_metallic", "lighting": "variablefx_striped_bar_lighting", "lightingMetallic": "variablefx_striped_bar_lighting_metallic", "metallic": "variablefx_striped_bar_metallic", "stripe": "variablefx_striped_bar_stripe" };

    declare private _assets: any;

    declare private _SafeStr_14520: BitmapData;

    declare private _barCache: BitmapData;

    private _SafeStr_14521: number = -1;

    declare private _barEndCache: BitmapData;

    declare private _SafeStr_14532: BitmapData;

    declare private _SafeStr_14522: BitmapData;

    declare private _SafeStr_14538: BitmapData;

    declare private _SafeStr_14523: BitmapData;

    declare private _iconLayout: VariableFxIconOverlayLayout;

    private _SafeStr_14539: number = -1;

    declare private _layout: any;

    declare private _overlays: any[];

    declare private _stripesOverlayCache: BitmapData;

    private _SafeStr_14540: number = -1;

    declare private _SafeStr_14541: BitmapData;

    declare private _SafeStr_14542: BitmapData;

    constructor(param1: VariableFxRendererContext) {
        let prebake: VariableFxGenericRendererPrebake;
        let data: any;
        let context: VariableFxRendererContext = param1;
        super(context);
        prebake = asInstanceOf(_SafeCls_6075.getOrCreate(context.config, (): any => {
             return this.createPrebake(context);
         }), VariableFxGenericRendererPrebake);
        data = prebake.data;
        this._assets = data.assets;
        this._SafeStr_14520 = data.backgroundPrebake;
        this._SafeStr_14532 = data.barEndPrebake;
        this._SafeStr_14522 = data.barPrebake;
        this._SafeStr_14538 = data.barShapePrebake;
        this._SafeStr_14523 = data.foregroundPrebake instanceof BitmapData ? data.foregroundPrebake : null;
        this._iconLayout = data.iconLayout instanceof VariableFxIconOverlayLayout ? data.iconLayout : null;
        this._layout = data.layout;
        this._overlays = Array.isArray(data.overlays) ? data.overlays : null;
        this._SafeStr_14541 = data.stripesOverlayPrebake;
        this._SafeStr_14542 = data.stripesOverlayShapePrebake;
        if (this._SafeStr_14522 == null) {
            this._barCache = this.createTransparentBitmap(this._iconLayout.frameWidth, this._iconLayout.frameHeight);
            this._barEndCache = this.createTransparentBitmap(2, this._iconLayout.frameHeight);
        }
        if (this._SafeStr_14541 == null) {
            this._stripesOverlayCache = this.createTransparentBitmap(this._SafeStr_14542.width, this._SafeStr_14542.height);
        }
    }

    public static resolveStripedProgressBarFrameWidth(param1: string): number {
        switch (param1) {
            case "extra_small":
                return 29;
            case "small":
                return 37;
            case "medium":
                return 53;
            case "large":
                return 69;
            case "extra_large":
                return 85;
            default:
                return 53;
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

    public override get isContinuous(): boolean {
        return this.calculateFilledPixelWidth() > 0;
    }

    protected override createFrameBitmap(param1: number, param2: number): BitmapData {
        return this.createTransparentBitmap(param1, param2);
    }

    protected override renderFrame(param1: number): void {
        let _loc5_: VariableFxBitmapComposer = null;
        let _loc3_: number = 0;
        let _loc2_: VariableFxClipRect = null;
        let _loc4_: BitmapData = this.mutableFrame.bitmapData;
        if (_loc4_ == null) {
            return;
        }
        _loc4_.lock();
        try {
            _loc5_ = new VariableFxBitmapComposer(_loc4_);
            _loc3_ = this.calculateFilledPixelWidth();
            _loc5_.drawLayer(this._SafeStr_14520, 0, 0, "normal", 255);
            if (_loc3_ > 0) {
                _loc2_ = this.createFillClip(_loc3_);
                _loc5_.drawLayer(this.resolveBarPrebakeOrCache(), 0, 0, "normal", 255, _loc2_);
                if (this.shouldDrawBarEnd(_loc3_)) {
                    _loc5_.drawLayer(this.resolveBarEndPrebakeOrCache(), this._iconLayout._SafeStr_14524 + (this._layout.fillX | 0) + _loc3_ - 2, 0, "normal", 255, this.createFillClip(this._layout.fillWidth | 0));
                }
                _loc5_.drawLayer(this.resolveStripesOverlayPrebakeOrCache(), this.resolveStripeLayerX(param1), 0, "multiply", 255, _loc2_);
            }
            if (this._SafeStr_14523 != null) {
                _loc5_.drawLayer(this._SafeStr_14523, 0, 0, "normal", 255);
            }
        } finally {
            _loc4_.unlock();
        }
    }

    protected override hasRendererSpecificRenderChange(param1: number): boolean {
        return this.calculateFilledPixelWidth() > 0 && this.resolveStripePhase(param1) != this._SafeStr_14539;
    }

    protected override didRenderFrame(param1: number): void {
        this._SafeStr_14539 = this.resolveStripePhase(param1);
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
        if (this._stripesOverlayCache != null) {
            this._stripesOverlayCache.dispose();
            this._stripesOverlayCache = null;
        }
    }

    private createPrebake(param1: VariableFxRendererContext): VariableFxGenericRendererPrebake {
        let context: VariableFxRendererContext = param1;
        let layout: any = this.resolveLayout(context.config.width);
        let assets: any = this.resolveAssets();
        let icon: VariableFxConfiguredIcon = VariableFxConfiguredIcon.resolve(context);
        let iconLayout: VariableFxIconOverlayLayout = this.resolveIconOverlayLayout(layout, icon);
        let paintColor: any = _SafeCls_6080.resolvePaintColor(context.config.color, context.config.extra);
        let overlays: any[] = this.resolveOverlays(assets);
        let isDynamicPaint: boolean = _SafeCls_6080.isDynamicPaintColor(context.config.color);
        let backgroundPrebake: BitmapData = this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        let barShapePrebake: BitmapData = this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        let foregroundPrebake: BitmapData = iconLayout.hasIcon ? this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight) : null;
        let stripesOverlayShapePrebake: BitmapData = this.createTransparentBitmap(iconLayout.frameWidth + 10 + assets.stripe.width | 0, iconLayout.frameHeight);
        let barPrebake: BitmapData = isDynamicPaint ? null : this.createTransparentBitmap(iconLayout.frameWidth, iconLayout.frameHeight);
        let barEndPrebake: BitmapData = isDynamicPaint ? null : this.createTransparentBitmap(2, iconLayout.frameHeight);
        let stripesOverlayPrebake: BitmapData = isDynamicPaint ? null : this.createTransparentBitmap(stripesOverlayShapePrebake.width, stripesOverlayShapePrebake.height);
        this.prebakeBackground(backgroundPrebake, assets, layout, iconLayout);
        this.prebakeBarShape(barShapePrebake, assets, layout, iconLayout);
        this.prebakeForeground(foregroundPrebake, icon, iconLayout);
        this.prebakeStripesOverlayShape(stripesOverlayShapePrebake, assets, layout, iconLayout);
        if (barPrebake != null && barEndPrebake != null && stripesOverlayPrebake != null) {
            this.drawBarBitmap(barPrebake, barEndPrebake, (0xFF000000 | paintColor.rgb >>> 0) >>> 0, barShapePrebake, assets, overlays, layout, iconLayout);
            this.drawStripesOverlayBitmap(stripesOverlayPrebake, (0xFF000000 | this.resolveStripeRgb(paintColor.rgb >>> 0)) >>> 0, stripesOverlayShapePrebake);
        }
        return new VariableFxGenericRendererPrebake({ "assets": assets, "backgroundPrebake": backgroundPrebake, "barEndPrebake": barEndPrebake, "barPrebake": barPrebake, "barShapePrebake": barShapePrebake, "foregroundPrebake": foregroundPrebake, "iconLayout": iconLayout, "layout": layout, "overlays": overlays, "stripesOverlayPrebake": stripesOverlayPrebake, "stripesOverlayShapePrebake": stripesOverlayShapePrebake }, (): void => {
             backgroundPrebake.dispose();
             barShapePrebake.dispose();
             stripesOverlayShapePrebake.dispose();
             if (barPrebake != null) {
                 barPrebake.dispose();
             }
             if (barEndPrebake != null) {
                 barEndPrebake.dispose();
             }
             if (foregroundPrebake != null) {
                 foregroundPrebake.dispose();
             }
             if (stripesOverlayPrebake != null) {
                 stripesOverlayPrebake.dispose();
             }
         });
    }

    private prebakeBackground(param1: BitmapData, param2: any, param3: any, param4: VariableFxIconOverlayLayout): void {
        let _loc5_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc5_ = new VariableFxBitmapComposer(param1);
            _loc5_.clear(0);
            _loc5_.drawThreeSlice(param2.background, VariableFxBarSliceUtils.resolveBackgroundSliceLeftWidth(param3), VariableFxBarSliceUtils.resolveBackgroundSliceRightWidth(param3), Number(param3.width), param4._SafeStr_14524, param4._SafeStr_14525, "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private prebakeBarShape(param1: BitmapData, param2: any, param3: any, param4: VariableFxIconOverlayLayout): void {
        let _loc5_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc5_ = new VariableFxBitmapComposer(param1);
            _loc5_.clear(0);
            _loc5_.drawThreeSlice(param2.bar, Number(param3.sliceLeftWidth), Number(param3.sliceRightWidth), Number(param3.fillWidth), param4._SafeStr_14524 + (param3.fillX | 0), param4._SafeStr_14525 + (param3.fillY | 0), "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private prebakeForeground(param1: BitmapData, param2: VariableFxConfiguredIcon, param3: VariableFxIconOverlayLayout): void {
        let _loc4_: VariableFxBitmapComposer = null;
        if (param1 == null || param2 == null) {
            return;
        }
        param1.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(param1);
            _loc4_.clear(0);
            _loc4_.drawLayer(param2.bitmapData, param3._SafeStr_14526, param3._SafeStr_14527, "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private prebakeStripesOverlayShape(param1: BitmapData, param2: any, param3: any, param4: VariableFxIconOverlayLayout): void {
        let _loc6_: VariableFxBitmapComposer = null;
        let _loc5_: number = 0;
        param1.lock();
        try {
            _loc6_ = new VariableFxBitmapComposer(param1);
            _loc6_.clear(0);
            _loc5_ = 0;
            while (_loc5_ <= (param3.fillWidth | 0) + 10) {
                _loc6_.drawLayer(param2.stripe, param4._SafeStr_14524 + (param3.fillX | 0) + _loc5_, param4._SafeStr_14525 + (param3.fillY | 0), "normal", 255);
                _loc5_ += 10;
            }
        } finally {
            param1.unlock();
        }
    }

    private resolveBarPrebakeOrCache(): BitmapData {
        if (this._SafeStr_14522 != null) {
            return this._SafeStr_14522;
        }
        this.resolveDynamicBarCaches();
        return this._barCache;
    }

    private resolveBarEndPrebakeOrCache(): BitmapData {
        if (this._SafeStr_14532 != null) {
            return this._SafeStr_14532;
        }
        this.resolveDynamicBarCaches();
        return this._barEndCache;
    }

    private resolveStripesOverlayPrebakeOrCache(): BitmapData {
        let _loc1_: any = 0;
        if (this._SafeStr_14541 != null) {
            return this._SafeStr_14541;
        }
        _loc1_ = (0xFF000000 | this.resolveStripeRgb((this.displayedFillArgb & 0xFFFFFF) >>> 0)) >>> 0;
        if (this._SafeStr_14540 != (_loc1_ | 0)) {
            this._SafeStr_14540 = _loc1_ | 0;
            this.drawStripesOverlayBitmap(this._stripesOverlayCache, _loc1_ >>> 0, this._SafeStr_14542);
        }
        return this._stripesOverlayCache;
    }

    private resolveDynamicBarCaches(): void {
        let _loc1_: number = this.displayedFillArgb;
        if (this._SafeStr_14521 == (_loc1_ | 0)) {
            return;
        }
        this._SafeStr_14521 = _loc1_ | 0;
        this.drawBarBitmap(this._barCache, this._barEndCache, _loc1_, this._SafeStr_14538, this._assets, this._overlays, this._layout, this._iconLayout);
    }

    private drawBarBitmap(param1: BitmapData, param2: BitmapData, param3: number, param4: BitmapData, param5: any, param6: any[], param7: any, param8: VariableFxIconOverlayLayout): void {
        let _loc10_: VariableFxBitmapComposer = null;
        let _loc9_: any = null;
        param1.lock();
        param2.lock();
        try {
            _loc10_ = new VariableFxBitmapComposer(param1);
            _loc10_.clear(0);
            _loc10_.drawTintedLayer(param4, 0, 0, param3, "normal", 255);
            if (param5.metallic != null) {
                this.drawFullFillLayer(_loc10_, param5.metallic, "add", param7, param8, 9, 3);
            }
            for (_loc9_ of param6 ?? []) {
                this.drawFullFillLayer(_loc10_, _loc9_.layer, stringOrNull(_loc9_.blendMode), param7, param8, _loc9_.sliceLeftWidth | 0, _loc9_.sliceRightWidth | 0);
            }
            this.drawBarEndBitmap(param2, param1, param7, param8);
        } finally {
            param2.unlock();
            param1.unlock();
        }
    }

    private drawStripesOverlayBitmap(param1: BitmapData, param2: number, param3: BitmapData): void {
        let _loc4_: VariableFxBitmapComposer = null;
        param1.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(param1);
            _loc4_.clear(0);
            _loc4_.drawTintedLayer(param3, 0, 0, param2, "normal", 255);
        } finally {
            param1.unlock();
        }
    }

    private drawBarEndBitmap(param1: BitmapData, param2: BitmapData, param3: any, param4: VariableFxIconOverlayLayout): void {
        let _loc5_: VariableFxBitmapComposer = new VariableFxBitmapComposer(param1);
        _loc5_.clear(0);
        _loc5_.drawLayer(param2, -(param4._SafeStr_14524 + (param3.fillX | 0) + (param3.fillWidth | 0) - 2), 0, "normal", 255);
    }

    private drawFullFillLayer(param1: VariableFxBitmapComposer, param2: BitmapData, param3: string, param4: any, param5: VariableFxIconOverlayLayout, param6: number, param7: number): void {
        param1.drawRepeatedThreeSlice(param2, param6, param7, Number(param4.fillWidth), param5._SafeStr_14524 + (param4.fillX | 0), param5._SafeStr_14525 + (param4.fillY | 0), param3, 255);
    }

    private createFillClip(param1: number, param2: any = null, param3: VariableFxIconOverlayLayout = null): VariableFxClipRect {
        param2 = param2 == null ? this._layout : param2;
        param3 = param3 == null ? this._iconLayout : param3;
        return new VariableFxClipRect(param3._SafeStr_14524 + (param2.fillX | 0), param3._SafeStr_14525 + (param2.fillY | 0), param1, param2.fillHeight | 0);
    }

    private shouldDrawBarEnd(param1: number): boolean {
        return param1 >= 4;
    }

    private resolveStripeLayerX(param1: number): number {
        return this.resolveStripePhase(param1) - 10;
    }

    private resolveStripePhase(param1: number): number {
        if (param1 <= 0) {
            return 0;
        }
        return (param1 / 70 | 0) % 10;
    }

    private resolveStripeRgb(param1: number): number {
        return VariableFxColorUtils.scaleRgbValueInHsv(param1, 0.5);
    }

    private resolveAssets(): any {
        let _loc1_: any = _SafeCls_6080.resolvePaintColor(this.context.config.color, this.context.config.extra);
        let _loc2_: boolean = Boolean(_loc1_.isMetallic);
        return { "background": this.getLayer(stringOrNull(StripedProgressBarRenderer.STRIPED_PROGRESS_BAR_ASSETS.background)), "bar": this.getLayer(stringOrNull(StripedProgressBarRenderer.STRIPED_PROGRESS_BAR_ASSETS.bar)), "darkening": (_loc2_ ? this.getLayer(stringOrNull(StripedProgressBarRenderer.STRIPED_PROGRESS_BAR_ASSETS.darkeningMetallic)) : this.getLayer(stringOrNull(StripedProgressBarRenderer.STRIPED_PROGRESS_BAR_ASSETS.darkening))), "lighting": (_loc2_ ? this.getLayer(stringOrNull(StripedProgressBarRenderer.STRIPED_PROGRESS_BAR_ASSETS.lightingMetallic)) : this.getLayer(stringOrNull(StripedProgressBarRenderer.STRIPED_PROGRESS_BAR_ASSETS.lighting))), "metallic": (_loc2_ ? this.getLayer(stringOrNull(StripedProgressBarRenderer.STRIPED_PROGRESS_BAR_ASSETS.metallic)) : null), "stripe": this.getLayer(stringOrNull(StripedProgressBarRenderer.STRIPED_PROGRESS_BAR_ASSETS.stripe)) };
    }

    private resolveOverlays(param1: any): any[] {
        return [{ "blendMode": "multiply", "layer": param1.darkening, "sliceLeftWidth": 3, "sliceRightWidth": 3 }, { "blendMode": "add", "layer": param1.lighting, "sliceLeftWidth": 9, "sliceRightWidth": 3 }];
    }

    private getLayer(param1: string): BitmapData {
        let _loc2_: BitmapData = this.context.assetProvider == null ? null : this.context.assetProvider.getBitmapData(param1);
        if (_loc2_ == null) {
            throw new Error("Missing Variable FX striped progress bar layer \'" + param1 + "\'.");
        }
        return _loc2_;
    }

    private resolveLayout(param1: string): any {
        let _loc2_: number = StripedProgressBarRenderer.resolveStripedProgressBarFrameWidth(param1);
        return { "fillHeight": 7, "fillWidth": Math.max(0, _loc2_ - 3 * 2), "fillX": 3, "fillY": 3, "height": 13, "sliceLeftWidth": 3, "sliceRightWidth": 3, "width": _loc2_ };
    }

    private resolveIconOverlayLayout(param1: any, param2: VariableFxConfiguredIcon): VariableFxIconOverlayLayout {
        return VariableFxConfiguredIcon.resolveBarIconOverlayLayout(param1.width | 0, param1.height | 0, param2, VariableFxConfiguredIcon.resolveAlignment(this.context));
    }

    private createTransparentBitmap(param1: number, param2: number): BitmapData {
        return new BitmapData(param1, param2, true, 0);
    }
}
