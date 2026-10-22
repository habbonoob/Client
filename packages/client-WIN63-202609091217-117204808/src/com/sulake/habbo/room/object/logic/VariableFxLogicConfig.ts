import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxLogicConfig {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic::VariableFxLogicConfig'); }

    declare public configId: number;
    static { (this.prototype as any).configId = 0; }

    declare public isUserFx: boolean;
    static { (this.prototype as any).isUserFx = false; }

    declare public showMode: number;
    static { (this.prototype as any).showMode = 0; }

    declare public _SafeStr_14413: number;
    static { (this.prototype as any)._SafeStr_14413 = 0; }

    declare public showOnMouseHover: boolean;
    static { (this.prototype as any).showOnMouseHover = false; }

    declare public showDuration: number;
    static { (this.prototype as any).showDuration = 0; }

    declare public updateId: number;
    static { (this.prototype as any).updateId = 0; }

    constructor(param1: number, param2: boolean, param3: number, param4: number, param5: boolean, param6: number, param7: number = 0) {
        this.configId = param1;
        this.isUserFx = param2;
        this.showMode = param3;
        this._SafeStr_14413 = param4;
        this.showOnMouseHover = param5;
        this.showDuration = param6;
        this.updateId = param7;
    }
}
