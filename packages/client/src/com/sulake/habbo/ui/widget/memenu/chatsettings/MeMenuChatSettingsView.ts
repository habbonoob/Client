import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IMeMenuView } from '@/com/sulake/habbo/ui/widget/memenu/IMeMenuView';
import type { MeMenuWidget } from '@/com/sulake/habbo/ui/widget/memenu/MeMenuWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomWidgetStoreSettingsMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetStoreSettingsMessage';

export class MeMenuChatSettingsView implements IMeMenuView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.memenu.chatsettings::MeMenuChatSettingsView'); }

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
        let _loc2_: RoomWidgetStoreSettingsMessage = new RoomWidgetStoreSettingsMessage("RWSSM_STORE_CHAT");
        let _loc1_: ICheckBoxWindow = asGuarded(this._window.findChildByName("prefer_old_chat_checkbox"), isICheckBoxWindow);
        _loc2_.forceOldChat = _loc1_ != null && Boolean(_loc1_.isSelected);
        this._widget.messageListener.processWidgetMessage(_loc2_);
        this._window.dispose();
        this._window = null;
        this._widget = null;
    }

    public updateUnseenItemCount(param1: string, param2: number): void {
    }

    private createWindow(param1: string): void {
        let _loc4_: number = 0;
        let _loc2_: IWindow = null;
        let _loc3_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("memenu_chat_settings"), XmlAsset);
        if (_loc3_) {
            this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML)), isIWindowContainer);
        }
        if (this._window == null) {
            throw new Error("Failed to construct sound settings window from XML!");
        }
        this._window.name = param1;
        _loc4_ = 0;
        _loc2_ = null;
        while (_loc4_ < this._window.numChildren) {
            _loc2_ = this._window.getChildAt(_loc4_);
            _loc2_.addEventListener("WME_CLICK", this.onButtonClicked);
            _loc4_++;
        }
        castGuarded(this._window.findChildByName("prefer_old_chat_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected = this._widget.handler.container.freeFlowChat.isDisabledInPreferences;
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        let _loc4_: any = _loc3_;
        if ("back_btn" === _loc4_) {
            this._widget.changeView("me_menu_settings_view");
        }
    };
}
