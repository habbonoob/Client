import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxAssetProvider } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxAssetProvider';
import type { VariableFxConfigData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxConfigData';
import type { VariableFxRendererRegistry } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererRegistry';
import type { VariableFxStatusData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxStatusData';

export class VariableFxRendererContext {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxRendererContext'); }

    declare public assetProvider: VariableFxAssetProvider;

    declare public config: VariableFxConfigData;

    declare public status: VariableFxStatusData;

    declare public effectiveMinValue: number;
    static { (this.prototype as any).effectiveMinValue = NaN; }

    declare public effectiveMaxValue: number;
    static { (this.prototype as any).effectiveMaxValue = NaN; }

    declare public progress: number;
    static { (this.prototype as any).progress = NaN; }

    declare public _SafeStr_14656: VariableFxRendererRegistry;

    constructor(param1: VariableFxAssetProvider, param2: VariableFxConfigData, param3: VariableFxStatusData, param4: number, param5: number, param6: number, param7: VariableFxRendererRegistry = null) {
        this.assetProvider = param1;
        this.config = param2;
        this.status = param3;
        this.effectiveMinValue = param4;
        this.effectiveMaxValue = param5;
        this.progress = param6;
        this._SafeStr_14656 = param7;
    }
}
