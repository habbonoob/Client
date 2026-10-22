import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxStatusModelEntry } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusModelEntry';

export class VariableFxStatusModelData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.variablefx::VariableFxStatusModelData'); }

    declare public updateId: number;
    static { (this.prototype as any).updateId = 0; }

    declare public statusesByConfig: UtilsMap;

    constructor(param1: number, param2: UtilsMap) {
        this.updateId = param1;
        this.statusesByConfig = param2;
    }

    public clone(): VariableFxStatusModelData {
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc6_: UtilsMap = null;
        let _loc1_: UtilsMap = null;
        let _loc7_: number = 0;
        let _loc8_: string = null;
        let _loc2_: VariableFxStatusModelEntry = null;
        let _loc3_: UtilsMap = new UtilsMap();
        _loc5_ = 0;
        while (_loc5_ < this.statusesByConfig.length) {
            _loc4_ = this.statusesByConfig.getKey(_loc5_) | 0;
            _loc6_ = asInstanceOf(this.statusesByConfig.getWithIndex(_loc5_), UtilsMap);
            _loc1_ = new UtilsMap();
            _loc7_ = 0;
            while (_loc7_ < _loc6_.length) {
                _loc8_ = stringOrNull(_loc6_.getKey(_loc7_));
                _loc2_ = asInstanceOf(_loc6_.getWithIndex(_loc7_), VariableFxStatusModelEntry);
                _loc1_.add(_loc8_, _loc2_.clone());
                _loc7_++;
            }
            _loc3_.add(_loc4_, _loc1_);
            _loc5_++;
        }
        return new VariableFxStatusModelData(this.updateId, _loc3_);
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc3_: UtilsMap = null;
        let _loc4_: number = 0;
        let _loc1_: VariableFxStatusModelEntry = null;
        if (this.statusesByConfig != null) {
            _loc2_ = 0;
            while (_loc2_ < this.statusesByConfig.length) {
                _loc3_ = asInstanceOf(this.statusesByConfig.getWithIndex(_loc2_), UtilsMap);
                _loc4_ = 0;
                while (_loc4_ < _loc3_.length) {
                    _loc1_ = asInstanceOf(_loc3_.getWithIndex(_loc4_), VariableFxStatusModelEntry);
                    _loc1_.dispose();
                    _loc4_++;
                }
                _loc3_.dispose();
                _loc2_++;
            }
            this.statusesByConfig.dispose();
            this.statusesByConfig = null;
        }
    }
}
