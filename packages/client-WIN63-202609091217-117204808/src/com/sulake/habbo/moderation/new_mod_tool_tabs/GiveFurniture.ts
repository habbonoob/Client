import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { NewModerationTool } from '@/com/sulake/habbo/moderation/NewModerationTool';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { AbstractModToolTab } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/AbstractModToolTab';

export class GiveFurniture extends AbstractModToolTab {
    static { registerClassName(this, 'com.sulake.habbo.moderation.new_mod_tool_tabs::GiveFurniture'); }

    constructor(param1: NewModerationTool, param2: IWindowContainer) {
        super(param1, param2);
        this.plusButton.addEventListener("WME_CLICK", this.onPlusButtonClick);
        this.minusButton.addEventListener("WME_CLICK", this.onMinusButtonClick);
        this.donateFurniButton.addEventListener("WME_CLICK", this.onDonateClick);
    }

    private onDonateClick = (param1: WindowMouseEvent): void => {
        this.tool.windowManager.alert("${error.title}", "${moderation.give_furni.too_many_requests}", 0, this.onAlertConfirm);
    };

    private onAlertConfirm = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
        this.tool.setToolCompletion(4);
    };

    public override onOpen(): void {
        super.onOpen();
        this.usernameInput.text = this.tool.sessionDataManager.userName;
    }

    private onPlusButtonClick = (param1: WindowMouseEvent): void => {
        if (this.amount < 100) {
            this.amount += 1;
        }
    };

    private onMinusButtonClick = (param1: WindowMouseEvent): void => {
        if (this.amount > 1) {
            this.amount -= 1;
        }
    };

    private get amount(): number {
        return parseInt(this.amountFurniInput.text) | 0;
    }

    private set amount(param1: number) {
        this.amountFurniInput.text = "" + param1;
    }

    private get usernameInput(): ITextFieldWindow {
        return asGuarded(this.window.findChildByName("give_furni_username_input"), isITextFieldWindow);
    }

    private get productNameInput(): ITextFieldWindow {
        return asGuarded(this.window.findChildByName("product_name_input"), isITextFieldWindow);
    }

    private get amountFurniInput(): ITextFieldWindow {
        return asGuarded(this.window.findChildByName("amount_furni_input"), isITextFieldWindow);
    }

    private get plusButton(): IIconButtonWindow {
        return asGuarded(this.window.findChildByName("plus_btn_furni"), isIIconButtonWindow);
    }

    private get minusButton(): IIconButtonWindow {
        return asGuarded(this.window.findChildByName("minus_btn_furni"), isIIconButtonWindow);
    }

    private get donateFurniButton(): IButtonWindow {
        return asGuarded(this.window.findChildByName("add_furni_btn"), isIButtonWindow);
    }
}
