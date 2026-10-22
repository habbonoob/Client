import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import { isICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';

export class TimeBasedCondition extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::TimeBasedCondition'); }

    private _SafeStr_5696: string = "";

    declare private _timezoneDropdown: DropdownPreset;

    declare private _SafeStr_4375: SectionPreset;

    declare private _timezoneValues: string[];

    constructor() {
        super();
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: string = param1.stringParam == "" ? this._SafeStr_5696 : param1.stringParam;
        this.updateTimezoneOptions(_loc2_);
    }

    protected createTimezoneSection(param1: PresetManager): SectionPreset {
        this._timezoneDropdown = param1.createDropdown(new DropdownParam(this.loc("wiredfurni.tooltip.timezone"), this.buildTimezoneOptions(this._SafeStr_5696)));
        this._SafeStr_4375 = param1.createSection(this.l("time.timezone_selection"), this._timezoneDropdown);
        this._SafeStr_4375.visible = this._timezoneValues != null && this._timezoneValues.length > 1;
        return this._SafeStr_4375;
    }

    private updateTimezoneOptions(param1: string): void {
        if (this._timezoneDropdown == null) {
            this.buildTimezoneOptions(param1);
            return;
        }
        let _loc3_: ExpandableDropdownOption[] = this.buildTimezoneOptions(param1);
        let _loc2_: number = _loc3_.length > 0 ? 0 : -1;
        this._timezoneDropdown.reinit(_loc3_, _loc2_);
        if (this._SafeStr_4375 != null) {
            this._SafeStr_4375.visible = _loc3_.length > 1;
        }
    }

    private buildTimezoneOptions(param1: string): ExpandableDropdownOption[] {
        let _loc4_: number = 0;
        let _loc2_: string[] = this.getTimezones(param1);
        this._timezoneValues = _loc2_;
        let _loc3_: ExpandableDropdownOption[] = [];
        _loc4_ = 0;
        while (_loc4_ < _loc2_.length) {
            _loc3_.push(new ExpandableDropdownOption(_loc4_, _loc2_[_loc4_]));
            _loc4_++;
        }
        return _loc3_;
    }

    private getTimezones(param1: string): string[] {
        let _loc6_: number = 0;
        let _loc5_: string = null;
        let _loc3_: ICoreConfiguration = asGuarded(this.roomEvents.roomEngine, isICoreConfiguration);
        let _loc4_: string = _loc3_ == null ? null : _loc3_.getProperty("wired.timezones");
        let _loc2_: any[] = _loc4_ == null || _loc4_ == "" ? ["UTC"] : _loc4_.split(",");
        let _loc7_: string[] = [];
        if (param1 != "") {
            _loc7_.push(param1);
        }
        _loc6_ = 0;
        while (_loc6_ < _loc2_.length) {
            _loc5_ = stringOrNull(_loc2_[_loc6_]);
            if (_loc5_ != param1) {
                _loc7_.push(_loc5_);
            }
            _loc6_++;
        }
        return _loc7_;
    }

    public override readStringParamFromForm(): string {
        if (this._timezoneDropdown == null || this._timezoneValues == null) {
            return "";
        }
        let _loc1_: number = this._timezoneDropdown.selectedId;
        if (_loc1_ < 0 || _loc1_ >= this._timezoneValues.length) {
            return "";
        }
        let _loc2_: string = this._timezoneValues[_loc1_];
        this._SafeStr_5696 = _loc2_;
        return _loc2_;
    }
}
