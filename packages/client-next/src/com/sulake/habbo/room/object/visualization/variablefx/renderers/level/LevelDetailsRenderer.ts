import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { _SafeCls_6075 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6075';
import { _SafeCls_6080 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6080';
import { ClassicMiniProgressBarRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/bar/ClassicMiniProgressBarRenderer';
import { LevelBadgePainter } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelBadgePainter';
import { LevelDetailsConfigPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelDetailsConfigPrebake';
import { LevelDetailsNumberPainter } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelDetailsNumberPainter';
import { LevelDetailsNumberProgress } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelDetailsNumberProgress';
import { LevelProgressPathAnimator } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelProgressPathAnimator';
import { LevelProgressPathSample } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/level/LevelProgressPathSample';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import { VariableFxFrame } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxFrame';
import { VariableFxRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRenderer';
import { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { VariableFxStatusData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxStatusData';

export class LevelDetailsRenderer implements VariableFxRenderer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.level::LevelDetailsRenderer'); }

    public static readonly BADGE_X: number = 5;
    public static readonly BADGE_Y: number = 4;
    public static readonly BADGE_SOURCE_WIDTH: number = 21;
    public static readonly BADGE_SOURCE_HEIGHT: number = 21;
    public static readonly BAR_SPACING_X: number = 3;
    public static readonly BAR_Y: number = 19;
    public static readonly NUMBER_Y: number = 7;
    public static readonly _SafeStr_14562: number = 6;
    public static readonly FRAME_HEIGHT: number = 29;
    public static readonly BACKGROUND_SLICE_LEFT_WIDTH: number = 29;
    public static readonly BACKGROUND_SLICE_RIGHT_WIDTH: number = 6;

    private static readonly LEVEL_DETAILS_ASSETS: any = { "background": "variablefx_level_details_background", "darkening": "variablefx_level_details_darkening", "darkeningMetallic": "variablefx_level_details_darkening_metallic", "frame": "variablefx_level_details_frame", "lighting": "variablefx_level_details_lighting", "lightingMetallic": "variablefx_level_details_lighting_metallic", "numbers": "variablefx_numbers_large", "smallNumbers": "variablefx_numbers_small" };

    private _SafeStr_14563: any = null;
    private _badgeRenderKey: string = "";

    declare private _context: VariableFxRendererContext;

    private _frame: VariableFxFrame = new VariableFxFrame();
    private _SafeStr_14564: number = 0;
    private _lastRenderedNumberKey: string = "";
    private _SafeStr_14551: string = "";
    private _levelProgress: LevelProgressPathAnimator = new LevelProgressPathAnimator();
    private _SafeStr_14565: boolean = false;
    private _numberProgress: LevelDetailsNumberProgress = new LevelDetailsNumberProgress();

    declare private _SafeStr_14537: LevelDetailsConfigPrebake;

    declare private _SafeStr_14566: ClassicMiniProgressBarRenderer;

    declare private _progressRendererConfig: VariableFxConfigData;

    constructor(param1: VariableFxRendererContext) {
        let context: VariableFxRendererContext = param1;
        this._context = context;
        this._SafeStr_14537 = asInstanceOf(_SafeCls_6075.getOrCreate(context.config, (): any => {
             return this.createPrebake(context);
         }), LevelDetailsConfigPrebake);
        this._progressRendererConfig = this._SafeStr_14537.getOrCreateProgressRendererConfig((): any => {
             return this.createProgressRendererConfig(context);
         });
        this._SafeStr_14566 = new ClassicMiniProgressBarRenderer(this.createProgressRendererContext(context));
    }

    public get frame(): VariableFxFrame {
        return this._frame;
    }

    public get isContinuous(): boolean {
        return this._SafeStr_14566.isContinuous;
    }

    public updateData(param1: VariableFxRendererContext, param2: number): void {
        let _loc3_: LevelProgressPathSample = null;
        this._context = param1;
        _loc3_ = this.resolveLevelProgressSample(param1);
        this.updateLevelProgressTarget(param1, _loc3_, param2);
        this.updateNumberProgressTarget(param1, _loc3_);
        this.updateProgressRendererData(param1, param2);
    }

    public needsUpdate(param1: number): boolean {
        if (this.isConfigPrebakeDisposed()) {
            return false;
        }
        return this._levelProgress.needsUpdate(param1, this.levelProgressPathPixelScale) || this._SafeStr_14566.needsUpdate(param1) || this.hasRenderChange() || this.hasFinalNumberRenderChange();
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
        _loc3_ = this._SafeStr_14566.update(param1);
        if (!_loc3_ && !this.hasRenderChange() && !this.hasFinalNumberRenderChange()) {
            return false;
        }
        this.ensureFrameBitmap();
        this.renderFrame();
        this._SafeStr_14551 = this.createRenderedSignature();
        this._frame.updateId++;
        return true;
    }

    public dispose(): void {
        this.disposeCurrentBadgeRender();
        this._SafeStr_14566.dispose();
        this._frame.disposeBitmap();
    }

    private get levelText(): string {
        return String(this._levelProgress.displayedLevel);
    }

    private get digitCount(): number {
        return Math.max(1, this.levelText.length) | 0;
    }

    private get badgeWidth(): number {
        return this._SafeStr_14537.badgePainter.resolveFrameWidth(this.digitCount);
    }

    private get progressX(): number {
        return 5 + this.badgeWidth + 3;
    }

    private get progressFrameWidth(): number {
        return this._SafeStr_14566.frame.width > 0 ? this._SafeStr_14566.frame.width : this.resolveClassicProgressBarFrameWidth(this._context.config.width);
    }

    private get frameWidth(): number {
        return this.progressX + this.progressFrameWidth + 6;
    }

    private get frameHeight(): number {
        return 29;
    }

    private get levelProgressPathPixelScale(): number {
        return Math.max(1, this.progressFrameWidth);
    }

    private get displayedFrameArgb(): number {
        let _loc1_: any = _SafeCls_6080.resolveTargetPaintColor(this._context.config.color, this._context.config.extra, this._levelProgress.displayedProgress, this.createDisplayedLevelStatusExtra());
        return (0xFF000000 | _loc1_.rgb >>> 0) >>> 0;
    }

    private createPrebake(param1: VariableFxRendererContext): LevelDetailsConfigPrebake {
        let _loc6_: any = _SafeCls_6080.resolvePaintColor(param1.config.color, param1.config.extra);
        let _loc2_: any = this.resolveBadgeAssets(Boolean(_loc6_.isMetallic));
        let _loc4_: BitmapData = this.getLayer(stringOrNull(LevelDetailsRenderer.LEVEL_DETAILS_ASSETS.background));
        let _loc3_: LevelBadgePainter = new LevelBadgePainter(_loc2_, { "height": 21, "width": 21, "x": 5, "y": 4 });
        let _loc5_: LevelDetailsNumberPainter = new LevelDetailsNumberPainter(this.getLayer(stringOrNull(LevelDetailsRenderer.LEVEL_DETAILS_ASSETS.smallNumbers)));
        return new LevelDetailsConfigPrebake(_loc4_, _loc3_, _loc5_);
    }

    private resolveBadgeAssets(param1: boolean): any {
        return { "background": null, "darkening": this.getLayer(stringOrNull(param1 ? LevelDetailsRenderer.LEVEL_DETAILS_ASSETS.darkeningMetallic : LevelDetailsRenderer.LEVEL_DETAILS_ASSETS.darkening)), "frame": this.getLayer(stringOrNull(LevelDetailsRenderer.LEVEL_DETAILS_ASSETS.frame)), "lighting": this.getLayer(stringOrNull(param1 ? LevelDetailsRenderer.LEVEL_DETAILS_ASSETS.lightingMetallic : LevelDetailsRenderer.LEVEL_DETAILS_ASSETS.lighting)), "numbers": this.getLayer(stringOrNull(LevelDetailsRenderer.LEVEL_DETAILS_ASSETS.numbers)) };
    }

    private getLayer(param1: string): BitmapData {
        let _loc2_: BitmapData = this._context.assetProvider == null ? null : this._context.assetProvider.getBitmapData(param1);
        if (_loc2_ == null) {
            throw new Error("Missing Variable FX level details layer \'" + param1 + "\'.");
        }
        return _loc2_;
    }

    private ensureFrameBitmap(): void {
        let _loc1_: BitmapData = null;
        if (this._frame.bitmapData != null && this._frame.width == this.frameWidth && this._frame.height == this.frameHeight) {
            return;
        }
        this._frame.disposeBitmap();
        _loc1_ = new BitmapData(this.frameWidth, this.frameHeight, true, 0);
        this._frame.bitmapData = _loc1_;
        this._frame._SafeStr_14484 = null;
        this._frame.width = _loc1_.width;
        this._frame.height = _loc1_.height;
        this._SafeStr_14551 = "";
    }

    private renderFrame(): void {
        let _loc4_: VariableFxBitmapComposer = null;
        let _loc5_: number = 0;
        let _loc2_: any = null;
        let _loc6_: BitmapData = null;
        let _loc1_: any = null;
        let _loc7_: any = null;
        let _loc3_: BitmapData = this._frame.bitmapData;
        if (_loc3_ == null) {
            return;
        }
        _loc3_.lock();
        try {
            _loc4_ = new VariableFxBitmapComposer(_loc3_);
            _loc5_ = this.digitCount;
            _loc2_ = this._SafeStr_14537.getBackgroundPrebake(_loc5_, this.frameWidth);
            _loc6_ = this._SafeStr_14566.frame.bitmapData;
            _loc1_ = this.getCurrentBadgeRender();
            _loc7_ = this.createCurrentNumberRenderPlan();
            try {
                _loc4_.clear(0);
                _loc4_.drawLayer(_loc2_.bitmapData, 0, 0, "normal", 255);
                if (_loc6_ != null) {
                    _loc4_.drawLayer(_loc6_, this.progressX, 19, "normal", 255);
                }
                this._SafeStr_14537._SafeStr_14556.draw(_loc4_, _loc7_, this.resolveNumberX(_loc7_), 7);
                this._SafeStr_14537.badgePainter.drawBadge(_loc4_, _loc1_, this.levelText, 5, 4);
                this._SafeStr_14564 = _loc5_;
                this._lastRenderedNumberKey = stringOrNull(_loc7_.key);
            } finally {
                if (_loc2_.ownsPrebake == true) {
                    castTo(_loc2_.bitmapData, BitmapData).dispose();
                }
            }
        } finally {
            _loc3_.unlock();
        }
    }

    private getCurrentBadgeRender(): any {
        let _loc1_: string = this.digitCount + ":" + String(this.displayedFrameArgb);
        if (this._SafeStr_14563 != null && this._badgeRenderKey == _loc1_) {
            return this._SafeStr_14563;
        }
        this.disposeCurrentBadgeRender();
        this._SafeStr_14563 = this._SafeStr_14537.badgePainter.createBadgeRender(this.digitCount, this.displayedFrameArgb);
        this._badgeRenderKey = _loc1_;
        return this._SafeStr_14563;
    }

    private disposeCurrentBadgeRender(): void {
        if (this._SafeStr_14537 != null && this._SafeStr_14537.badgePainter != null) {
            this._SafeStr_14537.badgePainter.disposeBadgeRender(this._SafeStr_14563);
        }
        this._SafeStr_14563 = null;
        this._badgeRenderKey = "";
    }

    private createRenderedSignature(): string {
        return this.frameWidth + "x" + this.frameHeight + ":" + this._levelProgress.displayedLevel + ":" + this.displayedFrameArgb;
    }

    private hasRenderChange(): boolean {
        return this._frame.bitmapData == null || this._frame.width != this.frameWidth || this._frame.height != this.frameHeight || this.createRenderedSignature() != this._SafeStr_14551;
    }

    private isConfigPrebakeDisposed(): boolean {
        return this._SafeStr_14537 == null || this._SafeStr_14537.disposed;
    }

    private hasFinalNumberRenderChange(): boolean {
        return this._numberProgress.isAtTarget(this._levelProgress.displayedPath) && this.createCurrentNumberRenderPlan().key != this._lastRenderedNumberKey;
    }

    private createCurrentNumberRenderPlan(): any {
        let _loc1_: any = this._numberProgress.resolveDisplay(this._levelProgress.displayedPath);
        return this._SafeStr_14537._SafeStr_14556.createRenderPlan(stringOrNull(_loc1_.currentText), stringOrNull(_loc1_.maxText), this.progressFrameWidth);
    }

    private resolveNumberX(param1: any): number {
        return this.progressX + ((this.progressFrameWidth - (param1.width | 0)) / 2 | 0);
    }

    private updateProgressRendererData(param1: VariableFxRendererContext, param2: number): void {
        this._SafeStr_14566.updateData(this.createProgressRendererContext(param1), param2);
    }

    private createProgressRendererConfig(param1: VariableFxRendererContext): VariableFxConfigData {
        let _loc2_: string = param1.config.color == "DYNAMIC_LEVELLING" ? "DYNAMIC_DELEGATED" : param1.config.color;
        return new VariableFxConfigData("progress_bar", "classic_mini_progress", "classic_mini_progress", param1.config.width, _loc2_, 0, 1, this.createProgressRendererConfigExtra(param1), param1.config.categoryId, param1.config._SafeStr_14428, 1);
    }

    private createProgressRendererConfigExtra(param1: VariableFxRendererContext): UtilsMap {
        let _loc3_: UtilsMap = new UtilsMap();
        let _loc2_: string = _SafeCls_6080.readExtra(param1.config.extra, "color");
        let _loc4_: string = _SafeCls_6080.readExtra(param1.config.extra, "metallic");
        if (_loc2_ != null) {
            _loc3_["color"] = _loc2_;
        }
        if (_loc4_ != null) {
            _loc3_["metallic"] = _loc4_;
        }
        return _loc3_;
    }

    private createProgressRendererContext(param1: VariableFxRendererContext): VariableFxRendererContext {
        let _loc2_: number = this._levelProgress.displayedProgress;
        return new VariableFxRendererContext(param1.assetProvider, this._progressRendererConfig, new VariableFxStatusData(_loc2_, null, null, this.createProgressRendererStatusExtra(), true), 0, 1, _loc2_, param1._SafeStr_14489);
    }

    private updateLevelProgressTarget(param1: VariableFxRendererContext, param2: LevelProgressPathSample, param3: number): void {
        if (!this._SafeStr_14565 || param1.status.isInitialize) {
            this._levelProgress.snapTo(param2, param3);
            this._SafeStr_14565 = true;
            return;
        }
        this._levelProgress.setTarget(param2, param3);
    }

    private updateNumberProgressTarget(param1: VariableFxRendererContext, param2: LevelProgressPathSample): void {
        let _loc3_: any = { "maxValue": param1._SafeStr_14488, "pathSample": param2, "value": Math.min(param1._SafeStr_14488, param1.status.value) };
        if (param1.status.isInitialize) {
            this._numberProgress.snapTo(_loc3_);
            return;
        }
        this._numberProgress.setTarget(_loc3_, this._levelProgress.displayedPath);
    }

    private resolveLevelProgressSample(param1: VariableFxRendererContext): LevelProgressPathSample {
        let _loc3_: number = Number(_SafeCls_6080.readExtra(param1.status.extra, "current_level"));
        let _loc2_: number = Number(_SafeCls_6080.readExtra(param1.status.extra, "max_level"));
        let _loc5_: boolean = _SafeCls_6080.readExtra(param1.status.extra, "is_maxed").toLowerCase() == "true";
        let _loc4_: number = LevelProgressPathAnimator.resolveLevelProgressSampleProgress(param1.progress, param1.status.value, param1._SafeStr_14487, param1._SafeStr_14488, _loc5_);
        return new LevelProgressPathSample(_loc3_, _loc4_, _loc5_, isFinite(_loc2_) ? _loc2_ : null);
    }

    private createDisplayedLevelStatusExtra(): UtilsMap {
        let _loc1_: string = null;
        let _loc2_: UtilsMap = new UtilsMap();
        _loc2_["max_level"] = _SafeCls_6080.readExtra(this._context.status.extra, "max_level");
        _loc2_["is_maxed"] = _SafeCls_6080.readExtra(this._context.status.extra, "is_maxed");
        _loc2_["current_level"] = String(this._levelProgress.displayedLevel);
        _loc1_ = _SafeCls_6080.readExtra(this._context.status.extra, "delegated_color");
        if (_loc1_ != null) {
            _loc2_["delegated_color"] = _loc1_;
        }
        return _loc2_;
    }

    private createProgressRendererStatusExtra(): UtilsMap {
        let _loc1_: string = null;
        let _loc2_: UtilsMap = new UtilsMap();
        if (this._progressRendererConfig.color != "DYNAMIC_DELEGATED") {
            _loc1_ = this._progressRendererConfig.color == "DYNAMIC_TEAM_COLOR" ? _SafeCls_6080.readExtra(this._context.status.extra, "delegated_color") : null;
            if (_loc1_ != null) {
                _loc2_["delegated_color"] = _loc1_;
            }
            return _loc2_;
        }
        _loc2_["delegated_color"] = this.formatRgbHex((this.displayedFrameArgb & 0xFFFFFF) >>> 0);
        return _loc2_;
    }

    private resolveClassicProgressBarFrameWidth(param1: string): number {
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
