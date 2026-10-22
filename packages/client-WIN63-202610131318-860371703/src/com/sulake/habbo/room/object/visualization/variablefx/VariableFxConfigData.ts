import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxRendererPrebake } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxRendererPrebake';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class VariableFxConfigData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxConfigData'); }

    declare public category: string;

    declare public categoryId: number;
    static { (this.prototype as any).categoryId = 0; }

    declare public style: string;

    declare public _SafeStr_14474: number;
    static { (this.prototype as any)._SafeStr_14474 = 0; }

    declare public renderer: string;

    declare public rendererId: number;
    static { (this.prototype as any).rendererId = 0; }

    declare public width: string;

    declare public color: string;

    declare public defaultMinValue: number;
    static { (this.prototype as any).defaultMinValue = NaN; }

    declare public defaultMaxValue: number;
    static { (this.prototype as any).defaultMaxValue = NaN; }

    declare public extra: UtilsMap;

    declare public _SafeStr_14643: VariableFxRendererPrebake;

    constructor(param1: string, param2: string, param3: string, param4: string, param5: string, param6: number, param7: number, param8: UtilsMap = null, param9: number = -1, param10: number = -1, param11: number = -1) {
        this.category = param1;
        this.categoryId = param9;
        this.style = param2;
        this._SafeStr_14474 = param10;
        this.renderer = param3;
        this.rendererId = param11;
        this.width = param4;
        this.color = param5;
        this.defaultMinValue = param6;
        this.defaultMaxValue = param7;
        this.extra = param8 == null ? new UtilsMap() : param8;
    }

    public get stackOrder(): number {
        return this.extra.getValue("stack_order") | 0;
    }

    public cloneForRenderer(param1: string, param2: string, param3: number, param4: string, param5: UtilsMap = null): VariableFxConfigData {
        return new VariableFxConfigData(param1, param2, param2, this.width, param4, 0, 1, param5 == null ? this.extra : param5, this.categoryId, this._SafeStr_14474, param3);
    }
}
