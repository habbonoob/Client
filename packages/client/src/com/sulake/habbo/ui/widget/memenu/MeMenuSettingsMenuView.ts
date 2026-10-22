import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IMeMenuView } from '@/com/sulake/habbo/ui/widget/memenu/IMeMenuView';
import type { MeMenuWidget } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuWidget';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class MeMenuSettingsMenuView implements IMeMenuView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.memenu::MeMenuSettingsMenuView'); }

    constructor() {
    }

    declare private _widget: MeMenuWidget;

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public init(param1: MeMenuWidget, param2: string): void {
        this._widget = param1;
        this.createWindow(param2);
    }

    public dispose(): void {
        this._widget = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public updateUnseenItemCount(param1: string, param2: number): void {
    }

    private createWindow(param1: string): void {
        let _loc2_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("memenu_settings_menu"), XmlAsset);
        if (_loc2_) {
            this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        }
        if (this._window == null) {
            throw new Error("Failed to construct settings window from XML!");
        }
        this._window.name = param1;
        this._window.procedure = this.eventHandler;
        if (!ExternalInterface.available || this._widget.config.getProperty("has.identity") != "1") {
            this._window.findChildByName("character_settings").disable();
        } else {
            this._window.findChildByName("identity_text").visible = false;
        }
        this._window.findChildByName("chat_settings").visible = true;
    }

    private eventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "character_settings":
                HabboWebTools.openAvatars();
                this._widget.hide();
                break;
            case "sound_settings":
                this._widget.changeView("me_menu_sound_settings");
                break;
            case "chat_settings":
                this._widget.changeView("me_menu_chat_settings");
                break;
            case "back":
                this._widget.changeView("me_menu_top_view");
        }
    };
}
