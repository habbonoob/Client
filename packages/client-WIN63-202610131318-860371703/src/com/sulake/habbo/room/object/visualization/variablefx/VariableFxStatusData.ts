import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class VariableFxStatusData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxStatusData'); }

    declare public value: number;
    static { (this.prototype as any).value = NaN; }

    declare public overrideMinValue: any;

    declare public overrideMaxValue: any;

    declare public extra: UtilsMap;

    declare public isInitialize: boolean;
    static { (this.prototype as any).isInitialize = false; }

    constructor(param1: number, param2: any = null, param3: any = null, param4: UtilsMap = null, param5: boolean = false) {
        this.value = param1;
        this.overrideMinValue = param2;
        this.overrideMaxValue = param3;
        this.extra = param4 == null ? new UtilsMap() : param4;
        this.isInitialize = param5;
    }

    public get effectiveOverrideMinValue(): any {
        let _loc1_: number = Number(this.overrideMinValue);
        return this.overrideMinValue == null || !isFinite(_loc1_) ? null : _loc1_;
    }

    public get effectiveOverrideMaxValue(): any {
        let _loc1_: number = Number(this.overrideMaxValue);
        return this.overrideMaxValue == null || !isFinite(_loc1_) ? null : _loc1_;
    }
}
