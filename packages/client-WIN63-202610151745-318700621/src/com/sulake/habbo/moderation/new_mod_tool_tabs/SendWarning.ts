import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { NewModerationTool } from '@/com/sulake/habbo/moderation/NewModerationTool';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { AbstractModToolTab } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/AbstractModToolTab';

export class SendWarning extends AbstractModToolTab {
    static { registerClassName(this, 'com.sulake.habbo.moderation.new_mod_tool_tabs::SendWarning'); }

    private static A: number = 50;
    private static B: number = 40;
    private _SafeStr_6066: boolean = false;
    private _SafeStr_7225: boolean = false;

    constructor(param1: NewModerationTool, param2: IWindowContainer) {
        super(param1, param2);
        this.sendWarningButton.addEventListener("WME_CLICK", this.onSendWarningClick);
    }

    private onSendWarningClick = (param1: WindowMouseEvent): void => {
        if (this.warningInput.length < SendWarning.A) {
            this.tool.windowManager.alert("${moderation.warning.send.warn_title}", this.tool.localizationManager.getLocalizationWithParams("moderation.warning.send.validation_short", "", "x", SendWarning.A), 0, this.onAlertConfirm);
            this._SafeStr_6066 = true;
        } else if (this.warningInput.length > SendWarning.B) {
            this.tool.windowManager.alert("${moderation.warning.send.warn_title}", this.tool.localizationManager.getLocalizationWithParams("moderation.warning.send.validation_long", "", "x", SendWarning.B), 0, this.onAlertConfirm);
            this._SafeStr_7225 = true;
        }
    };

    private onAlertConfirm = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (this._SafeStr_6066 && this._SafeStr_7225) {
            this.tool.setToolCompletion(2);
        }
    };

    private get usernameInput(): ITextFieldWindow {
        return asGuarded(this.window.findChildByName("warning_username_input"), isITextFieldWindow);
    }

    private get warningInput(): ITextFieldWindow {
        return asGuarded(this.window.findChildByName("warning_input"), isITextFieldWindow);
    }

    private get sendWarningButton(): IButtonWindow {
        return asGuarded(this.window.findChildByName("send_warning_btn"), isIButtonWindow);
    }
}
