import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class VariableFxConfigUpdateData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.variablefx::VariableFxConfigUpdateData'); }

    declare public configId: number;
    static { (this.prototype as any).configId = 0; }

    declare public isUserFx: boolean;
    static { (this.prototype as any).isUserFx = false; }

    declare public showMode: number;
    static { (this.prototype as any).showMode = 0; }

    declare public _SafeStr_14471: number;
    static { (this.prototype as any)._SafeStr_14471 = 0; }

    declare public showOnMouseHover: boolean;
    static { (this.prototype as any).showOnMouseHover = false; }

    declare public showDuration: number;
    static { (this.prototype as any).showDuration = 0; }

    declare public categoryId: number;
    static { (this.prototype as any).categoryId = 0; }

    declare public _SafeStr_14474: number;
    static { (this.prototype as any)._SafeStr_14474 = 0; }

    declare public colorId: number;
    static { (this.prototype as any).colorId = 0; }

    declare public _SafeStr_14472: number;
    static { (this.prototype as any)._SafeStr_14472 = 0; }

    declare public rendererId: number;
    static { (this.prototype as any).rendererId = 0; }

    declare public defaultMinValue: number;
    static { (this.prototype as any).defaultMinValue = NaN; }

    declare public defaultMaxValue: number;
    static { (this.prototype as any).defaultMaxValue = NaN; }

    declare public extra: UtilsMap;

    constructor(param1: number, param2: boolean, param3: number, param4: number, param5: boolean, param6: number, param7: number, param8: number, param9: number, param10: number, param11: number, param12: number, param13: number, param14: UtilsMap) {
        this.configId = param1;
        this.isUserFx = param2;
        this.showMode = param3;
        this._SafeStr_14471 = param4;
        this.showOnMouseHover = param5;
        this.showDuration = param6;
        this.categoryId = param7;
        this._SafeStr_14474 = param8;
        this.colorId = param9;
        this._SafeStr_14472 = param10;
        this.rendererId = param11;
        this.defaultMinValue = param12;
        this.defaultMaxValue = param13;
        this.extra = param14 == null ? new UtilsMap() : param14;
    }
}
