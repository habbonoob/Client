import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class VariableFxStatusUpdateData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.variablefx::VariableFxStatusUpdateData'); }

    declare public statusKey: string;

    declare public configId: number;
    static { (this.prototype as any).configId = 0; }

    declare public variableId: string;

    declare public isInitialize: boolean;
    static { (this.prototype as any).isInitialize = false; }

    declare public isUserEntity: boolean;
    static { (this.prototype as any).isUserEntity = false; }

    declare public entityId: number;
    static { (this.prototype as any).entityId = 0; }

    declare public value: number;
    static { (this.prototype as any).value = NaN; }

    declare public overrideMinValue: any;

    declare public overrideMaxValue: any;

    declare public extra: UtilsMap;

    constructor(param1: string, param2: boolean, param3: boolean, param4: number, param5: number, param6: any, param7: any, param8: UtilsMap) {
        this.statusKey = param1;
        this.configId = VariableFxStatusUpdateData.parseConfigId(param1);
        this.variableId = VariableFxStatusUpdateData.parseVariableId(param1);
        this.isInitialize = param2;
        this.isUserEntity = param3;
        this.entityId = param4;
        this.value = param5;
        this.overrideMinValue = param6;
        this.overrideMaxValue = param7;
        this.extra = param8 == null ? new UtilsMap() : param8;
    }

    private static parseConfigId(param1: string): number {
        return Number(param1.split("|")[0]) | 0;
    }

    private static parseVariableId(param1: string): string {
        let _loc2_: number = param1.indexOf("|");
        return _loc2_ < 0 ? "" : param1.substr(_loc2_ + 1);
    }

    public clone(): VariableFxStatusUpdateData {
        return new VariableFxStatusUpdateData(this.statusKey, this.isInitialize, this.isUserEntity, this.entityId, this.value, this.overrideMinValue, this.overrideMaxValue, this.extra.clone());
    }
}
