import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MeMenuSettingsMenuView } from '@/com/sulake/habbo/toolbar/memenu/MeMenuSettingsMenuView';
import type { ToolbarView } from '@/com/sulake/habbo/toolbar/ToolbarView';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class MeMenuChatSettingsView {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.memenu.chatsettings::MeMenuChatSettingsView'); }

    constructor() {
    }

    declare private _widget: MeMenuSettingsMenuView;

    declare private _toolbarView: ToolbarView;

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public init(param1: MeMenuSettingsMenuView, param2: ToolbarView): void {
        this._widget = param1;
        this._toolbarView = param2;
        this.createWindow();
    }

    public dispose(): void {
        if (this._window == null) {
            return;
        }
        let _loc1_: ICheckBoxWindow = asGuarded(this._window.findChildByName("prefer_old_chat_checkbox"), isICheckBoxWindow);
        this._widget.window.visible = true;
        this._widget.widget.toolbar.freeFlowChat.isDisabledInPreferences = _loc1_ != null && Boolean(_loc1_.isSelected);
        this._window.dispose();
        this._window = null;
        this._widget = null;
    }

    private createWindow(): void {
        let _loc3_: number = 0;
        let _loc1_: IWindow = null;
        let _loc2_: XmlAsset = asInstanceOf(this._widget.widget.toolbar.assets.getAssetByName("me_menu_chat_settings_xml"), XmlAsset);
        this._window = asGuarded(this._widget.widget.toolbar.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        this._window.x = this._toolbarView.window.width + 10;
        this._window.y = this._toolbarView.window.bottom - this._window.height;
        this._widget.window.visible = false;
        _loc3_ = 0;
        _loc1_ = null;
        while (_loc3_ < this._window.numChildren) {
            _loc1_ = this._window.getChildAt(_loc3_);
            _loc1_.addEventListener("WME_CLICK", this.onButtonClicked);
            _loc3_++;
        }
        castGuarded(this._window.findChildByName("prefer_old_chat_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected = this._widget.widget.toolbar.freeFlowChat.isDisabledInPreferences;
    }

    private onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        switch (_loc3_) {
            case "back_btn":
                this.dispose();
                break;
            case "prefer_old_chat_checkbox":
                this._widget.widget.toolbar.freeFlowChat.isDisabledInPreferences = castGuarded(this._window.findChildByName("prefer_old_chat_checkbox"), isICheckBoxWindow, "com.sulake.core.window.components.ICheckBoxWindow").isSelected;
                if (!this._widget.widget.toolbar.freeFlowChat.isDisabledInPreferences) {
                    if (this._widget.widget.toolbar.roomUI.chatContainer != null) {
                        this._widget.widget.toolbar.roomUI.chatContainer.setDisplayObject(this._widget.widget.toolbar.freeFlowChat.displayObject);
                    }
                    break;
                }
                this._widget.widget.toolbar.freeFlowChat.clear();
        }
    };
}
