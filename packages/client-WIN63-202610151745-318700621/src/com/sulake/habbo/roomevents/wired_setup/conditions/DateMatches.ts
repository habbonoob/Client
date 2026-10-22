import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ChronoMaskFilterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/ChronoMaskFilterPreset';
import type { ChronoRangeFilterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/ChronoRangeFilterPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ChronoFieldRangeFilter } from '@/com/sulake/habbo/roomevents/wired_setup/common/utils/ChronoFieldRangeFilter';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { TimeBasedCondition } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/TimeBasedCondition';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class DateMatches extends TimeBasedCondition {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::DateMatches'); }

    declare private _SafeStr_5107: ChronoMaskFilterPreset;

    declare private _SafeStr_5318: ChronoRangeFilterPreset;

    declare private _SafeStr_5431: ChronoMaskFilterPreset;

    declare private _SafeStr_4957: ChronoRangeFilterPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.DATE_MATCHES;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: string = this.l("time.skip");
        let _loc5_: string = this.l("time.exact");
        let _loc10_: string = this.l("time.range");
        this._SafeStr_5107 = param1.createChronoMaskFilter(this.buildWeekdayLabels(), 2);
        this._SafeStr_5318 = param1.createChronoRangeFilter(_loc4_, _loc5_, _loc10_, 1, 1, 31, 25);
        this._SafeStr_5431 = param1.createChronoMaskFilter(this.buildMonthLabels(), 3);
        this._SafeStr_4957 = param1.createChronoRangeFilter(_loc4_, _loc5_, _loc10_, 0, 0, 9999, 35);
        let _loc8_: SectionPreset = param1.createSection(this.l("time.weekday_selection"), this._SafeStr_5107);
        let _loc11_: SectionPreset = param1.createSection(this.l("time.day_selection"), this._SafeStr_5318);
        let _loc7_: SectionPreset = param1.createSection(this.l("time.month_selection"), this._SafeStr_5431);
        let _loc9_: SectionPreset = param1.createSection(this.l("time.year_selection"), this._SafeStr_4957);
        let _loc6_: SectionPreset = this.createTimezoneSection(param1);
        param3.addElements(_loc8_, _loc11_, _loc7_, _loc9_, _loc6_);
    }

    public override onEditStart(param1: Triggerable): void {
        super.onEditStart(param1);
        let _loc8_: number = param1.intParams[0] | 0;
        let _loc5_: number = param1.intParams[1] | 0;
        let _loc6_: number = param1.intParams[2] | 0;
        let _loc2_: number = param1.intParams[3] | 0;
        let _loc7_: number = param1.intParams[4] | 0;
        let _loc9_: number = param1.intParams[5] | 0;
        let _loc3_: number = param1.intParams[6] | 0;
        let _loc4_: number = param1.intParams[7] | 0;
        this._SafeStr_5107.mask = _loc6_;
        this._SafeStr_5318.applyFilter(new ChronoFieldRangeFilter("day", _loc8_ == 1, _loc2_, _loc7_, 1));
        this._SafeStr_5431.mask = _loc9_;
        this._SafeStr_4957.applyFilter(new ChronoFieldRangeFilter("year", _loc5_ == 1, _loc3_, _loc4_, 0));
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        let _loc2_: ChronoFieldRangeFilter = this._SafeStr_5318.getFilter("day");
        let _loc3_: ChronoFieldRangeFilter = this._SafeStr_4957.getFilter("year");
        _loc1_.push(_loc2_.useFilter ? 1 : 0);
        _loc1_.push(_loc3_.useFilter ? 1 : 0);
        _loc1_.push(this._SafeStr_5107.mask);
        _loc1_.push(_loc2_.min);
        _loc1_.push(_loc2_.max);
        _loc1_.push(this._SafeStr_5431.mask);
        _loc1_.push(_loc3_.min);
        _loc1_.push(_loc3_.max);
        return _loc1_;
    }

    private buildWeekdayLabels(): any[] {
        let _loc1_: number = 0;
        let _loc2_: any[] = [];
        _loc1_ = 1;
        while (_loc1_ <= 7) {
            _loc2_.push(this.l("time.weekday." + _loc1_));
            _loc1_++;
        }
        return _loc2_;
    }

    private buildMonthLabels(): any[] {
        let _loc1_: number = 0;
        let _loc2_: any[] = [];
        _loc1_ = 1;
        while (_loc1_ <= 12) {
            _loc2_.push(this.l("time.month." + _loc1_));
            _loc1_++;
        }
        return _loc2_;
    }
}
