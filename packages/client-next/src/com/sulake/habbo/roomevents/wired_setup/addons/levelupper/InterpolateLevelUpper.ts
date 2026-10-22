import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { AbstractLevelUpConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/AbstractLevelUpConfig';

export class InterpolateLevelUpper extends AbstractLevelUpConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.levelupper::InterpolateLevelUpper'); }

    declare private _SafeStr_4643: UtilsMap;

    declare private _maxedProgressInfo: LevelUpProgressInfo;

    constructor(param1: UtilsMap) {
        super();
        this._SafeStr_4643 = InterpolateLevelUpper.generateTree(param1);
        this._maxedProgressInfo = this.findProgressInfoForMax();
    }

    private static generateTree(param1: UtilsMap): UtilsMap {
        let _loc3_: number = 0;
        let _loc4_: UtilsMap = new UtilsMap();
        for (const _loc2_ of param1.getKeys() ?? []) {
            _loc3_ = param1.getValue(_loc2_) | 0;
            _loc4_.add(_loc3_, _loc2_);
        }
        return _loc4_;
    }

    private findProgressInfoForMax(): LevelUpProgressInfo {
        let _loc1_: any = null;
        let _loc3_: number = NaN;
        let _loc2_: number = NaN;
        if (this._SafeStr_4643.length == 0) {
            return new LevelUpProgressInfo(1, 1, 0, 0, 0, true);
        }
        _loc1_ = this.lastEntryKey();
        _loc3_ = Number(this._SafeStr_4643.getValue(_loc1_));
        _loc2_ = Number(_loc1_);
        return new LevelUpProgressInfo(_loc3_, _loc3_, _loc2_, _loc2_, _loc2_, true);
    }

    private findProgressInfo(param1: number): LevelUpProgressInfo {
        let _loc2_: any = null;
        let _loc7_: any = null;
        let _loc3_: number = NaN;
        let _loc6_: number = NaN;
        let _loc4_: number = NaN;
        let _loc13_: number = NaN;
        let _loc17_: number = NaN;
        let _loc18_: number = NaN;
        let _loc9_: number = NaN;
        let _loc5_: number = NaN;
        let _loc11_: number = NaN;
        let _loc12_: number = NaN;
        let _loc8_: number = NaN;
        let _loc10_: number = -1;
        let _loc14_: number = -1;
        let _loc15_: boolean = true;
        let _loc16_: boolean = true;
        param1 = this.boundedValue(param1);
        _loc2_ = this.floorEntryKey(param1);
        _loc7_ = this.ceilingEntryKey(param1 + 1);
        if (_loc7_ == null) {
            return this._maxedProgressInfo;
        }
        _loc3_ = _loc2_ == null ? 1 : Number(this._SafeStr_4643.getValue(_loc2_));
        _loc6_ = _loc2_ == null ? 0 : Number(_loc2_);
        _loc4_ = Number(this._SafeStr_4643.getValue(_loc7_));
        _loc13_ = Number(_loc7_);
        _loc17_ = _loc4_ - _loc3_;
        _loc18_ = _loc13_ - _loc6_;
        _loc9_ = _loc18_ / _loc17_;
        _loc5_ = param1 - _loc6_;
        _loc11_ = Math.min(Math.max(_loc5_ / _loc9_ | 0, 0), _loc17_ - 1);
        _loc12_ = _loc3_ + _loc11_;
        _loc8_ = _loc6_ + (_loc9_ * _loc11_ | 0);
        while (_loc15_) {
            _loc15_ = false;
            if (_loc11_ == _loc17_ - 1) {
                _loc10_ = _loc4_;
                _loc14_ = _loc13_;
            } else {
                _loc10_ = _loc3_ + (_loc11_ + 1);
                _loc14_ = _loc6_ + (_loc9_ * (_loc11_ + 1) | 0);
                if (_loc16_ && _loc5_ + _loc6_ >= _loc14_) {
                    _loc11_++;
                    _loc12_ = _loc3_ + _loc11_;
                    _loc8_ = _loc6_ + (_loc9_ * _loc11_ | 0);
                    _loc15_ = true;
                    _loc16_ = false;
                }
            }
        }
        return new LevelUpProgressInfo(_loc12_, _loc10_, _loc8_, param1, _loc14_, false);
    }

    public override xpForLevel(param1: number): number {
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc8_: any = null;
        let _loc10_: number = 0;
        let _loc11_: number = 0;
        let _loc6_: number = NaN;
        let _loc9_: number = 0;
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
                _loc8_ = this.getLowerEntryKey(_loc7_ | 0);
                if (_loc8_ == null) {
                    _loc2_ = 1;
                    _loc3_ = 0;
                } else {
                    _loc2_ = this._SafeStr_4643.getValue(_loc8_) | 0;
                    _loc3_ = _loc8_ | 0;
                }
                _loc10_ = _loc5_ - _loc2_;
                _loc11_ = _loc7_ - _loc3_ | 0;
                _loc6_ = _loc11_ / _loc10_;
                _loc9_ = param1 - _loc2_;
                return _loc3_ + (_loc6_ * _loc9_ | 0);
            }
            _loc4_ = _loc7_ | 0;
        }
        return _loc4_;
    }

    public override get maxLevel(): number {
        return this._maxedProgressInfo.currentLevel | 0;
    }

    public override get maxXp(): number {
        return this._maxedProgressInfo.currentLevelXp;
    }

    public override currentLevel(param1: number): number {
        return this.findProgressInfo(param1).currentLevel | 0;
    }

    public override totalXpRequired(param1: number): number {
        let _loc2_: LevelUpProgressInfo = this.findProgressInfo(param1);
        return _loc2_.nextLevelXp - _loc2_.currentLevelXp;
    }

    public override progress(param1: number): number {
        let _loc2_: LevelUpProgressInfo = this.findProgressInfo(param1);
        return _loc2_.currentXp - _loc2_.currentLevelXp;
    }

    public override progressPercentage(param1: number): number {
        let _loc4_: LevelUpProgressInfo = this.findProgressInfo(param1);
        let _loc3_: number = _loc4_.nextLevelXp - _loc4_.currentLevelXp;
        let _loc2_: number = _loc4_.currentXp - _loc4_.currentLevelXp;
        return _loc2_ / _loc3_ * 100 | 0;
    }

    public override xpRemaining(param1: number): number {
        let _loc2_: LevelUpProgressInfo = this.findProgressInfo(param1);
        return _loc2_.nextLevelXp - _loc2_.currentXp;
    }

    public override isMaxed(param1: number): boolean {
        return this.findProgressInfo(param1).isMaxed;
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

    private floorEntryKey(param1: number): any {
        let _loc2_: any = null;
        for (const _loc3_ of this._SafeStr_4643.getKeys() ?? []) {
            if (_loc3_ <= param1 && (_loc2_ == null || _loc3_ > _loc2_)) {
                _loc2_ = _loc3_;
            }
        }
        return _loc2_;
    }

    private ceilingEntryKey(param1: number): any {
        let _loc3_: any = null;
        for (const _loc2_ of this._SafeStr_4643.getKeys() ?? []) {
            if (_loc2_ >= param1 && (_loc3_ == null || _loc2_ < _loc3_)) {
                _loc3_ = _loc2_;
            }
        }
        return _loc3_;
    }

    private lastEntryKey(): any {
        let _loc1_: any = null;
        for (const _loc2_ of this._SafeStr_4643.getKeys() ?? []) {
            if (_loc1_ == null || _loc2_ > _loc1_) {
                _loc1_ = _loc2_;
            }
        }
        return _loc1_;
    }
}

class LevelUpProgressInfo {
    declare public currentLevel: number;
    static { (this.prototype as any).currentLevel = NaN; }

    declare public nextLevel: number;
    static { (this.prototype as any).nextLevel = NaN; }

    declare public currentLevelXp: number;
    static { (this.prototype as any).currentLevelXp = NaN; }

    declare public currentXp: number;
    static { (this.prototype as any).currentXp = NaN; }

    declare public nextLevelXp: number;
    static { (this.prototype as any).nextLevelXp = NaN; }

    declare public isMaxed: boolean;
    static { (this.prototype as any).isMaxed = false; }

    constructor(param1: number, param2: number, param3: number, param4: number, param5: number, param6: boolean) {
        this.currentLevel = param1;
        this.nextLevel = param2;
        this.currentLevelXp = param3;
        this.currentXp = param4;
        this.nextLevelXp = param5;
        this.isMaxed = param6;
    }
}
