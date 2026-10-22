import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { VariableFxBitmapComposer } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxBitmapComposer';
import { VariableFxConfiguredIcon } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxConfiguredIcon';
import { VariableFxIconOverlayLayout } from '@/com/sulake/habbo/room/object/visualization/variablefx/rendering/VariableFxIconOverlayLayout';
import { VariableFxFrame } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxFrame';
import { VariableFxRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRenderer';

export class NumberDisplayRendererBase implements VariableFxRenderer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.renderers.number::NumberDisplayRendererBase'); }

    declare private _SafeStr_14573: VariableFxBitmapComposer;

    declare private _SafeStr_14574: any;

    declare private _SafeStr_14575: any;

    declare private _SafeStr_14576: string;

    declare private _frame: VariableFxFrame;

    declare private _icon: VariableFxConfiguredIcon;

    declare private _SafeStr_14577: string;

    private _SafeStr_14578: string = "";

    constructor(param1: VariableFxRendererContext, param2: any) {
        let _loc3_: any = null;
        this._SafeStr_14575 = {};
        this._frame = new VariableFxFrame();
        this._SafeStr_14574 = param2;
        this._SafeStr_14576 = this.normalizeDisplayValue(param1.status.value);
        this._icon = VariableFxConfiguredIcon.resolve(param1);
        this._SafeStr_14577 = VariableFxConfiguredIcon.resolveAlignment(param1);
        for (_loc3_ of valuesOf(param2.digits)) {
            this._SafeStr_14575[_loc3_.value] = _loc3_;
        }
    }

    public get frame(): VariableFxFrame {
        return this._frame;
    }

    public get isContinuous(): boolean {
        return false;
    }

    public updateData(param1: VariableFxRendererContext, param2: number): void {
        this._SafeStr_14576 = this.normalizeDisplayValue(param1.status.value);
        this.updateRendererData(param1, param2);
    }

    public needsUpdate(param1: number): boolean {
        return this._frame.bitmapData == null || this._SafeStr_14576 != this._SafeStr_14578 || this.needsRendererUpdate();
    }

    public update(param1: number): boolean {
        if (!this.needsUpdate(param1)) {
            return false;
        }
        this.ensureFrameBitmap();
        this.renderFrame();
        this._SafeStr_14578 = this._SafeStr_14576;
        this.didRenderFrame();
        this._frame.updateId++;
        return true;
    }

    public dispose(): void {
        this._frame.disposeBitmap();
    }

    protected get composer(): VariableFxBitmapComposer {
        if (this._SafeStr_14573 == null) {
            throw new Error("Variable FX number display composer is only available while rendering.");
        }
        return this._SafeStr_14573;
    }

    protected get digitHeight(): number {
        return this._SafeStr_14574.digitHeight | 0;
    }

    protected get digitSpacing(): number {
        return this._SafeStr_14574.digitSpacing == null ? 0 : this._SafeStr_14574.digitSpacing | 0;
    }

    protected drawDigit(param1: any, param2: number, param3: number): void {
    }

    protected updateRendererData(param1: VariableFxRendererContext, param2: number): void {
    }

    protected needsRendererUpdate(): boolean {
        return false;
    }

    protected didRenderFrame(): void {
    }

    protected resolveBitmapDataClassLayer(): BitmapData {
        return null;
    }

    protected resolveContentLayout(): VariableFxIconOverlayLayout {
        return VariableFxIconOverlayLayout.resolve({ "alignment": this._SafeStr_14577, "contentHeight": this.contentHeight, "contentWidth": this.contentWidth, "contentYOffsetPx": this._SafeStr_14574.iconContentYOffsetPx | 0, "iconHeight": (this._icon == null ? 0 : this._icon.bitmapData.height), "iconOffsetX": 0, "iconOffsetY": 0, "iconWidth": (this._icon == null ? 0 : this._icon.bitmapData.width), "overlapPx": this._SafeStr_14574.iconOverlapPx | 0 });
    }

    private get contentWidth(): number {
        let _loc2_: number = 0;
        let _loc4_: any = null;
        let _loc3_: any[] = this.resolveDisplayDigits();
        let _loc1_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < _loc3_.length) {
            if (_loc2_ > 0) {
                _loc1_ += this.digitSpacing;
            }
            _loc4_ = _loc3_[_loc2_];
            _loc1_ += _loc4_.width | 0;
            _loc2_++;
        }
        return Math.max(0, _loc1_) | 0;
    }

    private get contentHeight(): number {
        return this._SafeStr_14574.digitHeight | 0;
    }

    private ensureFrameBitmap(): void {
        let _loc2_: BitmapData = null;
        let _loc1_: VariableFxIconOverlayLayout = this.resolveContentLayout();
        if (this._frame.bitmapData != null && this._frame.width == _loc1_.frameWidth && this._frame.height == _loc1_.frameHeight) {
            return;
        }
        this._frame.disposeBitmap();
        _loc2_ = new BitmapData(_loc1_.frameWidth, _loc1_.frameHeight, true, 0);
        this._frame.bitmapData = _loc2_;
        this._frame._SafeStr_14484 = null;
        this._frame.width = _loc2_.width;
        this._frame.height = _loc2_.height;
        this._SafeStr_14578 = "";
    }

    private renderFrame(): void {
        let _loc1_: VariableFxIconOverlayLayout = null;
        let _loc2_: BitmapData = this._frame.bitmapData;
        if (_loc2_ == null) {
            return;
        }
        _loc1_ = this.resolveContentLayout();
        _loc2_.lock();
        try {
            this._SafeStr_14573 = new VariableFxBitmapComposer(_loc2_);
            this._SafeStr_14573.clear(0);
            this.drawNumberContent(_loc1_._SafeStr_14524, _loc1_._SafeStr_14525);
            this.drawConfiguredIcons(_loc1_);
        } finally {
            this._SafeStr_14573 = null;
            _loc2_.unlock();
        }
    }

    private drawNumberContent(param1: number, param2: number): void {
        let _loc5_: any = null;
        let _loc3_: number = param1;
        let _loc4_: any[] = this.resolveDisplayDigits();
        for (_loc5_ of _loc4_ ?? []) {
            this.drawDigit(_loc5_, _loc3_, param2);
            _loc3_ += (_loc5_.width | 0) + this.digitSpacing;
        }
    }

    private drawConfiguredIcons(param1: VariableFxIconOverlayLayout): void {
        let _loc2_: any = null;
        if (this._icon == null) {
            return;
        }
        for (_loc2_ of param1._SafeStr_14529 ?? []) {
            this.composer.drawLayer(this._icon.bitmapData, Number(_loc2_.x), Number(_loc2_.y), "normal", 255);
        }
    }

    private resolveDisplayDigits(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_14576.length) {
            _loc1_.push(this.resolveDigit(this._SafeStr_14576.charAt(_loc2_)));
            _loc2_++;
        }
        return _loc1_;
    }

    private resolveDigit(param1: string): any {
        let _loc2_: any = this._SafeStr_14575[param1];
        if (_loc2_ == null) {
            throw new Error("Missing Variable FX number display digit \'" + param1 + "\'.");
        }
        return _loc2_;
    }

    private normalizeDisplayValue(param1: number): string {
        if (!isFinite(param1)) {
            return "0";
        }
        return String(param1 | 0);
    }

    get [VariableFxRenderer](): true {
        return true;
    }
}
