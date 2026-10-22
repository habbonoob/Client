import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxClipRect {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.variablefx.rendering::VariableFxClipRect'); }

    declare public x: number;
    static { (this.prototype as any).x = 0; }

    declare public y: number;
    static { (this.prototype as any).y = 0; }

    declare public width: number;
    static { (this.prototype as any).width = 0; }

    declare public height: number;
    static { (this.prototype as any).height = 0; }

    constructor(param1: number = 0, param2: number = 0, param3: number = 0, param4: number = 0) {
        this.x = param1;
        this.y = param2;
        this.width = param3;
        this.height = param4;
    }
}
