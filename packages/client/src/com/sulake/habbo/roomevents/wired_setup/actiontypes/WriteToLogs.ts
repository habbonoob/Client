import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class WriteToLogs extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::WriteToLogs'); }

    constructor() {
        super();
    }

    declare private _section1: SectionPreset;

    declare private _SafeStr_5484: DropdownPreset;

    declare private _section2: SectionPreset;

    declare private _SafeStr_5272: TextInputPreset;

    public override get code(): number {
        return ActionTypeCodes._SafeStr_7434;
    }

    public override get negativeCode(): number {
        return ActionTypeCodes._SafeStr_7494;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_5484.selectedId);
        return _loc1_;
    }

    public override readStringParamFromForm(): string {
        return this._SafeStr_5272.text;
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_5484.selectedId = param1.getInt(0);
        this._SafeStr_5272.text = param1.stringParam;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: ExpandableDropdownOption[] = [];
        _loc4_.push(new ExpandableDropdownOption(0, "${wiredfurni.params.write_to_logs.log_level.0}"));
        _loc4_.push(new ExpandableDropdownOption(1, "${wiredfurni.params.write_to_logs.log_level.1}"));
        _loc4_.push(new ExpandableDropdownOption(2, "${wiredfurni.params.write_to_logs.log_level.2}"));
        _loc4_.push(new ExpandableDropdownOption(3, "${wiredfurni.params.write_to_logs.log_level.3}"));
        this._SafeStr_5484 = param1.createDropdown(new DropdownParam("${wiredfurni.params.write_to_logs.log_level.title}", _loc4_));
        this._section1 = param1.createSection("${wiredfurni.params.write_to_logs.log_level.title}", this._SafeStr_5484);
        this._SafeStr_5272 = param1.createTextInput(new TextInputParam("", 400));
        this._section2 = param1.createSection("${wiredfurni.params.write_to_logs.log_message.title}", this._SafeStr_5272);
        param3.addElements(this._section1, this._section2);
    }
}
