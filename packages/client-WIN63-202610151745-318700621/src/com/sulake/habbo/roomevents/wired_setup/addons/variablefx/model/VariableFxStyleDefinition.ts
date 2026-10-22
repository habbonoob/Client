import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { VariableFxOption } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxOption';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class VariableFxStyleDefinition {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.model::VariableFxStyleDefinition'); }

    declare public id: number;
    static { (this.prototype as any).id = 0; }

    declare public localizationKey: string;

    declare public runtimeStyle: string;

    declare public colorOptions: any[];

    declare public widthOptions: any[];

    declare public rendererOptions: any[];

    declare public defaultColor: VariableFxOption;

    declare public defaultWidth: VariableFxOption;

    declare public defaultRenderer: VariableFxOption;

    declare public extra: UtilsMap;

    declare public defaultStatusExtra: UtilsMap;

    declare public supportsIcon: boolean;
    static { (this.prototype as any).supportsIcon = false; }

    constructor(param1: number, param2: string, param3: string, param4: any[], param5: any[], param6: any[], param7: VariableFxOption, param8: VariableFxOption, param9: VariableFxOption, param10: UtilsMap = null, param11: UtilsMap = null, param12: boolean = false) {
        this.id = param1;
        this.localizationKey = param2;
        this.runtimeStyle = param3;
        this.colorOptions = param4 == null ? [] : param4;
        this.widthOptions = param5 == null ? [] : param5;
        this.rendererOptions = param6 == null ? [] : param6;
        this.defaultColor = param7;
        this.defaultWidth = param8;
        this.defaultRenderer = param9;
        this.extra = param10 == null ? new UtilsMap() : param10;
        this.defaultStatusExtra = param11 == null ? new UtilsMap() : param11;
        this.supportsIcon = param12;
    }

    public get hasColorOptions(): boolean {
        return this.colorOptions.length > 0 && this.defaultColor.runtimeValue != "NOT_APPLICABLE";
    }

    public get hasWidthOptions(): boolean {
        return this.widthOptions.length > 0 && this.defaultWidth.runtimeValue != "not_applicable";
    }

    public get hasRendererOptions(): boolean {
        return this.rendererOptions.length > 1;
    }
}
