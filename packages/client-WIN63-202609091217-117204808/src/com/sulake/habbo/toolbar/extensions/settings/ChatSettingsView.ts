import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ChatSettingsView {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions.settings::ChatSettingsView'); }

    declare private _window: IWindowContainer;

    declare private _toolbar: HabboToolbar;

    declare private _SafeStr_14708: IDropMenuWindow;

    declare private _SafeStr_14709: IDropMenuWindow;

    declare private _SafeStr_14710: IDropMenuWindow;

    declare private _SafeStr_14711: boolean;
    static { (this.prototype as any)._SafeStr_14711 = false; }

    constructor(param1: HabboToolbar) {
        this._toolbar = param1;
        this.createWindow();
    }

    public dispose(): void {
        if (this._window == null) {
            return;
        }
        this.saveSettings();
        this._window.dispose();
        this._window = null;
        this._SafeStr_14708 = null;
        this._SafeStr_14709 = null;
        this._SafeStr_14710 = null;
    }

    private createWindow(): void {
        let _loc1_: XmlAsset = asInstanceOf(this._toolbar.assets.getAssetByName("toolbar_chat_settings_xml"), XmlAsset);
        this._window = asGuarded(this._toolbar.windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML)), isIWindowContainer);
        this._window.procedure = this.onWindowEvent;
        this._SafeStr_14708 = asGuarded(this._window.findChildByName("chat_mode"), isIDropMenuWindow);
        this._SafeStr_14709 = asGuarded(this._window.findChildByName("chat_bubble_width"), isIDropMenuWindow);
        this._SafeStr_14710 = asGuarded(this._window.findChildByName("chat_scroll_speed"), isIDropMenuWindow);
        this._SafeStr_14708.addEventListener("WE_SELECTED", this.onDropMenuSelectionChanged);
        this._SafeStr_14709.addEventListener("WE_SELECTED", this.onDropMenuSelectionChanged);
        this._SafeStr_14710.addEventListener("WE_SELECTED", this.onDropMenuSelectionChanged);
        this._SafeStr_14711 = true;
        this.populateTexts();
        this.populateDropMenus();
        this.updateSelections();
        this._SafeStr_14711 = false;
    }

    private populateTexts(): void {
        castGuarded(this._window.findChildByName("settings_title"), isITextWindow, "com.sulake.core.window.components.ITextWindow").caption = this.localize("toolbar.chat.settings.title", "Chat settings");
        castGuarded(this._window.findChildByName("chat_settings_info"), isITextWindow, "com.sulake.core.window.components.ITextWindow").caption = this.localize("toolbar.chat.settings.info", "Choose how chat appears for you.");
        castGuarded(this._window.findChildByName("chat_mode_label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").caption = this.localize("toolbar.chat.settings.mode", "Chat mode");
        castGuarded(this._window.findChildByName("chat_bubble_width_label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").caption = this.localize("toolbar.chat.settings.bubble_width", "Bubble width");
        castGuarded(this._window.findChildByName("chat_scroll_speed_label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").caption = this.localize("toolbar.chat.settings.scroll_speed", "Scroll speed");
    }

    private populateDropMenus(): void {
        this._SafeStr_14708.populate([this.localize("navigator.roomsettings.chat.mode.free.flow", "Free flow"), this.localize("navigator.roomsettings.chat.mode.line.by.line", "Line by line")]);
        this._SafeStr_14709.populate([this.localize("navigator.roomsettings.chat.bubbles.width.wide", "Wide"), this.localize("navigator.roomsettings.chat.bubbles.width.normal", "Normal"), this.localize("navigator.roomsettings.chat.bubbles.width.thin", "Thin")]);
        this._SafeStr_14710.populate([this.localize("navigator.roomsettings.chat.speed.fast", "Fast"), this.localize("navigator.roomsettings.chat.speed.normal", "Normal"), this.localize("navigator.roomsettings.chat.speed.slow", "Slow")]);
    }

    private updateSelections(): void {
        if (this._toolbar.freeFlowChat == null) {
            return;
        }
        this._SafeStr_14708.selection = this._toolbar.freeFlowChat.chatMode;
        this._SafeStr_14709.selection = this._toolbar.freeFlowChat.chatBubbleWidth;
        this._SafeStr_14710.selection = this._toolbar.freeFlowChat.chatScrollSpeed;
    }

    private saveSettings(): void {
        if (this._toolbar == null || this._toolbar.freeFlowChat == null || this._SafeStr_14708 == null || this._SafeStr_14709 == null || this._SafeStr_14710 == null) {
            return;
        }
        this._toolbar.freeFlowChat.updateChatPreferences(this.clampSelection(this._SafeStr_14708.selection, 0), this.clampSelection(this._SafeStr_14709.selection, 1), this.clampSelection(this._SafeStr_14710.selection, 1));
    }

    private clampSelection(param1: number, param2: number): number {
        return param1 >= 0 ? param1 : param2;
    }

    private onDropMenuSelectionChanged = (param1: WindowEvent): void => {
        if (this._SafeStr_14711) {
            return;
        }
        this.saveSettings();
    };

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (param2.name == "back_btn") {
            this.dispose();
        }
    };

    private localize(param1: string, param2: string): string {
        return this._toolbar.localization != null ? this._toolbar.localization.getLocalization(param1, param2) : param2;
    }

    public get window(): IWindowContainer {
        return this._window;
    }
}
