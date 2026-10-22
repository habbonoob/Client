import { castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { FriendFurniConfirmWidgetHandler } from '@/com/sulake/habbo/ui/handler/FriendFurniConfirmWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class FriendFurniConfirmWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.friendfurni::FriendFurniConfirmWidget'); }

    private _stuffId: number = -1;

    declare private _window: IFrameWindow;

    private _SafeStr_6987: number = -1;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager) {
        super(param1, param2, param3, param4);
        this.confirmWidgetHandler.widget = this;
    }

    public override dispose(): void {
        this._stuffId = -1;
        this.destroyWindow();
        super.dispose();
    }

    public override get mainWindow(): IWindow {
        return this._window;
    }

    public open(param1: number, param2: boolean): void {
        if (this._window && this._window.visible && this._stuffId != -1) {
            this.confirmWidgetHandler.sendLockConfirm(this._stuffId, false);
            this.destroyWindow();
        }
        this._stuffId = param1;
        this.createWindow();
        if (!param2) {
            this._window.findChildByName("other_locked_container").height = 0;
        } else {
            this._window.findChildByName("other_locked_container").height = this._SafeStr_6987;
            this._window.findChildByName("message").visible = false;
        }
        this.mainWindow.visible = true;
    }

    public close(param1: number): void {
        if (param1 == this._stuffId) {
            this.destroyWindow();
        }
    }

    public otherConfirmed(param1: number): void {
        if (this._window != null && param1 == this._stuffId) {
            castGuarded(this._window.findChildByName("lock"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}furniextras/locked_image.png";
            this._window.findChildByName("message").visible = true;
        }
    }

    private createWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this.windowManager.buildFromXML(XML.from(this.assets.getAssetByName("lock_confirm_xml").content)), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.procedure = this.windowProcedure;
        this._SafeStr_6987 = this._window.findChildByName("other_locked_container").height;
        this._window.center();
    }

    private destroyWindow(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private get confirmWidgetHandler(): FriendFurniConfirmWidgetHandler {
        return castTo(this._SafeStr_2143, FriendFurniConfirmWidgetHandler);
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "header_button_close":
                case "cancel_button":
                    this.confirmWidgetHandler.sendLockConfirm(this._stuffId, false);
                    this.destroyWindow();
                    break;
                case "confirm_button":
                    this.confirmWidgetHandler.sendLockConfirm(this._stuffId, true);
                    this.destroyWindow();
            }
        }
    };
}
