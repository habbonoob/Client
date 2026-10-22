import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { MessageEditorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/MessageEditorPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';
import { LinkDataframeCodec } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/LinkDataframeCodec';

export class SendLinkMessage extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::SendLinkMessage'); }

    private static readonly NOTIFICATION_INFO: number = 211;

    declare private _SafeStr_6282: RadioGroupPreset;

    declare private _message: MessageEditorPreset;

    declare private _SafeStr_14440: SectionPreset;

    declare private _SafeStr_4834: boolean;
    static { (this.prototype as any)._SafeStr_4834 = false; }

    constructor() {
        super();
    }

    private static previewStyle(): number {
        return 211;
    }

    private static previewZero(): number {
        return 0;
    }

    private static previewUsername(): string {
        return "";
    }

    public override get code(): number {
        return ActionTypeCodes.SEND_LINK_MESSAGE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_6282 = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.link.from_trigger}"), new RadioButtonParam(1, "${wiredfurni.params.link.custom_message}")], this.onSourceChanged);
        this._message = param1.createMessageEditor(new TextAreaParam(60, -1, -1, -1, 1000), SendLinkMessage.previewStyle, SendLinkMessage.previewZero, SendLinkMessage.previewZero, SendLinkMessage.previewUsername);
        this._SafeStr_14440 = param1.createSection("${wiredfurni.params.message}", this._message);
        param3.addElements(param1.createSection("${wiredfurni.params.link.message_source}", this._SafeStr_6282), this._SafeStr_14440);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4834 = true;
        this._message.text = param1.stringParam;
        this._message.setTextReferences(param1.wiredContext.textPlaceholders);
        this._SafeStr_6282.selected = param1.intParams[0] | 0;
        this._SafeStr_4834 = false;
        this.onSourceChanged(this._SafeStr_6282.selected);
    }

    private onSourceChanged = (param1: number): void => {
        if (this._SafeStr_4834) {
            return;
        }
        this._SafeStr_14440.disabled = param1 != 1;
        if (param1 != 1) {
            this._message.hideEditor();
        }
    };

    public override onEditEnd(): void {
        super.onEditEnd();
        this._message.hideEditor();
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_6282.selected];
    }

    public override readStringParamFromForm(): string {
        return this._message.text;
    }

    public override validate(): string {
        return LinkDataframeCodec.utf8Length(this._message.text) > 1000 ? this.roomEvents.localization.getLocalization("wiredfurni.params.link.message_too_large") : null;
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.link.endpoints";
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
