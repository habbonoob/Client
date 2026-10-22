import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6072 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6072';
import type { _SafeCls_6078 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6078';
import type { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import type { VariableFxFrame } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxFrame';
import type { VariableFxRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRenderer';
import type { VariableFxRendererRegistry } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererRegistry';
import type { VariableFxStatusData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxStatusData';
import { isVariableFxRenderer } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRenderer';
import { VariableFxRendererContext } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererContext';

export class VariableFxVisualizer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxVisualizer'); }

    declare private _SafeStr_5776: _SafeCls_6072;

    declare private _config: VariableFxConfigData;

    declare private _context: VariableFxRendererContext;

    declare private _registry: VariableFxRendererRegistry;

    declare private _renderer: VariableFxRenderer;

    declare private _SafeStr_14501: _SafeCls_6078;

    private _SafeStr_14482: boolean = true;

    declare private _status: VariableFxStatusData;

    constructor(param1: VariableFxConfigData, param2: VariableFxStatusData, param3: number, param4: _SafeCls_6072, param5: VariableFxRendererRegistry) {
        this._config = param1;
        this._status = param2;
        this._SafeStr_5776 = param4;
        this._registry = param5;
        this._context = this.createContext();
        let _loc6_: (...args: any[]) => any = this.resolveRendererFactory(param1);
        if (_loc6_ == null) {
            throw new Error(this.createMissingRendererMessage(param1));
        }
        this._renderer = asGuarded(_loc6_(this._context), isVariableFxRenderer);
        this._SafeStr_14501 = param1._SafeStr_14484;
        this._renderer.updateData(this._context, param3);
    }

    public get frame(): VariableFxFrame {
        return this._renderer.frame;
    }

    public get requiresAnimationTick(): boolean {
        return this._SafeStr_14482;
    }

    public updateData(param1: VariableFxStatusData, param2: number): void {
        this._status = param1;
        this._context = this.createContext();
        this._SafeStr_14482 = true;
        this._renderer.updateData(this._context, param2);
    }

    public needsUpdate(param1: number): boolean {
        let _loc2_: boolean = false;
        if (this.isRendererPrebakeStale()) {
            this._SafeStr_14482 = false;
            return false;
        }
        _loc2_ = this._renderer.needsUpdate(param1);
        this._SafeStr_14482 = _loc2_ || this._renderer.isContinuous;
        return _loc2_;
    }

    public update(param1: number): boolean {
        let _loc2_: boolean = false;
        if (this.isRendererPrebakeStale()) {
            this._SafeStr_14482 = false;
            return false;
        }
        _loc2_ = this._renderer.update(param1);
        this._SafeStr_14482 = _loc2_ || this._renderer.isContinuous || this._renderer.needsUpdate(param1);
        return _loc2_;
    }

    public dispose(): void {
        this._renderer.dispose();
    }

    private createContext(): VariableFxRendererContext {
        let _loc2_: any = this._status.effectiveOverrideMinValue;
        let _loc3_: any = this._status.effectiveOverrideMaxValue;
        let _loc5_: number = _loc2_ == null ? this._config.defaultMinValue : Number(_loc2_);
        let _loc1_: number = _loc3_ == null ? this._config.defaultMaxValue : Number(_loc3_);
        let _loc4_: number = this.calculateProgress(this._status.value, _loc5_, _loc1_);
        return new VariableFxRendererContext(this._SafeStr_5776, this._config, this._status, _loc5_, _loc1_, _loc4_, this._registry);
    }

    private resolveRendererFactory(param1: VariableFxConfigData): (...args: any[]) => any {
        let _loc2_: (...args: any[]) => any = null;
        if (param1.rendererId >= 0) {
            _loc2_ = this._registry.resolveByServerRenderer(param1.rendererId);
            if (_loc2_ != null) {
                return _loc2_;
            }
        }
        return this._registry.resolve(param1.category, param1.renderer);
    }

    private createMissingRendererMessage(param1: VariableFxConfigData): string {
        if (param1.rendererId >= 0) {
            return "No Variable FX renderer registered for server renderer id \'" + param1.rendererId + "\'.";
        }
        return "No Variable FX renderer registered for category \'" + param1.category + "\' and renderer \'" + param1.renderer + "\'.";
    }

    private isRendererPrebakeStale(): boolean {
        return this._SafeStr_14501 != null && this._config._SafeStr_14484 != this._SafeStr_14501;
    }

    private calculateProgress(param1: number, param2: number, param3: number): number {
        if (!isFinite(param1) || !isFinite(param2) || !isFinite(param3) || param3 == param2) {
            return 0;
        }
        return Math.max(0, Math.min(1, (param1 - param2) / (param3 - param2)));
    }
}
