import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxIconDefinition {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.rendering::VariableFxIconDefinition'); }

    declare public name: string;

    declare public assetName: string;

    declare public offsetX: number;
    static { (this.prototype as any).offsetX = 0; }

    declare public offsetY: number;
    static { (this.prototype as any).offsetY = 0; }

    constructor(param1: string, param2: string, param3: number = 0, param4: number = 0) {
        this.name = param1;
        this.assetName = param2;
        this.offsetX = param3;
        this.offsetY = param4;
    }
}
