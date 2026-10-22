import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class VariableFxLogicStatus {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic::VariableFxLogicStatus'); }

    declare public configId: number;
    static { (this.prototype as any).configId = 0; }

    declare public variableId: string;

    declare public value: number;
    static { (this.prototype as any).value = NaN; }

    declare public overrideMinValue: any;

    declare public overrideMaxValue: any;

    declare public extra: UtilsMap;

    declare public isInitialize: boolean;
    static { (this.prototype as any).isInitialize = false; }

    declare public createdAt: number;
    static { (this.prototype as any).createdAt = 0; }

    declare public updatedAt: number;
    static { (this.prototype as any).updatedAt = 0; }

    declare public updateId: number;
    static { (this.prototype as any).updateId = 0; }

    declare public _SafeStr_14785: number;
    static { (this.prototype as any)._SafeStr_14785 = 0; }

    constructor(param1: number, param2: string, param3: number, param4: any, param5: any, param6: UtilsMap, param7: boolean, param8: number) {
        this.configId = param1;
        this.variableId = param2;
        this.value = param3;
        this.overrideMinValue = param4;
        this.overrideMaxValue = param5;
        this.extra = param6 == null ? new UtilsMap() : param6;
        this.isInitialize = param7;
        this.createdAt = param8;
        this.updatedAt = param8;
        this.updateId = 0;
        this._SafeStr_14785 = 0;
    }

    public dispose(): void {
        if (this.extra != null) {
            this.extra.dispose();
            this.extra = null;
        }
    }
}
