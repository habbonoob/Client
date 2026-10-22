import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class KickFromRoom extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::KickFromRoom'); }

    constructor() {
        super();
    }

    declare private _SafeStr_4501: TextInputPreset;

    public override get code(): number {
        return ActionTypeCodes.KICK_FROM_ROOM;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override readStringParamFromForm(): string {
        return this._SafeStr_4501.text;
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_4501.text = param1.stringParam;
    }

    public override validate(): string {
        let _loc2_: string = null;
        let _loc1_: number = 100;
        if (this._SafeStr_4501.text.length > _loc1_) {
            _loc2_ = "wiredfurni.chatmsgtoolong";
            return this.roomEvents.localization.getLocalization(_loc2_, _loc2_);
        }
        return null;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4501 = param1.createTextInput(new TextInputParam("", 100));
        let _loc4_: SectionPreset = param1.createSection("${wiredfurni.params.message}", this._SafeStr_4501);
        param3.addElements(_loc4_);
    }
}
