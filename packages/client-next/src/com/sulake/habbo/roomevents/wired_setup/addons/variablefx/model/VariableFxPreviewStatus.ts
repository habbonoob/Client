import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { _SafeCls_6106 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/_SafeCls_6106';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { _SafeCls_6073 } from '@/com/sulake/habbo/room/object/visualization/variablefx/_SafeCls_6073';
import { VariableFxStatusData } from '@/com/sulake/habbo/room/object/visualization/variablefx/VariableFxStatusData';
import { LinearLevelUpper } from '@/com/sulake/habbo/roomevents/wired_setup/addons/levelupper/LinearLevelUpper';
import { MathUtils } from '@/com/sulake/habbo/utils/MathUtils';

export class VariableFxPreviewStatus {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.model::VariableFxPreviewStatus'); }

    static #staticsReady = false;

    private static readonly MAX_LEVEL: number = 25;
    private static readonly _SafeStr_14627: number = 100;
    private static readonly TEAM_COLORS: any[] = ["#df291e", "#36b24a", "#3b7de3", "#ffd83d"];

    private static get LEVEL_UPPER(): LinearLevelUpper {
        VariableFxPreviewStatus.#initStatics();
        return VariableFxPreviewStatus.LEVEL_UPPER;
    }

    private _value: number = 50;
    private _SafeStr_14628: number = 0.5;
    private _delegatedColor: string = "#ffffff";
    private _SafeStr_14629: boolean = false;
    private _overrideMinValue: any = null;
    private _overrideMaxValue: any = null;

    constructor() {
    }

    private static copyExtra(param1: UtilsMap, param2: UtilsMap): void {
        let _loc3_: any = null;
        if (param1 == null) {
            return;
        }
        for (_loc3_ of param1.getKeys() ?? []) {
            param2[_loc3_] = param1.getValue(_loc3_);
        }
    }

    public randomize(param1: _SafeCls_6106): void {
        if (param1.colorId == _SafeCls_6073.resolveColorId("DYNAMIC_TEAM_COLOR")) {
            this._delegatedColor = stringOrNull(VariableFxPreviewStatus.TEAM_COLORS[Math.floor(Math.random() * VariableFxPreviewStatus.TEAM_COLORS.length)]);
        }
        this.updateHealthPointPreviewOverrides(param1);
        if (param1.categoryId == 2) {
            this.randomizeLevel(param1);
        } else {
            this.randomizeNormal(param1);
        }
        this._SafeStr_14629 = true;
    }

    private randomizeNormal(param1: _SafeCls_6106): void {
        let _loc2_: number = this._overrideMinValue != null ? this._overrideMinValue | 0 : param1.defaultMinValue;
        let _loc3_: number = this._overrideMaxValue != null ? this._overrideMaxValue | 0 : param1.defaultMaxValue;
        if (_loc3_ <= _loc2_) {
            _loc2_ = 0;
            _loc3_ = 100;
        }
        let _loc5_: number = this._value;
        let _loc4_: number = this._SafeStr_14628;
        let _loc6_: number = 0;
        while ((_loc5_ == this._value || Math.abs(_loc4_ - this._SafeStr_14628) < 0.2) && _loc6_ < 50) {
            this._value = _loc2_ + Math.round(Math.random() * (_loc3_ - _loc2_));
            _loc4_ = (this._value - _loc2_) / (_loc3_ - _loc2_);
            _loc6_ += 1;
        }
        this._SafeStr_14628 = _loc4_;
    }

    private randomizeLevel(param1: _SafeCls_6106): void {
        let _loc5_: number = NaN;
        let _loc2_: number = Math.random();
        if (_loc2_ < 0.25) {
            this.randomizeNormal(param1);
            return;
        }
        let _loc3_: number = VariableFxPreviewStatus.LEVEL_UPPER.currentLevel(this._value);
        if (_loc2_ < 0.65) {
            _loc5_ = Math.random();
            if (_loc3_ < VariableFxPreviewStatus.LEVEL_UPPER.maxLevel && (_loc3_ <= 1 || _loc5_ < 0.5)) {
                this._value += 100;
                this._overrideMinValue = VariableFxPreviewStatus.LEVEL_UPPER.xpForLevel(_loc3_ + 1);
                this._overrideMaxValue = VariableFxPreviewStatus.LEVEL_UPPER.xpForLevel(Math.min(25, _loc3_ + 2) | 0);
            } else {
                this._value -= 100;
                this._overrideMinValue = VariableFxPreviewStatus.LEVEL_UPPER.xpForLevel(_loc3_ - 1);
                this._overrideMaxValue = VariableFxPreviewStatus.LEVEL_UPPER.xpForLevel(_loc3_);
            }
            this.randomizeNormal(param1);
            return;
        }
        let _loc7_: number = -25 + Math.random() * (2 * 25) | 0;
        let _loc6_: number = 0;
        while ((_loc3_ + _loc7_ < 1 || _loc3_ + _loc7_ > 25) && _loc6_ < 50) {
            _loc7_ = -25 + Math.random() * (2 * 25) | 0;
            _loc6_ += 1;
        }
        this._value += MathUtils.clamp(_loc7_ * 100, 0, 100 * (25 + 1));
        let _loc4_: number = _loc3_ + _loc7_;
        if (_loc4_ == 25) {
            this._overrideMinValue = this._value;
            this._overrideMaxValue = this._value;
            this._SafeStr_14628 = 1;
            return;
        }
        this._overrideMinValue = VariableFxPreviewStatus.LEVEL_UPPER.xpForLevel(_loc4_);
        this._overrideMaxValue = VariableFxPreviewStatus.LEVEL_UPPER.xpForLevel(_loc4_ + 1);
        this.randomizeNormal(param1);
    }

    public toStatusData(param1: _SafeCls_6106 = null): VariableFxStatusData {
        let _loc2_: UtilsMap = new UtilsMap();
        if (param1 != null) {
            VariableFxPreviewStatus.copyExtra(param1.currentStyle().defaultStatusExtra, _loc2_);
            this.updateHealthPointPreviewOverrides(param1);
            if (this._delegatedColor == "#ffffff" && param1.colorId == _SafeCls_6073.resolveColorId("DYNAMIC_TEAM_COLOR")) {
                this._delegatedColor = stringOrNull(VariableFxPreviewStatus.TEAM_COLORS[0]);
            }
        }
        if (this._SafeStr_14629 || _loc2_.getValue("current_level") == null) {
            _loc2_["current_level"] = VariableFxPreviewStatus.LEVEL_UPPER.currentLevel(this._value);
        }
        if (this._SafeStr_14629 || _loc2_.getValue("is_maxed") == null) {
            _loc2_["is_maxed"] = VariableFxPreviewStatus.LEVEL_UPPER.isMaxed(this._value);
        }
        if (this._SafeStr_14629 || _loc2_.getValue("max_level") == null) {
            _loc2_["max_level"] = VariableFxPreviewStatus.LEVEL_UPPER.maxLevel;
        }
        if (this._SafeStr_14629 || _loc2_.getValue("delegated_color") == null) {
            _loc2_["delegated_color"] = this._delegatedColor;
        }
        return new VariableFxStatusData(this._value, this._overrideMinValue, this._overrideMaxValue, _loc2_, false);
    }

    private updateHealthPointPreviewOverrides(param1: _SafeCls_6106): void {
        if (param1.categoryId != 0) {
            return;
        }
        if (param1.rendererId == 12) {
            this.applyStackedHeartPreviewOverrides(param1);
        } else {
            this._overrideMinValue = null;
            this._overrideMaxValue = null;
        }
    }

    private applyStackedHeartPreviewOverrides(param1: _SafeCls_6106): void {
        let _loc2_: number = param1.defaultMaxValue - param1.defaultMinValue;
        this._overrideMinValue = 0;
        this._overrideMaxValue = param1._SafeStr_14429 == _SafeCls_6073.resolveWidthId("medium") ? 9 : 15;
        this._overrideMaxValue = MathUtils.clamp(Number(this._overrideMaxValue), 1, _loc2_);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (VariableFxPreviewStatus.#staticsReady) return;
        VariableFxPreviewStatus.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(VariableFxPreviewStatus, name, { value, writable: true, configurable: true, enumerable: true });
        set("LEVEL_UPPER", null);
        set("LEVEL_UPPER", new LinearLevelUpper(100, 25));
    }
}
