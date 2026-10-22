import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class VariableFxPreviewStyleDefinition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx::VariableFxPreviewStyleDefinition'); }

    declare public allowedColors: any[];

    declare public allowedRenderers: any[];

    declare public allowedWidths: any[];

    declare public category: string;

    declare public categoryId: number;
    static { (this.prototype as any).categoryId = 0; }

    declare public defaultColor: string;

    declare public defaultRenderer: string;

    declare public defaultWidth: string;

    declare public defaultConfigExtra: UtilsMap;

    declare public defaultStatusExtra: UtilsMap;

    declare public serverStyle: string;

    declare public _SafeStr_14474: number;
    static { (this.prototype as any)._SafeStr_14474 = 0; }

    constructor(param1: any[], param2: any[], param3: any[], param4: string, param5: number, param6: string, param7: string, param8: string, param9: string, param10: number, param11: UtilsMap = null, param12: UtilsMap = null) {
        this.allowedColors = param1;
        this.allowedRenderers = param2;
        this.allowedWidths = param3;
        this.category = param4;
        this.categoryId = param5;
        this.defaultColor = param6;
        this.defaultRenderer = param7;
        this.defaultWidth = param8;
        this.serverStyle = param9;
        this._SafeStr_14474 = param10;
        this.defaultConfigExtra = param11 == null ? new UtilsMap() : param11;
        this.defaultStatusExtra = param12 == null ? new UtilsMap() : param12;
    }
}
