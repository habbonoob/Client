import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxOption {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.model::VariableFxOption'); }

    declare public id: number;
    static { (this.prototype as any).id = 0; }

    declare public key: string;

    declare public runtimeValue: string;

    constructor(param1: number, param2: string, param3: string = null) {
        this.id = param1;
        this.key = param2;
        this.runtimeValue = param3 == null ? param2 : param3;
    }
}
