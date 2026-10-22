import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ChronoRangeFilterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/ChronoRangeFilterPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ChronoFieldRangeFilter } from '@/com/sulake/habbo/roomevents/wired_setup/common/utils/ChronoFieldRangeFilter';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { TimeBasedCondition } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/TimeBasedCondition';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class TimeMatches extends TimeBasedCondition {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::TimeMatches'); }

    private static SECONDS_CONTAINER_NAME: string = "second";
    private static MINUTES_CONTAINER_NAME: string = "minute";
    private static HOURS_CONTAINER_NAME: string = "hour";

    constructor() {
        super();
    }

    declare private _SafeStr_5215: ChronoRangeFilterPreset;

    declare private _SafeStr_5407: ChronoRangeFilterPreset;

    declare private _SafeStr_5100: ChronoRangeFilterPreset;

    public override get code(): number {
        return ConditionCodes.TIME_MATCHES;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: string = this.l("time.skip");
        let _loc6_: string = this.l("time.exact");
        let _loc9_: string = this.l("time.range");
        this._SafeStr_5100 = param1.createChronoRangeFilter(_loc4_, _loc6_, _loc9_, 0, 0, 23, 25);
        this._SafeStr_5407 = param1.createChronoRangeFilter(_loc4_, _loc6_, _loc9_, 0, 0, 59, 25);
        this._SafeStr_5215 = param1.createChronoRangeFilter(_loc4_, _loc6_, _loc9_, 0, 0, 59, 25);
        let _loc8_: SectionPreset = param1.createSection(this.l("time.hour_selection"), this._SafeStr_5100);
        let _loc10_: SectionPreset = param1.createSection(this.l("time.minute_selection"), this._SafeStr_5407);
        let _loc5_: SectionPreset = param1.createSection(this.l("time.second_selection"), this._SafeStr_5215);
        let _loc7_: SectionPreset = this.createTimezoneSection(param1);
        param3.addElements(_loc8_, _loc10_, _loc5_, _loc7_);
    }

    public override onEditStart(param1: Triggerable): void {
        super.onEditStart(param1);
        let _loc9_: number = param1.intParams[0] | 0;
        let _loc7_: number = param1.intParams[1] | 0;
        let _loc2_: number = param1.intParams[2] | 0;
        let _loc3_: number = param1.intParams[3] | 0;
        let _loc10_: number = param1.intParams[4] | 0;
        let _loc5_: number = param1.intParams[5] | 0;
        let _loc8_: number = param1.intParams[6] | 0;
        let _loc4_: number = param1.intParams[7] | 0;
        let _loc6_: number = param1.intParams[8] | 0;
        this._SafeStr_5215.applyFilter(new ChronoFieldRangeFilter(TimeMatches.SECONDS_CONTAINER_NAME, _loc9_ == 1, _loc3_, _loc10_, 0));
        this._SafeStr_5407.applyFilter(new ChronoFieldRangeFilter(TimeMatches.MINUTES_CONTAINER_NAME, _loc7_ == 1, _loc5_, _loc8_, 0));
        this._SafeStr_5100.applyFilter(new ChronoFieldRangeFilter(TimeMatches.HOURS_CONTAINER_NAME, _loc2_ == 1, _loc4_, _loc6_, 0));
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        let _loc3_: ChronoFieldRangeFilter = this._SafeStr_5215.getFilter(TimeMatches.SECONDS_CONTAINER_NAME);
        let _loc4_: ChronoFieldRangeFilter = this._SafeStr_5407.getFilter(TimeMatches.MINUTES_CONTAINER_NAME);
        let _loc2_: ChronoFieldRangeFilter = this._SafeStr_5100.getFilter(TimeMatches.HOURS_CONTAINER_NAME);
        _loc1_.push(_loc3_.useFilter ? 1 : 0);
        _loc1_.push(_loc4_.useFilter ? 1 : 0);
        _loc1_.push(_loc2_.useFilter ? 1 : 0);
        _loc1_.push(_loc3_.min);
        _loc1_.push(_loc3_.max);
        _loc1_.push(_loc4_.min);
        _loc1_.push(_loc4_.max);
        _loc1_.push(_loc2_.min);
        _loc1_.push(_loc2_.max);
        return _loc1_;
    }
}
