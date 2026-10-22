import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { AnimatedPaintColor } from '@/com/sulake/habbo/room/object/visualization/variablefx/animation/AnimatedPaintColor';
import { AnimatedScalar } from '@/com/sulake/habbo/room/object/visualization/variablefx/animation/AnimatedScalar';
import { VariableFxFrame } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxFrame';
import { VariableFxRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRenderer';

export class BarVariableFxRendererBase implements VariableFxRenderer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.bar::BarVariableFxRendererBase'); }

    private static readonly FILL_COLOR_TRANSITION_MS: number = 300;

    declare private _context: VariableFxRendererContext;

    declare private _fillColor: AnimatedPaintColor;

    declare private _frame: VariableFxFrame;

    private _initialized: boolean = false;
    private _SafeStr_14734: number = -1;
    private _lastRenderedPixelWidth: number = -1;

    declare private _SafeStr_4425: AnimatedScalar;

    constructor(param1: VariableFxRendererContext) {
        this.initInstanceFields();
        this._context = param1;
        this._fillColor = new AnimatedPaintColor(300);
        this._frame = new VariableFxFrame();
        this._SafeStr_4425 = new AnimatedScalar(0.00001, 0.003, 0.0001, 0.000008);
    }

    public get frame(): VariableFxFrame {
        return this._frame;
    }

    public get isContinuous(): boolean {
        return false;
    }

    public updateData(param1: VariableFxRendererContext, param2: number): void {
        this._context = param1;
        if (!this._initialized || param1.status.isInitialize) {
            this._SafeStr_4425.snapTo(param1.progress, param2);
            this._fillColor.snapTo(this.resolveFillColorSource(), param2);
            this._initialized = true;
            return;
        }
        this._SafeStr_4425.setTarget(param1.progress, param2);
        this._fillColor.setTarget(this.resolveFillColorSource(), param2);
    }

    public needsUpdate(param1: number): boolean {
        return this.hasRenderChange(param1) || this._SafeStr_4425.needsUpdate(param1, this.progressPixelWidth) || this._fillColor.needsUpdate(param1);
    }

    public update(param1: number): boolean {
        this.advanceAnimation(param1);
        if (!this.hasRenderChange(param1)) {
            return false;
        }
        this.ensureFrameBitmap();
        this.renderFrame(param1);
        this._SafeStr_14734 = this._fillColor.value | 0;
        this._lastRenderedPixelWidth = this.calculateFilledPixelWidth();
        this.didRenderFrame(param1);
        this._frame.updateId++;
        return true;
    }

    public dispose(): void {
        this._frame.disposeBitmap();
    }

    protected get context(): VariableFxRendererContext {
        return this._context;
    }

    protected get displayedFillArgb(): number {
        return this._fillColor.argb;
    }

    protected get displayedFillRgb(): number {
        return this._fillColor.value;
    }

    protected get displayedProgress(): number {
        return this._SafeStr_4425.value;
    }

    protected get mutableFrame(): VariableFxFrame {
        return this._frame;
    }

    protected get frameWidth(): number {
        return 0;
    }

    protected get frameHeight(): number {
        return 0;
    }

    protected get progressPixelWidth(): number {
        return 0;
    }

    protected calculateFilledPixelWidth(): number {
        return Math.max(0, Math.min(this.progressPixelWidth, this.displayedProgress * this.progressPixelWidth | 0)) | 0;
    }

    protected createFrameBitmap(param1: number, param2: number): BitmapData {
        return new BitmapData(param1, param2, true, 0);
    }

    protected renderFrame(param1: number): void {
    }

    protected hasRendererSpecificRenderChange(param1: number): boolean {
        return false;
    }

    protected didRenderFrame(param1: number): void {
    }

    private advanceAnimation(param1: number): void {
        this._SafeStr_4425.update(param1);
        this._fillColor.update(this.resolveFillColorSource(), param1);
    }

    private hasRenderChange(param1: number): boolean {
        let _loc2_: number = this.calculateFilledPixelWidth();
        if (this._frame.bitmapData == null || this._frame.width != this.frameWidth || this._frame.height != this.frameHeight || _loc2_ != this._lastRenderedPixelWidth) {
            return true;
        }
        return this._fillColor.value != this._SafeStr_14734 && (_loc2_ > 0 || this._lastRenderedPixelWidth > 0) || this.hasRendererSpecificRenderChange(param1);
    }

    private ensureFrameBitmap(): void {
        let _loc1_: BitmapData = null;
        if (this._frame.bitmapData != null && this._frame.width == this.frameWidth && this._frame.height == this.frameHeight) {
            return;
        }
        this._frame.disposeBitmap();
        _loc1_ = this.createFrameBitmap(this.frameWidth, this.frameHeight);
        if (_loc1_ == null) {
            throw new Error("Variable FX bar renderer could not allocate a frame bitmap.");
        }
        this._frame.bitmapData = _loc1_;
        this._frame._SafeStr_14673 = null;
        this._frame.width = _loc1_.width;
        this._frame.height = _loc1_.height;
        this._SafeStr_14734 = -1;
        this._lastRenderedPixelWidth = -1;
    }

    private resolveFillColorSource(): any {
        return { "color": this._context.config.color, "extra": this._context.config.extra, "progress": this.displayedProgress, "statusExtra": this._context.status.extra };
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    get [VariableFxRenderer](): true {
        return true;
    }
}
