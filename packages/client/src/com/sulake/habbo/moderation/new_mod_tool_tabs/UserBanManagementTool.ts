import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { NewModerationTool } from '@/com/sulake/habbo/moderation/NewModerationTool';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIRadioButtonWindow } from '@/com/sulake/core/window/components/IRadioButtonWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { AbstractModToolTab } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/AbstractModToolTab';

export class UserBanManagementTool extends AbstractModToolTab {
    static { registerClassName(this, 'com.sulake.habbo.moderation.new_mod_tool_tabs::UserBanManagementTool'); }

    constructor(param1: NewModerationTool, param2: IWindowContainer) {
        super(param1, param2);
        this.getBanRadio.select();
        this.performBanAction.addEventListener("WME_CLICK", this.onBanClick);
    }

    private get usernameInput(): ITextFieldWindow {
        return asGuarded(this.window.findChildByName("ban_username_input"), isITextFieldWindow);
    }

    private get getBanRadio(): IRadioButtonWindow {
        return asGuarded(this.window.findChildByName("ban_radio"), isIRadioButtonWindow);
    }

    private get getUnbanRadio(): IRadioButtonWindow {
        return asGuarded(this.window.findChildByName("unban_radio"), isIRadioButtonWindow);
    }

    private get getDurationSelector(): IDropMenuWindow {
        return asGuarded(this.window.findChildByName("duration_selector"), isIDropMenuWindow);
    }

    private get performBanAction(): IButtonWindow {
        return asGuarded(this.window.findChildByName("ban_btn"), isIButtonWindow);
    }

    private onBanClick = (param1: WindowMouseEvent): void => {
        this.usernameInput.text = this.tool.sessionDataManager.userName;
        this.getBanRadio.select();
        this.getDurationSelector.selection = this.getDurationSelector.numMenuItems - 1;
        this.tool.windowManager.confirm("${moderation.ban_management.do.title}", this.tool.localizationManager.getLocalizationWithParams("moderation.ban_management.do.desc", "", "action", this.getBanRadio.isSelected ? "BAN" : "UNBAN", "user", this.usernameInput.text, "duration", this.getDurationSelector.enumerateSelection()[this.getDurationSelector.selection]), 0, this.onConfirmClicked);
    };

    private onConfirmClicked = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
        this.tool.setToolCompletion(0);
    };
}
