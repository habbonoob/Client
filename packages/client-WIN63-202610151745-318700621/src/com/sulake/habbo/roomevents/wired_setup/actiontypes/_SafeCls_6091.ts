import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class _SafeCls_6091 extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::_SafeCls_6091'); }

    private static readonly AUDIENCE_SELECTED_USERS: number = 0;
    private static readonly AUDIENCE_EVERYONE: number = 1;

    declare private _SafeStr_14428: DropdownPreset;

    declare private _SafeStr_14429: boolean;
    static { (this.prototype as any)._SafeStr_14429 = false; }

    declare private _targetUsers: boolean;
    static { (this.prototype as any)._targetUsers = false; }

    declare private _SafeStr_14430: RadioGroupPreset;

    declare private _SafeStr_14431: CheckboxOptionPreset;

    declare private _SafeStr_14432: DropdownPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.SET_FURNI_TRANSPARENCY;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_14428 = param1.createDropdown(new DropdownParam("${wiredfurni.params.furni_visualization.audience}", Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.furni_visualization.audience.selected_users}"), new ExpandableDropdownOption(1, "${wiredfurni.params.furni_visualization.audience.everyone}")]), this.onAudienceChanged));
        let _loc6_: SectionPreset = param1.createSection("${wiredfurni.params.furni_visualization.audience}", this._SafeStr_14428);
        this._SafeStr_14430 = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.set_furni_transparency.visible}"), new RadioButtonParam(100, "${wiredfurni.params.set_furni_transparency.invisible}")]);
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.set_furni_transparency.visibility}", this._SafeStr_14430);
        this._SafeStr_14431 = param1.createCheckboxOption(new CheckboxOptionParam("${wiredfurni.params.set_furni_transparency.allow_click_through}"));
        let _loc5_: SectionPreset = param1.createSection("${wiredfurni.params.set_furni_transparency.click_handling}", this._SafeStr_14431);
        this._SafeStr_14432 = param1.createDropdown(new DropdownParam("${wiredfurni.params.set_furni_transparency.easing}", Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.set_furni_transparency.easing.0}"), new ExpandableDropdownOption(1, "${wiredfurni.params.set_furni_transparency.easing.1}"), new ExpandableDropdownOption(2, "${wiredfurni.params.set_furni_transparency.easing.2}"), new ExpandableDropdownOption(3, "${wiredfurni.params.set_furni_transparency.easing.3}"), new ExpandableDropdownOption(4, "${wiredfurni.params.set_furni_transparency.easing.4}")])));
        let _loc7_: SectionPreset = param1.createSection("${wiredfurni.params.set_furni_transparency.easing}", this._SafeStr_14432);
        param3.addElements(_loc6_, _loc4_, _loc5_, _loc7_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._targetUsers = param1.getBoolean(4);
        let _loc2_: boolean = param1.getBoolean(0);
        if (_loc2_) {
            this._SafeStr_14429 = true;
        }
        this._SafeStr_14428.selectedId = _loc2_ ? 1 : 0;
        this._SafeStr_14430.selected = param1.getInt(1) == 100 ? 100 : 0;
        this._SafeStr_14431.selected = param1.getBoolean(2);
        this._SafeStr_14432.selectedId = param1.getInt(3);
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_14428.selectedId == 1 ? 1 : 0, this._SafeStr_14430.selected, this._SafeStr_14431.selected ? 1 : 0, this._SafeStr_14432.selectedId, this._targetUsers ? 1 : 0];
    }

    private onAudienceChanged = (param1: ExpandableDropdownOption): void => {
        this.roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 1);
        if (param1.id == 1 && !this._SafeStr_14429) {
            this._SafeStr_14429 = true;
            this.roomEvents.windowManager.alert("${wiredfurni.params.furni_visualization.audience.everyone_info.title}", "${wiredfurni.params.furni_visualization.audience.everyone_info.body}", 0, null);
        }
    };

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        return param2 == WiredInputSourcePicker.MERGED_SOURCE && param1 == 1 && this._SafeStr_14428.selectedId == 1;
    }

    public override mergedSelections(): any[] {
        return [[0, 1], [-1, 0]];
    }

    public override mergedSelectionTitle(param1: number): string {
        return param1 == 0 ? "wiredfurni.params.sources.merged.title.target" : "wiredfurni.params.visualization.visibility_audience";
    }

    public override mergedSourceOptions(param1: number): any[] {
        return param1 == 0 ? super.mergedSourceOptions(param1) : [WiredInputSourcePicker.USER_SOURCE];
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return param1 == 1;
    }

    public override setMergedType(param1: number, param2: number): void {
        if (param1 == 0) {
            this._targetUsers = param2 == WiredInputSourcePicker.USER_SOURCE;
        }
    }

    public override getMergedType(param1: number): number {
        return param1 == 1 || this._targetUsers ? WiredInputSourcePicker.USER_SOURCE : WiredInputSourcePicker._SafeStr_2178;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }
}
