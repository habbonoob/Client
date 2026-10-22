import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AbstractLevelUpConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/AbstractLevelUpConfig';

export class InterpolateLevelUpper extends AbstractLevelUpConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.levelupper::InterpolateLevelUpper'); }

    private static generateTree(param1: UtilsMap): UtilsMap {
        let _loc3_: number = 0;
        let _loc4_: UtilsMap = new UtilsMap();
        _loc4_.add(0, 1);
        for (const _loc2_ of param1.getKeys() ?? []) {
            _loc3_ = param1.getValue(_loc2_) | 0;
            _loc4_.add(_loc3_, _loc2_);
        }
        return _loc4_;
    }

    constructor(param1: UtilsMap) {
        super();
        this._SafeStr_4643 = InterpolateLevelUpper.generateTree(param1);
    }

    declare private _SafeStr_4643: UtilsMap;

    public override get maxLevel(): number {
        return this._SafeStr_4643[this.getLowerEntryKey(2147483647) | 0] | 0;
    }

    public override xpForLevel(param1: number): number {
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc9_: number = 0;
        let _loc10_: number = 0;
        let _loc6_: number = NaN;
        let _loc8_: number = 0;
        if (param1 <= 1) {
            return 0;
        }
        let _loc4_: number = 0;
        for (const _loc7_ of this._SafeStr_4643.getKeys() ?? []) {
            _loc5_ = this._SafeStr_4643.getValue(_loc7_) | 0;
            if (_loc5_ == param1) {
                return Number(_loc7_);
            }
            if (_loc5_ > param1) {
                _loc2_ = this._SafeStr_4643.getValue(this.getLowerEntryKey(_loc7_ | 0)) | 0;
                _loc3_ = this.getLowerEntryKey(_loc7_ | 0) | 0;
                _loc9_ = _loc5_ - _loc2_;
                _loc10_ = _loc7_ - _loc3_ | 0;
                _loc6_ = _loc10_ / _loc9_;
                _loc8_ = param1 - _loc2_;
                return _loc3_ + (_loc6_ * _loc8_ | 0);
            }
            _loc4_ = _loc7_ | 0;
        }
        return _loc4_;
    }

    private getLowerEntryKey(param1: number): any {
        let _loc2_: any = null;
        for (const _loc3_ of this._SafeStr_4643.getKeys() ?? []) {
            if (_loc3_ < param1 && (_loc2_ == null || _loc3_ > _loc2_)) {
                _loc2_ = _loc3_;
            }
        }
        return _loc2_;
    }
}
