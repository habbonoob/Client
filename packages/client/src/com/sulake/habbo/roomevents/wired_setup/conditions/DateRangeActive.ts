import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { DateTimeFormatter } from '@habbo-pixi/runtime/globalization/DateTimeFormatter';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class DateRangeActive extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::DateRangeActive'); }

    private static readonly _SafeStr_7771: string = "yyyy/MM/dd HH:mm";

    private static parseDate(param1: string): number {
        return Date.parse(param1);
    }

    constructor() {
        super();
    }

    declare private _SafeStr_4527: TextInputPreset;

    declare private _SafeStr_4310: TextInputPreset;

    public override get code(): number {
        return ConditionCodes.DATE_RANGE_ACTIVE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc5_: string = "YYYY/MM/DD HH:MM";
        this._SafeStr_4527 = param1.createTextInput(new TextInputParam("", 1000, null, -1, null, true, _loc5_));
        this._SafeStr_4310 = param1.createTextInput(new TextInputParam("", 1000, null, -1, null, true, _loc5_));
        let _loc6_: SectionPreset = param1.createSection(this.l("startdate"), this._SafeStr_4527);
        let _loc4_: SectionPreset = param1.createSection(this.l("enddate"), this._SafeStr_4310);
        param3.addElements(_loc6_, _loc4_);
    }

    public override readIntParamsFromForm(): any[] {
        let _loc2_: number = NaN;
        let _loc1_: any[] = [];
        let _loc3_: number = DateRangeActive.parseDate(this._SafeStr_4527.text);
        if (!isNaN(_loc3_)) {
            _loc1_.push(_loc3_ / 1000 | 0);
            _loc2_ = DateRangeActive.parseDate(this._SafeStr_4310.text);
            if (!isNaN(_loc2_)) {
                _loc1_.push(_loc2_ / 1000 | 0);
            }
        }
        return _loc1_;
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc4_: Date = null;
        let _loc2_: Date = null;
        let _loc3_: DateTimeFormatter = new DateTimeFormatter("en-US");
        _loc3_.setDateTimePattern("yyyy/MM/dd HH:mm");
        if (param1.intParams.length > 0) {
            _loc4_ = new Date(param1.intParams[0] * 1000);
            this._SafeStr_4527.text = _loc3_.format(_loc4_);
        } else {
            this._SafeStr_4527.text = "";
        }
        if (param1.intParams.length > 1) {
            _loc2_ = new Date(param1.intParams[1] * 1000);
            this._SafeStr_4310.text = _loc3_.format(_loc2_);
        } else {
            this._SafeStr_4310.text = "";
        }
    }
}
