import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxIconOverlayPlacement {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.rendering::VariableFxIconOverlayPlacement'); }

    declare public x: number;
    static { (this.prototype as any).x = 0; }

    declare public y: number;
    static { (this.prototype as any).y = 0; }

    constructor(param1: number, param2: number) {
        this.x = param1;
        this.y = param2;
    }
}
