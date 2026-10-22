import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxStatusModelEntry } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusModelEntry';
import type { IStackedAddition } from '@/com/sulake/habbo/room/object/visualization/stacked/IStackedAddition';
import type { VariableFxAssetProvider } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxAssetProvider';
import type { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import type { VariableFxFrame } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxFrame';
import type { VariableFxRendererRegistry } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererRegistry';
import type { VariableFxVisualizationManager } from '@/com/sulake/habbo/room/object/visualization/VariableFxVisualizationManager';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { VariableFxStatusData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxStatusData';
import { VariableFxVisualizer } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxVisualizer';

export class VariableFxStackAddition implements IStackedAddition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxStackAddition'); }

    private static readonly FADE_IN_DURATION_MS: number = 150;
    private static readonly FADE_OUT_DURATION_MS: number = 350;
    private static readonly DEFAULT_RELATIVE_DEPTH: number = -0.2;
    private static _SafeStr_14648: number = 10000;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _SafeStr_14649: number;
    static { (this.prototype as any)._SafeStr_14649 = 0; }

    declare private _SafeStr_7039: string;

    declare private _createdAt: number;
    static { (this.prototype as any)._createdAt = 0; }

    declare private _manager: VariableFxVisualizationManager;

    declare private _SafeStr_5776: VariableFxAssetProvider;

    declare private _rendererRegistry: VariableFxRendererRegistry;

    declare private _SafeStr_14479: VariableFxVisualizer;

    private _SafeStr_14650: number = -1;
    private _SafeStr_14651: number = -1;
    private _SafeStr_14652: boolean = false;
    private _SafeStr_14323: boolean = false;
    private _SafeStr_14653: boolean = false;
    private _finished: boolean = false;
    private _alpha: number = 0;
    private _SafeStr_14654: number = 0;
    private _fadeStartAlpha: number = 0;
    private _fadeTargetAlpha: number = 0;
    private _SafeStr_14655: number = 0;
    private _SafeStr_14656: boolean = false;

    constructor(param1: number, param2: string, param3: VariableFxVisualizationManager, param4: VariableFxAssetProvider, param5: VariableFxRendererRegistry) {
        this._id = VariableFxStackAddition._SafeStr_14648++;
        this._SafeStr_14649 = param1;
        this._SafeStr_7039 = param2;
        this._manager = param3;
        this._SafeStr_5776 = param4;
        this._rendererRegistry = param5;
    }

    public get id(): number {
        return this._id;
    }

    public get configId(): number {
        return this._SafeStr_14649;
    }

    public get variableId(): string {
        return this._SafeStr_7039;
    }

    public get createdAt(): number {
        return this._createdAt;
    }

    public get isFinished(): boolean {
        return this._finished;
    }

    public get requiresAnimationTick(): boolean {
        return !this._SafeStr_14656 || this._alpha != this._fadeTargetAlpha || this._SafeStr_14479 != null && this._SafeStr_14479.requiresAnimationTick;
    }

    public get disposed(): boolean {
        return this._manager == null;
    }

    public get isPartOfStack(): boolean {
        return this._SafeStr_14652;
    }

    public set isPartOfStack(param1: boolean) {
        if (this._SafeStr_14652 == param1) {
            return;
        }
        this._SafeStr_14652 = param1;
        this._SafeStr_14656 = false;
    }

    public get contributesToStackLayout(): boolean {
        return this._SafeStr_14323 && !this._SafeStr_14653;
    }

    public get invisible(): boolean {
        return this._SafeStr_14653;
    }

    public show(param1: VariableFxStatusModelEntry, param2: number): boolean {
        let _loc5_: VariableFxConfigData = null;
        let _loc3_: number = 0;
        let _loc6_: VariableFxStatusData = null;
        let _loc4_: boolean = false;
        let _loc7_: boolean = false;
        if (this._manager == null) {
            return false;
        }
        _loc5_ = this._manager.getConfig(this._SafeStr_14649);
        if (_loc5_ == null) {
            return this.hide(param2);
        }
        this._createdAt = param1.createdAt;
        _loc3_ = this._manager.getConfigUpdateId(this._SafeStr_14649);
        _loc4_ = param1.isInitialize || param1.invisible;
        _loc6_ = new VariableFxStatusData(param1.value, param1.overrideMinValue, param1.overrideMaxValue, param1.extra.clone(), _loc4_);
        if (this._SafeStr_14479 == null || this._SafeStr_14651 != _loc3_) {
            this.disposeVisualizer();
            this._SafeStr_14479 = new VariableFxVisualizer(_loc5_, _loc6_, param2, this._SafeStr_5776, this._rendererRegistry);
            this._SafeStr_14651 = _loc3_;
            this._SafeStr_14650 = param1.updateId;
            _loc7_ = true;
        } else if (this._SafeStr_14650 != param1.updateId) {
            this._SafeStr_14479.updateData(_loc6_, param2);
            this._SafeStr_14650 = param1.updateId;
            _loc7_ = true;
        }
        if (this._finished) {
            _loc7_ = true;
        }
        this._finished = false;
        if (param1.invisible) {
            return this.startInvisibleFade(param2) || _loc7_;
        }
        if (this._SafeStr_14653 || !this._SafeStr_14323) {
            _loc7_ = true;
        }
        this._SafeStr_14653 = false;
        this._SafeStr_14323 = true;
        return this.startFade(255, 150, param2) || _loc7_;
    }

    public hide(param1: number): boolean {
        let _loc2_: boolean = this._SafeStr_14653;
        this._SafeStr_14653 = false;
        if (!this._SafeStr_14323 && this._fadeTargetAlpha == 0) {
            if (this._alpha == 0) {
                _loc2_ ||= !this._finished;
                this.finishHidden();
            }
            return _loc2_;
        }
        _loc2_ = true;
        this._SafeStr_14323 = false;
        _loc2_ = this.startFade(0, 350, param1) || _loc2_;
        if (this._alpha == 0) {
            _loc2_ ||= !this._finished;
            this.finishHidden();
        }
        return _loc2_;
    }

    public update(param1: IRoomObjectSprite, param2: number): void {
        let _loc3_: number = getTimer();
        this.updateFade(_loc3_);
        this.updateVisualizer(_loc3_);
        this.applyToSprite(param1);
    }

    public animate(param1: IRoomObjectSprite): boolean {
        let _loc2_: number = getTimer();
        let _loc3_: boolean = this.updateFade(_loc2_);
        if (this.updateVisualizer(_loc2_)) {
            _loc3_ = true;
        }
        if (!_loc3_ && this._SafeStr_14656) {
            return false;
        }
        this.applyToSprite(param1);
        return true;
    }

    public dispose(): void {
        this.disposeVisualizer();
        this._manager = null;
        this._SafeStr_5776 = null;
        this._rendererRegistry = null;
    }

    private startFade(param1: number, param2: number, param3: number): boolean {
        let _loc4_: boolean = this.updateFade(param3);
        if (this._fadeTargetAlpha == param1) {
            return _loc4_;
        }
        this._SafeStr_14654 = param3;
        this._fadeStartAlpha = this._alpha;
        this._fadeTargetAlpha = param1;
        this._SafeStr_14655 = param2;
        return true;
    }

    private updateFade(param1: number): boolean {
        let _loc3_: number = NaN;
        let _loc2_: number = 0;
        if (this._alpha == this._fadeTargetAlpha) {
            return false;
        }
        _loc3_ = this._SafeStr_14655 <= 0 ? 1 : Number(Math.max(0, Math.min(1, (param1 - this._SafeStr_14654) / this._SafeStr_14655)));
        _loc2_ = Math.round(this._fadeStartAlpha + (this._fadeTargetAlpha - this._fadeStartAlpha) * _loc3_) | 0;
        if (_loc2_ == this._alpha) {
            return false;
        }
        this._alpha = _loc2_;
        if (this._alpha == 0 && !this._SafeStr_14323 && !this._SafeStr_14653) {
            this.finishHidden();
        }
        return true;
    }

    private finishHidden(): void {
        this._finished = true;
        this.disposeVisualizer();
    }

    private updateVisualizer(param1: number): boolean {
        if (this._SafeStr_14479 == null) {
            return false;
        }
        if (this._SafeStr_14653 && !this._SafeStr_14323 && this._alpha <= 0) {
            return false;
        }
        if (this._SafeStr_14479.needsUpdate(param1)) {
            return this._SafeStr_14479.update(param1);
        }
        return false;
    }

    private applyToSprite(param1: IRoomObjectSprite): void {
        let _loc2_: VariableFxFrame = null;
        if (param1 == null) {
            this._SafeStr_14656 = false;
            return;
        }
        if (this._SafeStr_14479 == null || this._alpha <= 0) {
            param1.alpha = 0;
            param1.visible = false;
            this._SafeStr_14656 = true;
            return;
        }
        _loc2_ = this._SafeStr_14479.frame;
        if (_loc2_ == null || _loc2_.bitmapData == null) {
            param1.alpha = 0;
            param1.visible = false;
            this._SafeStr_14656 = true;
            return;
        }
        param1.asset = _loc2_.bitmapData;
        param1.offsetX = -(_loc2_.bitmapData.width / 2 | 0) + _loc2_._SafeStr_14657;
        param1.offsetY = this._SafeStr_14652 ? _loc2_._SafeStr_14658 : -_loc2_.bitmapData.height + _loc2_._SafeStr_14658;
        param1.relativeDepth = -0.2;
        param1.alpha = this._alpha;
        param1.visible = true;
        this._SafeStr_14656 = true;
    }

    private disposeVisualizer(): void {
        if (this._SafeStr_14479 != null) {
            this._SafeStr_14479.dispose();
            this._SafeStr_14479 = null;
        }
        this._SafeStr_14651 = -1;
        this._SafeStr_14650 = -1;
        this._SafeStr_14656 = false;
    }

    private startInvisibleFade(param1: number): boolean {
        let _loc2_: boolean = !this._SafeStr_14653 || this._SafeStr_14323;
        this._SafeStr_14653 = true;
        this._SafeStr_14323 = false;
        return this.startFade(0, 350, param1) || _loc2_;
    }
}
