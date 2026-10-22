import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { VariableFxStyleDefinition } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxStyleDefinition';

export class VariableFxCategoryDefinition {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.model::VariableFxCategoryDefinition'); }

    declare public id: number;
    static { (this.prototype as any).id = 0; }

    declare public runtimeCategory: string;

    declare public styles: any[];

    constructor(param1: number, param2: string, param3: any[]) {
        this.id = param1;
        this.runtimeCategory = param2;
        this.styles = param3;
    }

    public getStyle(param1: number): VariableFxStyleDefinition {
        for (const _loc2_ of this.styles ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return asInstanceOf(this.styles[0], VariableFxStyleDefinition);
    }
}
