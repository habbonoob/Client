import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableFxStatusRemoveData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.variablefx::VariableFxStatusRemoveData'); }

    declare public fullKey: string;

    declare public configId: number;
    static { (this.prototype as any).configId = 0; }

    declare public variableId: string;

    declare public isUserEntity: boolean;
    static { (this.prototype as any).isUserEntity = false; }

    declare public entityId: number;
    static { (this.prototype as any).entityId = 0; }

    constructor(param1: string) {
        let _loc2_: number = param1.indexOf("|");
        let _loc4_: number = param1.lastIndexOf("|");
        let _loc3_: number = param1.lastIndexOf("|", _loc4_ - 1);
        this.fullKey = param1;
        this.configId = Number(param1.substr(0, _loc2_)) | 0;
        this.variableId = param1.substring(_loc2_ + 1, _loc3_);
        this.isUserEntity = param1.substring(_loc3_ + 1, _loc4_) == "u";
        this.entityId = Number(param1.substr(_loc4_ + 1)) | 0;
    }
}
