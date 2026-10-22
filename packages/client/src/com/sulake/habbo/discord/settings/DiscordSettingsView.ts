import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { DiscordPreferences } from '@/com/sulake/habbo/communication/messages/parser/discord/DiscordPreferences';
import type { DiscordSettingsController } from '@/com/sulake/habbo/discord/settings/DiscordSettingsController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { WindowUtils } from '@/com/sulake/core/window/utils/WindowUtils';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class DiscordSettingsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.discord.settings::DiscordSettingsView'); }

    public static readonly DESKTOP_WINDOW_LAYER: number = 1;

    constructor(param1: DiscordSettingsController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._window = asGuarded(param2.buildFromXML(XML.from(this._controller.assets.getAssetByName("discord_settings_xml").content), 1), isIFrameWindow);
        this._window.enableLookupCache();
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.funnyButton.addEventListener("WME_CLICK", this.onWindowClose);
        let _loc3_: any[] = [this.discordStatusCheckbox, this.shareActivityCheckbox, this.hideHiddenRoomsCheckbox, this.allowJoiningCheckbox];
        for (const _loc4_ of _loc3_ ?? []) {
            _loc4_.addEventListener("WE_SELECTED", this.onCheckboxChanged);
            _loc4_.addEventListener("WE_UNSELECTED", this.onCheckboxChanged);
        }
        this.collectiblesServerButton.addEventListener("WME_CLICK", this.onClickCollectiblesDiscord);
        this.wiredServerButton.addEventListener("WME_CLICK", this.onClickWiredDiscord);
        this.originsServerButton.addEventListener("WME_CLICK", this.onClickOriginsDiscord);
        this.show();
        this.hide();
    }

    declare private _controller: DiscordSettingsController;

    declare private _windowManager: IHabboWindowManager;

    declare private _window: IFrameWindow;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private get discordBox(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("discord_box"), isIStaticBitmapWrapperWindow);
    }

    private get closeButton(): IWindow {
        return asGuarded(this._window.findChildByName("header_button_close"), isIWindow);
    }

    private get discordStatusCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("show_habbo_cbx"), isICheckBoxWindow);
    }

    private get shareActivityCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("share_activity_cbx"), isICheckBoxWindow);
    }

    private get hideHiddenRoomsCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("hide_in_hidden_cbx"), isICheckBoxWindow);
    }

    private get allowJoiningCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("allow_joining_cbx"), isICheckBoxWindow);
    }

    private get collectiblesServerButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("collectibles_server"), isIContainerButtonWindow);
    }

    private get wiredServerButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("wired_server"), isIContainerButtonWindow);
    }

    private get originsServerButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("origins_server"), isIContainerButtonWindow);
    }

    private get funnyButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("funny_button"), isIButtonWindow);
    }

    public initialize(param1: DiscordPreferences): void {
        this.discordStatusCheckbox.isSelected = param1.showHabbo;
        this.shareActivityCheckbox.isSelected = param1.shareActivity;
        this.hideHiddenRoomsCheckbox.isSelected = param1.hideInHiddenRooms;
        this.allowJoiningCheckbox.isSelected = param1.allowJoining;
        this.updateUI();
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._windowManager != null && this._window != null && this._window.parent == null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
                this._window.center();
                this._window.activate();
            }
        }
    }

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    public isShowing(): boolean {
        return this._windowManager != null && this._window != null && this._window.parent != null;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._windowManager = null;
        this._controller = null;
    }

    private onCheckboxChanged = (param1: WindowEvent): void => {
        this.updateUI();
    };

    private updateUI(): void {
        this.discordBox.greyscale = !this.discordStatusCheckbox.isSelected;
        this.discordBox.invalidate();
        WindowUtils.disableSection(this.shareActivityCheckbox.parent, !this.discordStatusCheckbox.isSelected);
        WindowUtils.disableSection(this.hideHiddenRoomsCheckbox.parent, !this.discordStatusCheckbox.isSelected || !this.shareActivityCheckbox.isSelected);
        WindowUtils.disableSection(this.allowJoiningCheckbox.parent, !this.discordStatusCheckbox.isSelected || !this.shareActivityCheckbox.isSelected);
    }

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._controller.updatePreferences(this.discordStatusCheckbox.isSelected, this.shareActivityCheckbox.isSelected, this.hideHiddenRoomsCheckbox.isSelected, this.allowJoiningCheckbox.isSelected);
        this.hide();
    };

    private onClickCollectiblesDiscord = (param1: WindowMouseEvent): void => {
        HabboWebTools.openWebPageAndMinimizeClient(this._controller.getProperty("collectibles.discord.link"));
    };

    private onClickWiredDiscord = (param1: WindowMouseEvent): void => {
        HabboWebTools.openWebPageAndMinimizeClient(this._controller.getProperty("wired.discord.link"));
    };

    private onClickOriginsDiscord = (param1: WindowMouseEvent): void => {
        HabboWebTools.openWebPageAndMinimizeClient(this._controller.getProperty("origins.discord.link"));
    };

    get [IDisposable](): true {
        return true;
    }
}
