import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { MessageEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/MessageEditorPreset';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AbstractBotAction } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/AbstractBotAction';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class _SafeCls_6094 extends AbstractBotAction {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::_SafeCls_6094'); }

    private static readonly STRING_PARAM_DELIMITER: string = "\t";

    declare private _botName: TextInputPreset;

    declare private _chatMessage: MessageEditorPreset;

    declare private _SafeStr_4444: RadioGroupPreset;

    declare private _hideBotNameOption: CheckboxGroupPreset;

    declare private _bubbleWidthDropdown: DropdownPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.BOT_TALK;
    }

    public override readStringParamFromForm(): string {
        return this._botName.text + "\t" + this._chatMessage.text;
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: any[] = param1.stringParam.split("\t");
        this._botName.text = stringOrNull(_loc2_.length >= 1 ? _loc2_[0] : "");
        this._chatMessage.text = stringOrNull(_loc2_.length == 2 ? _loc2_[1] : "");
        this._chatMessage.setTextReferences(param1.wiredContext.textPlaceholders);
        this._SafeStr_4444.selected = param1.intParams[0] | 0;
        this._bubbleWidthDropdown.selectedId = param1.intParams[1] | 0;
        this._hideBotNameOption._SafeStr_2119(0).selected = param1.getBoolean(2);
    }

    public override onEditEnd(): void {
        super.onEditEnd();
        this._chatMessage.hideEditor();
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_4444.selected, this._bubbleWidthDropdown.selectedId, this._hideBotNameOption._SafeStr_2119(0).selected ? 1 : 0];
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._botName = param1.createTextInput(new TextInputParam("", 32, null, -1, null, true, this.loc("wiredfurni.tooltip.bot.name")));
        let _loc4_: SectionPreset = param1.createSection(this.l("bot.name"), this._botName);
        this._chatMessage = param1.createMessageEditor(new TextAreaParam(40, -1, 8, -1, 400, "${wiredfurni.tooltip.bot.chatmessage}"), this.previewStyle, this.previewBubbleWidth, this.previewChatType, this.previewUsername);
        this._botName.addListener(this.onPreviewSettingsChanged);
        this._SafeStr_4444 = param1.createRadioGroup([new RadioButtonParam(0, this.l("talk")), new RadioButtonParam(1, this.l("shout"))], this.onPreviewSettingsChanged);
        this._hideBotNameOption = param1.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.bot_talk.hide_bot_name}")], this.onPreviewSettingsChanged);
        let _loc5_: SimpleListViewPreset = param1.createSimpleListView(true, [this._chatMessage, this._SafeStr_4444, this._hideBotNameOption]);
        let _loc6_: SectionPreset = param1.createSection(this.l("message"), _loc5_);
        let _loc7_: ExpandableDropdownOption[] = Array.from([new ExpandableDropdownOption(-1, "${wiredfurni.params.show_message.bubble_width.-1}"), new ExpandableDropdownOption(0, "${wiredfurni.params.show_message.bubble_width.0}"), new ExpandableDropdownOption(1, "${wiredfurni.params.show_message.bubble_width.1}"), new ExpandableDropdownOption(2, "${wiredfurni.params.show_message.bubble_width.2}")]);
        this._bubbleWidthDropdown = param1.createDropdown(new DropdownParam("${wiredfurni.params.show_message.bubble_width.title}", _loc7_, this.onPreviewSettingsChanged));
        let _loc8_: SectionPreset = param1.createSection("${wiredfurni.params.show_message.bubble_width.title}", this._bubbleWidthDropdown, SectionParam.COLLAPSED);
        param3.addElements(_loc4_, _loc6_, _loc8_);
    }

    private previewStyle = (): number => {
        return 31;
    };

    private previewBubbleWidth = (): number => {
        return this._bubbleWidthDropdown.selectedId;
    };

    private previewChatType = (): number => {
        return this._SafeStr_4444.selected == 1 ? 2 : 0;
    };

    private previewUsername = (): string => {
        return this._hideBotNameOption._SafeStr_2119(0).selected ? null : this._botName.text;
    };

    private onPreviewSettingsChanged = (...rest: any[]): void => {
        this._chatMessage.refreshPreview();
    };
}
