import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { LevelBadgePainter } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelBadgePainter';
import { LevelProgressPathAnimator } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelProgressPathAnimator';
import { LevelProgressPathSample } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelProgressPathSample';
import { LevelWithProgressConfigPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelWithProgressConfigPrebake';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxColorType } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxColorType';
import { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import { VariableFxConfigRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigRendererPrebake';
import { VariableFxFrame } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxFrame';
import { VariableFxRenderer, isVariableFxRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRenderer';
import { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { VariableFxRendererType } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererType';
import { VariableFxStatusData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxStatusData';

export class LevelWithProgressRenderer implements VariableFxRenderer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.level::LevelWithProgressRenderer'); }

    private static readonly FRAME_HEIGHT: number = 21;
    private static readonly PROGRESS_BAR_OVERLAP_WIDTH: number = 3;

    private static readonly _SafeStr_14694: any = { "background": "variablefx_level_with_progress_background", "darkening": "variablefx_level_with_progress_darkening", "darkeningMetallic": "variablefx_level_with_progress_darkening_metallic", "frame": "variablefx_level_with_progress_frame", "lighting": "variablefx_level_with_progress_lighting", "lightingMetallic": "variablefx_level_with_progress_lighting_metallic", "numbers": "variablefx_numbers_large" };

    private _SafeStr_14687: any = null;
    private _badgeRenderKey: string = "";

    declare private _context: VariableFxRendererContext;

    private _frame: VariableFxFrame = new VariableFxFrame();
    private _SafeStr_14689: string = "";
    private _levelProgress: LevelProgressPathAnimator = new LevelProgressPathAnimator();
    private _SafeStr_14690: boolean = false;

    declare private _SafeStr_14682: LevelWithProgressConfigPrebake;

    declare private _SafeStr_14691: VariableFxRenderer;

    declare private _progressRendererConfig: VariableFxConfigData;

    constructor(param1: VariableFxRendererContext) {
        let context: VariableFxRendererContext = param1;
        this._context = context;
        this._SafeStr_14682 = asInstanceOf(VariableFxConfigRendererPrebake.getOrCreate(context.config, (): any => {
             return this.createPrebake(context);
         }), LevelWithProgressConfigPrebake);
        this.initializeProgressRenderer(context);
    }

    public get frame(): VariableFxFrame {
        return this._frame;
    }

    public get isContinuous(): boolean {
        return this._SafeStr_14691 != null && this._SafeStr_14691.isContinuous;
    }

    public updateData(param1: VariableFxRendererContext, param2: number): void {
        this._context = param1;
        this.updateLevelProgressTarget(param1, param2);
        this.updateProgressRendererData(param1, param2);
    }

    public needsUpdate(param1: number): boolean {
        if (this.isConfigPrebakeDisposed()) {
            return false;
        }
        return this._levelProgress.needsUpdate(param1, this.levelProgressPathPixelScale) || this._SafeStr_14691 != null && this._SafeStr_14691.needsUpdate(param1) || this.hasRenderChange();
    }

    public update(param1: number): boolean {
        let _loc2_: boolean = false;
        let _loc3_: boolean = false;
        if (this.isConfigPrebakeDisposed()) {
            return false;
        }
        _loc2_ = this._levelProgress.update(param1);
        if (_loc2_) {
            this.updateProgressRendererData(this._context, param1);
        }
        _loc3_ = this._SafeStr_14691 != null && this._SafeStr_14691.update(param1);
        if (!_loc3_ && !this.hasRenderChange()) {
            return false;
        }
        this.ensureFrameBitmap();
        this.renderFrame();
        this._SafeStr_14689 = this.createRenderedSignature();
        this._frame.updateId++;
        return true;
    }

    public dispose(): void {
        this.disposeCurrentBadgeRender();
        this.disposeProgressRenderer();
        this._frame.disposeBitmap();
    }

    private get levelText(): string {
        return String(this._levelProgress.displayedLevel);
    }

    private get digitCount(): number {
        return Math.max(1, this.levelText.length) | 0;
    }

    private get badgeWidth(): number {
        return this._SafeStr_14682.badgePainter.resolveFrameWidth(this.digitCount);
    }

    private get frameWidth(): number {
        let _loc1_: number = this._SafeStr_14691 == null ? 0 : this._SafeStr_14691.frame.width;
        if (_loc1_ <= 0) {
            return this.badgeWidth;
        }
        return this.progressX + _loc1_;
    }

    private get frameHeight(): number {
        return Math.max(21, this._SafeStr_14691 == null ? 0 : this._SafeStr_14691.frame.height) | 0;
    }

    private get progressX(): number {
        return Math.max(0, this.badgeWidth - 3) | 0;
    }

    private get progressY(): number {
        let _loc1_: number = this._SafeStr_14691 == null ? 0 : this._SafeStr_14691.frame.height;
        if (_loc1_ <= 0) {
            return 0;
        }
        return Math.max(0, (this.frameHeight - _loc1_) / 2 | 0) | 0;
    }

    private get levelProgressPathPixelScale(): number {
        return Math.max(1, this._SafeStr_14691 == null ? this.badgeWidth : this._SafeStr_14691.frame.width);
    }

    private get displayedFrameArgb(): number {
        let _loc1_: any = VariableFxColorType.resolveTargetPaintColor(this._context.config.color, this._context.config.extra, this._levelProgress.displayedProgress, this.createDisplayedLevelStatusExtra());
        return (0xFF000000 | _loc1_.rgb >>> 0) >>> 0;
    }

    private createPrebake(param1: VariableFxRendererContext): LevelWithProgressConfigPrebake {
        let _loc4_: any = VariableFxColorType.resolvePaintColor(param1.config.color, param1.config.extra);
        let _loc2_: any = this.resolveAssets(param1, Boolean(_loc4_.isMetallic));
        let _loc3_: LevelBadgePainter = new LevelBadgePainter(_loc2_, { "height": 21, "width": 21, "x": 0, "y": 0 });
        return new LevelWithProgressConfigPrebake(_loc3_);
    }

    private resolveAssets(param1: VariableFxRendererContext, param2: boolean): any {
        return { "background": this.getLayer(param1, stringOrNull(LevelWithProgressRenderer._SafeStr_14694.background)), "darkening": this.getLayer(param1, stringOrNull(param2 ? LevelWithProgressRenderer._SafeStr_14694.darkeningMetallic : LevelWithProgressRenderer._SafeStr_14694.darkening)), "frame": this.getLayer(param1, stringOrNull(LevelWithProgressRenderer._SafeStr_14694.frame)), "lighting": this.getLayer(param1, stringOrNull(param2 ? LevelWithProgressRenderer._SafeStr_14694.lightingMetallic : LevelWithProgressRenderer._SafeStr_14694.lighting)), "numbers": this.getLayer(param1, stringOrNull(LevelWithProgressRenderer._SafeStr_14694.numbers)) };
    }

    private getLayer(param1: VariableFxRendererContext, param2: string): BitmapData {
        let _loc3_: BitmapData = param1.assetProvider == null ? null : param1.assetProvider.getBitmapData(param2);
        if (_loc3_ == null) {
            throw new Error("Missing Variable FX level with progress layer \'" + param2 + "\'.");
        }
        return _loc3_;
    }

    private ensureFrameBitmap(): void {
        let _loc1_: BitmapData = null;
        if (this._frame.bitmapData != null && this._frame.width == this.frameWidth && this._frame.height == this.frameHeight) {
            return;
        }
        this._frame.disposeBitmap();
        _loc1_ = new BitmapData(this.frameWidth, this.frameHeight, true, 0);
        this._frame.bitmapData = _loc1_;
        this._frame._SafeStr_14661 = null;
        this._frame.width = _loc1_.width;
        this._frame.height = _loc1_.height;
        this._SafeStr_14689 = "";
    }

    private renderFrame(): void {
        let _loc3_: VariableFxBitmapComposer = null;
        let _loc4_: BitmapData = null;
        let _loc1_: any = null;
        let _loc2_: BitmapData = this._frame.bitmapData;
        if (_loc2_ == null) {
            return;
        }
        _loc2_.lock();
        try {
            _loc3_ = new VariableFxBitmapComposer(_loc2_);
            _loc4_ = this._SafeStr_14691 == null ? null : this._SafeStr_14691.frame.bitmapData;
            _loc1_ = this.getCurrentBadgeRender();
            _loc3_.clear(0);
            if (_loc4_ != null) {
                _loc3_.drawLayer(_loc4_, this.progressX, this.progressY, "normal", 255);
            }
            this._SafeStr_14682.badgePainter.drawBadge(_loc3_, _loc1_, this.levelText, 0, 0);
        } finally {
            _loc2_.unlock();
        }
    }

    private getCurrentBadgeRender(): any {
        let _loc1_: string = this.digitCount + ":" + String(this.displayedFrameArgb);
        if (this._SafeStr_14687 != null && this._badgeRenderKey == _loc1_) {
            return this._SafeStr_14687;
        }
        this.disposeCurrentBadgeRender();
        this._SafeStr_14687 = this._SafeStr_14682.badgePainter.createBadgeRender(this.digitCount, this.displayedFrameArgb);
        this._badgeRenderKey = _loc1_;
        return this._SafeStr_14687;
    }

    private disposeCurrentBadgeRender(): void {
        if (this._SafeStr_14682 != null && this._SafeStr_14682.badgePainter != null) {
            this._SafeStr_14682.badgePainter.disposeBadgeRender(this._SafeStr_14687);
        }
        this._SafeStr_14687 = null;
        this._badgeRenderKey = "";
    }

    private createRenderedSignature(): string {
        return this.frameWidth + "x" + this.frameHeight + ":" + this._levelProgress.displayedLevel + ":" + this.displayedFrameArgb;
    }

    private hasRenderChange(): boolean {
        return this._frame.bitmapData == null || this._frame.width != this.frameWidth || this._frame.height != this.frameHeight || this.createRenderedSignature() != this._SafeStr_14689;
    }

    private isConfigPrebakeDisposed(): boolean {
        return this._SafeStr_14682 == null || this._SafeStr_14682.disposed;
    }

    private initializeProgressRenderer(param1: VariableFxRendererContext): void {
        let factory: (...args: any[]) => any;
        let context: VariableFxRendererContext = param1;
        let subRendererId: any = this.resolveSubRendererId(context);
        let renderer: string = subRendererId == null ? null : VariableFxRendererType.resolveById(subRendererId | 0);
        if (subRendererId == null || renderer == null || renderer == context.config.renderer) {
            return;
        }
        factory = this.resolveSubRendererFactory(context, subRendererId | 0, renderer);
        if (factory == null) {
            return;
        }
        this._progressRendererConfig = this._SafeStr_14682.getOrCreateProgressRendererConfig((): any => {
             return this.createProgressRendererConfig(context, subRendererId | 0, renderer);
         });
        this._SafeStr_14691 = asGuarded(factory(this.createProgressRendererContext(context)), isVariableFxRenderer);
    }

    private updateProgressRendererData(param1: VariableFxRendererContext, param2: number): void {
        if (this._SafeStr_14691 != null) {
            this._SafeStr_14691.updateData(this.createProgressRendererContext(param1), param2);
        }
    }

    private resolveSubRendererId(param1: VariableFxRendererContext): any {
        let _loc2_: number = NaN;
        let _loc3_: string = VariableFxColorType.readExtra(param1.config.extra, "sub_renderer");
        if (_loc3_ == null || _loc3_.length == 0) {
            return null;
        }
        _loc2_ = Number(_loc3_);
        return isFinite(_loc2_) ? _loc2_ | 0 : null;
    }

    private resolveSubRendererFactory(param1: VariableFxRendererContext, param2: number, param3: string): (...args: any[]) => any {
        if (param1._SafeStr_14644 == null) {
            return null;
        }
        return param1._SafeStr_14644.resolveByServerRenderer(param2) || param1._SafeStr_14644.resolve("progress_bar", param3);
    }

    private createProgressRendererConfig(param1: VariableFxRendererContext, param2: number, param3: string): VariableFxConfigData {
        let _loc4_: string = param1.config.color == "DYNAMIC_LEVELLING" ? "DYNAMIC_DELEGATED" : param1.config.color;
        return new VariableFxConfigData("progress_bar", param3, param3, param1.config.width, _loc4_, 0, 1, param1.config.extra, param1.config.categoryId, param1.config._SafeStr_14474, param2);
    }

    private createProgressRendererContext(param1: VariableFxRendererContext): VariableFxRendererContext {
        let _loc2_: number = this._levelProgress.displayedProgress;
        return new VariableFxRendererContext(param1.assetProvider, this._progressRendererConfig, new VariableFxStatusData(_loc2_, null, null, this.createProgressRendererStatusExtra(this._progressRendererConfig), true), 0, 1, _loc2_, param1._SafeStr_14644);
    }

    private disposeProgressRenderer(): void {
        if (this._SafeStr_14691 != null) {
            this._SafeStr_14691.dispose();
            this._SafeStr_14691 = null;
        }
        this._progressRendererConfig = null;
    }

    private updateLevelProgressTarget(param1: VariableFxRendererContext, param2: number): void {
        let _loc3_: LevelProgressPathSample = this.resolveLevelProgressSample(param1);
        if (!this._SafeStr_14690 || param1.status.isInitialize) {
            this._levelProgress.snapTo(_loc3_, param2);
            this._SafeStr_14690 = true;
            return;
        }
        this._levelProgress.setTarget(_loc3_, param2);
    }

    private resolveLevelProgressSample(param1: VariableFxRendererContext): LevelProgressPathSample {
        let _loc3_: number = Number(VariableFxColorType.readExtra(param1.status.extra, "current_level"));
        let _loc2_: number = Number(VariableFxColorType.readExtra(param1.status.extra, "max_level"));
        let _loc5_: boolean = VariableFxColorType.readExtra(param1.status.extra, "is_maxed").toLowerCase() == "true";
        let _loc4_: number = LevelProgressPathAnimator.resolveLevelProgressSampleProgress(param1.progress, param1.status.value, param1.effectiveMinValue, param1.effectiveMaxValue, _loc5_);
        return new LevelProgressPathSample(_loc3_, _loc4_, _loc5_, isFinite(_loc2_) ? _loc2_ : null);
    }

    private createDisplayedLevelStatusExtra(): UtilsMap {
        let _loc1_: string = null;
        let _loc2_: UtilsMap = new UtilsMap();
        _loc2_["max_level"] = VariableFxColorType.readExtra(this._context.status.extra, "max_level");
        _loc2_["is_maxed"] = VariableFxColorType.readExtra(this._context.status.extra, "is_maxed");
        _loc2_["current_level"] = String(this._levelProgress.displayedLevel);
        _loc1_ = VariableFxColorType.readExtra(this._context.status.extra, "delegated_color");
        if (_loc1_ != null) {
            _loc2_["delegated_color"] = _loc1_;
        }
        return _loc2_;
    }

    private createProgressRendererStatusExtra(param1: VariableFxConfigData): UtilsMap {
        let _loc2_: string = null;
        let _loc3_: UtilsMap = new UtilsMap();
        if (param1.color != "DYNAMIC_DELEGATED") {
            _loc2_ = param1.color == "DYNAMIC_TEAM_COLOR" ? VariableFxColorType.readExtra(this._context.status.extra, "delegated_color") : null;
            if (_loc2_ != null) {
                _loc3_["delegated_color"] = _loc2_;
            }
            return _loc3_;
        }
        _loc3_["delegated_color"] = this.formatRgbHex((this.displayedFrameArgb & 0xFFFFFF) >>> 0);
        return _loc3_;
    }

    private formatRgbHex(param1: number): string {
        let _loc2_: string = (param1 & 0xFFFFFF).toString(16);
        while (_loc2_.length < 6) {
            _loc2_ = "0" + _loc2_;
        }
        return "#" + _loc2_;
    }

    get [VariableFxRenderer](): true {
        return true;
    }
}
