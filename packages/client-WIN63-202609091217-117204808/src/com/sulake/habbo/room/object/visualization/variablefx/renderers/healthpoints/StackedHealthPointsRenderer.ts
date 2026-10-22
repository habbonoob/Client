import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { _SafeCls_6075 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6075';
import { _SafeCls_6080 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6080';
import { _SafeCls_6083 } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/healthpoints/_SafeCls_6083';
import { StackedHealthPointsHeartPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/renderers/healthpoints/StackedHealthPointsHeartPrebake';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxFrame } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxFrame';
import { VariableFxRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRenderer';

export class StackedHealthPointsRenderer implements VariableFxRenderer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.healthpoints::StackedHealthPointsRenderer'); }

    private static readonly HORIZONTAL_SPACING: number = 1;
    private static readonly VERTICAL_SPACING: number = 3;
    private static readonly MAX_ROWS: number = 20;

    private static readonly STACKED_HEALTH_POINTS_ASSETS: any = { "background": "variablefx_stacked_health_points_background", "darkening": "variablefx_stacked_health_points_darkening", "darkeningMetallic": "variablefx_stacked_health_points_darkening_metallic", "lighting": "variablefx_stacked_health_points_lighting", "lightingMetallic": "variablefx_stacked_health_points_lighting_metallic", "metallic": "variablefx_stacked_health_points_metallic" };

    declare private _context: VariableFxRendererContext;

    private _SafeStr_14550: number = -1;
    private _frame: VariableFxFrame = new VariableFxFrame();
    private _SafeStr_14551: _SafeCls_6083 = new _SafeCls_6083();
    private _initialized: boolean = false;
    private _SafeStr_14552: string = "";

    declare private _SafeStr_14538: StackedHealthPointsHeartPrebake;

    private _SafeStr_14553: number = 0;

    constructor(param1: VariableFxRendererContext) {
        let context: VariableFxRendererContext = param1;
        this._context = context;
        this._SafeStr_14538 = asInstanceOf(_SafeCls_6075.getOrCreate(context.config, (): any => {
             return this.createPrebake(context);
         }), StackedHealthPointsHeartPrebake);
        this._SafeStr_14550 = this.resolveFillArgb(context);
    }

    public static resolveStackedHealthPointsPerRow(param1: string): number {
        switch (param1) {
            case "large":
                return 5;
            case "medium":
        }
        return 3;
    }

    public get frame(): VariableFxFrame {
        return this._frame;
    }

    public get isContinuous(): boolean {
        return false;
    }

    public updateData(param1: VariableFxRendererContext, param2: number): void {
        this._context = param1;
        this._SafeStr_14550 = this.resolveFillArgb(param1);
        this._SafeStr_14553 = this.resolveTargetHeartCount();
        if (!this._initialized || param1.status.isInitialize) {
            this._SafeStr_14551.snapTo(this._SafeStr_14553, param2);
            this._initialized = true;
            return;
        }
        this._SafeStr_14551.setTarget(this._SafeStr_14553, param2);
    }

    public needsUpdate(param1: number): boolean {
        return this._frame.bitmapData == null || this._frame.width != this.frameWidth || this._frame.height != this.frameHeight || this.createRenderedSignature() != this._SafeStr_14552 || this._SafeStr_14551.needsUpdate(param1, 1);
    }

    public update(param1: number): boolean {
        let _loc2_: boolean = this._SafeStr_14551.update(param1);
        if (!_loc2_ && !this.needsUpdate(param1)) {
            return false;
        }
        this.ensureFrameBitmap();
        this.renderFrame();
        this._SafeStr_14552 = this.createRenderedSignature();
        this._frame.updateId++;
        return true;
    }

    public dispose(): void {
        this._frame.disposeBitmap();
    }

    private get heartWidth(): number {
        return this._SafeStr_14538.heartWidth;
    }

    private get heartHeight(): number {
        return this._SafeStr_14538.heartHeight;
    }

    private get heartsPerRow(): number {
        return StackedHealthPointsRenderer.resolveStackedHealthPointsPerRow(this._context.config.width);
    }

    private get renderHeartCount(): number {
        return this._SafeStr_14551.visibleHeartCount;
    }

    private get heightHeartCount(): number {
        return Math.max(this._SafeStr_14553, this._SafeStr_14551.visibleHeartCount) | 0;
    }

    private get rowCount(): number {
        return Math.max(1, Math.ceil(this.heightHeartCount / this.heartsPerRow)) | 0;
    }

    private get columnCount(): number {
        let _loc1_: number = this._SafeStr_14551.visibleHeartCount;
        if (Math.ceil(_loc1_ / this.heartsPerRow) > 1) {
            return this.heartsPerRow;
        }
        return Math.max(1, Math.min(this.heartsPerRow, _loc1_)) | 0;
    }

    private get frameWidth(): number {
        return this.columnCount * this.heartWidth + (this.columnCount - 1) * 1;
    }

    private get frameHeight(): number {
        return this.rowCount * this.heartHeight + (this.rowCount - 1) * 3;
    }

    private ensureFrameBitmap(): void {
        let _loc1_: BitmapData = null;
        if (this._frame.bitmapData != null && this._frame.width == this.frameWidth && this._frame.height == this.frameHeight) {
            return;
        }
        this._frame.disposeBitmap();
        _loc1_ = new BitmapData(this.frameWidth, this.frameHeight, true, 0);
        this._frame.bitmapData = _loc1_;
        this._frame._SafeStr_14485 = null;
        this._frame.width = _loc1_.width;
        this._frame.height = _loc1_.height;
        this._SafeStr_14552 = "";
    }

    private renderFrame(): void {
        let _loc2_: VariableFxBitmapComposer = null;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc1_: BitmapData = this._frame.bitmapData;
        if (_loc1_ == null) {
            return;
        }
        _loc1_.lock();
        try {
            _loc2_ = new VariableFxBitmapComposer(_loc1_);
            _loc2_.clear(0);
            _loc3_ = 0;
            while (_loc3_ < this.renderHeartCount) {
                _loc4_ = this.resolveHeartOpacity(_loc3_);
                if (_loc4_ > 0) {
                    this.drawHeart(_loc2_, _loc3_, _loc4_);
                }
                _loc3_++;
            }
        } finally {
            _loc1_.unlock();
        }
    }

    private drawHeart(param1: VariableFxBitmapComposer, param2: number, param3: number): void {
        let _loc4_: number = param2 / this.heartsPerRow | 0;
        let _loc5_: number = param2 % this.heartsPerRow;
        let _loc6_: number = _loc5_ * (this.heartWidth + 1);
        let _loc7_: number = (this.rowCount - _loc4_ - 1) * (this.heartHeight + 3);
        param1.drawLayer(this._SafeStr_14538.getOrCreateHeartPrebake(this._SafeStr_14550 >>> 0), _loc6_, _loc7_, "normal", param3);
    }

    private resolveHeartOpacity(param1: number): number {
        return Math.max(0, Math.min(255, Math.round((this._SafeStr_14551.getOpacity(param1) + 1e-9) * 255))) | 0;
    }

    private createRenderedSignature(): string {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < this.renderHeartCount) {
            _loc1_.push(this.resolveHeartOpacity(_loc2_));
            _loc2_++;
        }
        return this.frameWidth + "x" + this.frameHeight + ":" + this._SafeStr_14550 + ":" + _loc1_.join(",");
    }

    private resolveTargetHeartCount(): number {
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc1_: number = this._context.status.value - this._context._SafeStr_14488;
        let _loc5_: number = this._context._SafeStr_14489 - this._context._SafeStr_14488;
        if (!isFinite(_loc1_) || !isFinite(_loc5_)) {
            return 0;
        }
        _loc4_ = Math.max(0, _loc1_ | 0) | 0;
        _loc2_ = Math.max(0, _loc5_ | 0) | 0;
        _loc3_ = this.heartsPerRow * 20;
        return Math.min(_loc4_, _loc2_, _loc3_) | 0;
    }

    private createPrebake(param1: VariableFxRendererContext): StackedHealthPointsHeartPrebake {
        let _loc2_: any = this.resolveAssets(param1);
        return new StackedHealthPointsHeartPrebake(_loc2_);
    }

    private resolveAssets(param1: VariableFxRendererContext): any {
        let _loc2_: any = _SafeCls_6080.resolvePaintColor(param1.config.color, param1.config.extra);
        let _loc4_: boolean = Boolean(_loc2_.isMetallic);
        let _loc5_: BitmapData = _loc4_ ? this.getLayer(param1, stringOrNull(StackedHealthPointsRenderer.STACKED_HEALTH_POINTS_ASSETS.darkeningMetallic)) : this.getLayer(param1, stringOrNull(StackedHealthPointsRenderer.STACKED_HEALTH_POINTS_ASSETS.darkening));
        let _loc3_: BitmapData = _loc4_ ? this.getLayer(param1, stringOrNull(StackedHealthPointsRenderer.STACKED_HEALTH_POINTS_ASSETS.lightingMetallic)) : this.getLayer(param1, stringOrNull(StackedHealthPointsRenderer.STACKED_HEALTH_POINTS_ASSETS.lighting));
        return { "background": this.getLayer(param1, stringOrNull(StackedHealthPointsRenderer.STACKED_HEALTH_POINTS_ASSETS.background)), "metallic": (_loc4_ ? this.getLayer(param1, stringOrNull(StackedHealthPointsRenderer.STACKED_HEALTH_POINTS_ASSETS.metallic)) : null), "overlays": [{ "blendMode": "multiply", "layer": _loc5_ }, { "blendMode": "add", "layer": _loc3_ }] };
    }

    private getLayer(param1: VariableFxRendererContext, param2: string): BitmapData {
        let _loc3_: BitmapData = param1.assetProvider == null ? null : param1.assetProvider.getBitmapData(param2);
        if (_loc3_ == null) {
            throw new Error("Missing Variable FX stacked health points layer \'" + param2 + "\'.");
        }
        return _loc3_;
    }

    private resolveFillArgb(param1: VariableFxRendererContext): number {
        return 0xFF000000 | _SafeCls_6080.resolveTargetPaintColor(param1.config.color, param1.config.extra, param1.progress, param1.status.extra).rgb >>> 0;
    }

    get [VariableFxRenderer](): true {
        return true;
    }
}
