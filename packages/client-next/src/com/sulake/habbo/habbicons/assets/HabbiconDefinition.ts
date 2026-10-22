import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabbiconDefinition {
    static { registerClassName(this, 'com.sulake.habbo.habbicons.assets::HabbiconDefinition'); }

    declare public previewWidth: number;
    static { (this.prototype as any).previewWidth = 0; }

    declare public previewHeight: number;
    static { (this.prototype as any).previewHeight = 0; }

    declare public direction: number;
    static { (this.prototype as any).direction = 0; }

    declare public animated: boolean;
    static { (this.prototype as any).animated = false; }

    declare public loop: boolean;
    static { (this.prototype as any).loop = false; }

    declare public frames: any[];

    declare public steps: any[];

    constructor(param1: number, param2: number, param3: number, param4: boolean, param5: boolean, param6: any[], param7: any[]) {
        this.previewWidth = param1;
        this.previewHeight = param2;
        this.direction = param3;
        this.animated = param4;
        this.loop = param5;
        this.frames = param6;
        this.steps = param7;
    }
}
