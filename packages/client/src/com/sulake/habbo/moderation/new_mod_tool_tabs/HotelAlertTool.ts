import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { NewModerationTool } from '@/com/sulake/habbo/moderation/NewModerationTool';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { AbstractModToolTab } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/AbstractModToolTab';

export class HotelAlertTool extends AbstractModToolTab {
    static { registerClassName(this, 'com.sulake.habbo.moderation.new_mod_tool_tabs::HotelAlertTool'); }

    constructor(param1: NewModerationTool, param2: IWindowContainer) {
        super(param1, param2);
        this.sendHotelAlertButton.addEventListener("WME_CLICK", this.onSendClicked);
    }

    private get hotelAlertInput(): ITextFieldWindow {
        return asGuarded(this.window.findChildByName("hotel_alert_input"), isITextFieldWindow);
    }

    private get sendHotelAlertButton(): IButtonWindow {
        return asGuarded(this.window.findChildByName("send_hotel_alert_btn"), isIButtonWindow);
    }

    private onSendClicked = (param1: WindowMouseEvent): void => {
        this.tool.windowManager.simpleAlert("${notifications.broadcast.title}", "", this.hotelAlertInput.text, "", "", null, "illumina_alert_illustrations_frank_neutral_png");
        this.hotelAlertInput.text = "";
        this.tool.setToolCompletion(1);
    };
}
