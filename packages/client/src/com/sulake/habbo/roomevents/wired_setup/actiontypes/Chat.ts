import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';

export class Chat extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::Chat'); }

    private static readonly NOTIFICATION_STYLES: any[] = [34, 200, 201, 202, 210, 211, 212, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 250, 251, 252];

    constructor() {
        super();
    }

    declare private _messagePreset: TextAreaPreset;

    declare private _SafeStr_4991: RadioGroupPreset;

    declare private _styleDropdown: DropdownPreset;

    public override get code(): number {
        return ActionTypeCodes.CHAT;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readStringParamFromForm(): string {
        return this._messagePreset.text;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4991.selected, this._styleDropdown.selectedId];
    }

    public override onEditStart(param1: Triggerable): void {
        this._messagePreset.text = param1.stringParam;
        this._SafeStr_4991.selected = param1.intParams[0] | 0;
        this._styleDropdown.selectedId = param1.intParams[1] | 0;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc6_: UsageInfoSection = param1.createUsageInfoSection("${wiredfurni.params.show_message.usage_info}", true);
        this._messagePreset = param1.createTextArea(new TextAreaParam(40, -1, 8, -1, 200));
        let _loc7_: SectionPreset = param1.createSection("${wiredfurni.params.message}", this._messagePreset);
        this._SafeStr_4991 = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.show_message.visibility_selection.0}"), new RadioButtonParam(1, "${wiredfurni.params.show_message.visibility_selection.1}")]);
        let _loc8_: SectionPreset = param1.createSection("${wiredfurni.params.show_message.visibility_selection.title}", this._SafeStr_4991, SectionParam.COLLAPSED);
        let _loc4_: ExpandableDropdownOption[] = [];
        for (const _loc5_ of Chat.NOTIFICATION_STYLES ?? []) {
            _loc4_.push(new ExpandableDropdownOption(_loc5_ | 0, "${wiredfurni.params.show_message.style_selection." + _loc5_ + "}"));
        }
        this._styleDropdown = param1.createDropdown(new DropdownParam("${wiredfurni.params.show_message.style_selection.title}", _loc4_));
        let _loc9_: SectionPreset = param1.createSection("${wiredfurni.params.show_message.style_selection.title}", this._styleDropdown, SectionParam.COLLAPSED);
        param3.addElements(_loc6_, _loc7_, _loc8_, _loc9_);
    }
}
