import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class VariableFxStatusModelEntry {
    static { registerClassName(this, 'com.sulake.habbo.room.object.variablefx::VariableFxStatusModelEntry'); }

    declare public configId: number;
    static { (this.prototype as any).configId = 0; }

    declare public variableId: string;

    declare public createdAt: number;
    static { (this.prototype as any).createdAt = 0; }

    declare public updateId: number;
    static { (this.prototype as any).updateId = 0; }

    declare public value: number;
    static { (this.prototype as any).value = NaN; }

    declare public overrideMinValue: any;

    declare public overrideMaxValue: any;

    declare public extra: UtilsMap;

    declare public isInitialize: boolean;
    static { (this.prototype as any).isInitialize = false; }

    declare public invisible: boolean;
    static { (this.prototype as any).invisible = false; }

    constructor(param1: number, param2: string, param3: number, param4: number, param5: number, param6: any, param7: any, param8: UtilsMap, param9: boolean, param10: boolean = false) {
        this.configId = param1;
        this.variableId = param2;
        this.createdAt = param3;
        this.updateId = param4;
        this.value = param5;
        this.overrideMinValue = param6;
        this.overrideMaxValue = param7;
        this.extra = param8;
        this.isInitialize = param9;
        this.invisible = param10;
    }

    public clone(): VariableFxStatusModelEntry {
        return new VariableFxStatusModelEntry(this.configId, this.variableId, this.createdAt, this.updateId, this.value, this.overrideMinValue, this.overrideMaxValue, this.extra.clone(), this.isInitialize, this.invisible);
    }

    public dispose(): void {
        if (this.extra != null) {
            this.extra.dispose();
            this.extra = null;
        }
    }
}
