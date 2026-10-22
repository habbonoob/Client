import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { WiredUserAction } from '@/com/sulake/habbo/roomevents/wired_setup/common/utils/WiredUserAction';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultTriggerConf } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/DefaultTriggerConf';
import { TriggerConfCodes } from '@/com/sulake/habbo/roomevents/wired_setup/triggerconfs/TriggerConfCodes';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';

export class PerformAction extends DefaultTriggerConf {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.triggerconfs::PerformAction'); }

    private static readonly SIGN_ACTION_CODE: number = 10;
    private static readonly DANCE_ACTION_CODE: number = 11;

    private static getActionByCode(param1: number): WiredUserAction {
        let _loc3_: number = 0;
        let _loc4_: WiredUserAction = null;
        let _loc2_: WiredUserAction[] = WiredUserAction._SafeStr_3577;
        _loc3_ = 0;
        while (_loc3_ < _loc2_.length) {
            _loc4_ = _loc2_[_loc3_];
            if (param1 == _loc4_.code) {
                return _loc4_;
            }
            _loc3_++;
        }
        return null;
    }

    constructor() {
        super();
    }

    declare private _actionDropdown: DropdownPreset;

    declare private _SafeStr_4328: CheckboxGroupPreset;

    declare private _SafeStr_4347: CheckboxGroupPreset;

    declare private _signDropdown: DropdownPreset;

    declare private _danceDropdown: DropdownPreset;

    declare private _SafeStr_4305: SectionPreset;

    declare private _SafeStr_4259: SectionPreset;

    public override get code(): number {
        return TriggerConfCodes._SafeStr_7503;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override onEditStart(param1: Triggerable): void {
        this._actionDropdown.selectedId = param1.intParams[0] | 0;
        this.updateExtraSections(param1.stringParam);
    }

    public override readStringParamFromForm(): string {
        let _loc1_: number = 0;
        let _loc2_: WiredUserAction = this.getSelectedAction();
        if (_loc2_ != null && _loc2_.hasExtra) {
            _loc1_ = this.getSelectedExtraCode(_loc2_.code);
            if (_loc1_ != -1) {
                return _loc2_.convertCodeToExtraString(_loc1_);
            }
        }
        return "";
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        let _loc2_: WiredUserAction = this.getSelectedAction();
        _loc1_.push(_loc2_ != null ? _loc2_.code : null);
        return _loc1_;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._actionDropdown = param1.createDropdown(new DropdownParam(this.loc("wiredfurni.tooltip.action"), this.buildActionOptions(), this.onActionSelected));
        let _loc4_: SectionPreset = param1.createSection(this.l("action_selection"), this._actionDropdown);
        this._signDropdown = param1.createDropdown(new DropdownParam(this.loc("wiredfurni.tooltip.sign"), this.buildSignOptions()));
        let _loc6_: CheckboxOptionParam = new CheckboxOptionParam(this.l("sign_filter"), 0);
        _loc6_.extra2 = this._signDropdown;
        this._SafeStr_4328 = param1.createCheckboxGroup([_loc6_]);
        this._SafeStr_4305 = param1.createSection(this.l("sign_selection"), this._SafeStr_4328);
        this._danceDropdown = param1.createDropdown(new DropdownParam(this.loc("wiredfurni.tooltip.dance"), this.buildDanceOptions()));
        let _loc5_: CheckboxOptionParam = new CheckboxOptionParam(this.l("dance_filter"), 0);
        _loc5_.extra2 = this._danceDropdown;
        this._SafeStr_4347 = param1.createCheckboxGroup([_loc5_]);
        this._SafeStr_4259 = param1.createSection(this.l("dance_selection"), this._SafeStr_4347);
        this._SafeStr_4305.visible = false;
        this._SafeStr_4259.visible = false;
        param3.addElements(_loc4_, this._SafeStr_4305, this._SafeStr_4259);
    }

    private onActionSelected = (param1: ExpandableDropdownOption): void => {
        this.updateExtraSections();
    };

    private updateExtraSections(param1: string = ""): void {
        let _loc2_: WiredUserAction = this.getSelectedAction();
        if (_loc2_ == null || !_loc2_.hasExtra) {
            this._SafeStr_4305.visible = false;
            this._SafeStr_4259.visible = false;
            return;
        }
        let _loc4_: any = _loc2_.code == 10;
        let _loc3_: any = _loc2_.code == 11;
        this._SafeStr_4305.visible = _loc4_;
        this._SafeStr_4259.visible = _loc3_;
        if (_loc4_) {
            if (param1 == "") {
                this._SafeStr_4328._SafeStr_2119(0).selected = false;
                this._signDropdown.selectedId = -1;
            } else {
                this._SafeStr_4328._SafeStr_2119(0).selected = true;
                this._signDropdown.selectedId = _loc2_.convertExtraStringToCode(param1);
            }
        }
        if (_loc3_) {
            if (param1 == "") {
                this._SafeStr_4347._SafeStr_2119(0).selected = false;
                this._danceDropdown.selectedId = -1;
            } else {
                this._SafeStr_4347._SafeStr_2119(0).selected = true;
                this._danceDropdown.selectedId = _loc2_.convertExtraStringToCode(param1);
            }
        }
    }

    private getSelectedAction(): WiredUserAction {
        return PerformAction.getActionByCode(this._actionDropdown.selectedId);
    }

    private getSelectedExtraCode(param1: number): number {
        if (param1 == 10) {
            return this._SafeStr_4328._SafeStr_2119(0).selected ? this._signDropdown.selectedId : -1;
        }
        if (param1 == 11) {
            return this._SafeStr_4347._SafeStr_2119(0).selected ? this._danceDropdown.selectedId : -1;
        }
        return -1;
    }

    private buildActionOptions(): ExpandableDropdownOption[] {
        let _loc2_: ExpandableDropdownOption[] = [];
        let _loc1_: WiredUserAction[] = WiredUserAction._SafeStr_3577;
        for (const _loc3_ of _loc1_ ?? []) {
            _loc2_.push(new ExpandableDropdownOption(_loc3_.code, this.l("action." + _loc3_.code)));
        }
        return _loc2_;
    }

    private buildSignOptions(): ExpandableDropdownOption[] {
        let _loc2_: number = 0;
        let _loc1_: ExpandableDropdownOption[] = [];
        _loc2_ = 0;
        while (_loc2_ <= 17) {
            _loc1_.push(new ExpandableDropdownOption(_loc2_, this.l("action.sign." + _loc2_)));
            _loc2_++;
        }
        return _loc1_;
    }

    private buildDanceOptions(): ExpandableDropdownOption[] {
        let _loc2_: number = 0;
        let _loc1_: ExpandableDropdownOption[] = [];
        _loc2_ = 1;
        while (_loc2_ <= 4) {
            _loc1_.push(new ExpandableDropdownOption(_loc2_, this.l("action.dance." + _loc2_)));
            _loc2_++;
        }
        return _loc1_;
    }
}
