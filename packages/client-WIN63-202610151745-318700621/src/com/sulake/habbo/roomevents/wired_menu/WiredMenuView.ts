import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredMenuTabConfig } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuTabConfig';
import type { WiredMenuTabView } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuTabView';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { isITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredMenuTabConfigs } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuTabConfigs';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class WiredMenuView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu::WiredMenuView'); }

    public static readonly DESKTOP_WINDOW_LAYER: number = 1;

    declare private _windowManager: IHabboWindowManager;

    declare private _controller: WiredMenuController;

    declare private _window: IWindowContainer;

    declare private _SafeStr_7219: WiredMenuTabConfigs;

    private _disposed: boolean = false;

    declare private _tabs: Map<any, any>;

    private _activeTabId: string = null;
    private _isViewing: boolean = false;

    constructor(param1: WiredMenuController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._SafeStr_7219 = new WiredMenuTabConfigs(param1);
        this._window = asGuarded(param2.buildFromXML(XML.from(this._controller.assets.getAssetByName("wired_menu_view_xml").content), 1), isIWindowContainer);
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.discordRegion.addEventListener("WME_CLICK", this.onClickDiscord);
    }

    public initialize(): void {
        this.initializeTabs();
    }

    public show(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._windowManager != null && this._window != null && this._window.parent == null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        }
        if (!this._isViewing) {
            this.activeTab.startViewing();
            this._isViewing = true;
        }
        this._window.activate();
    }

    public isShowing(): boolean {
        return this._windowManager != null && this._window != null && this._window.parent != null;
    }

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hide();
    };

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
            if (this._isViewing) {
                this.activeTab.stopViewing();
                this._isViewing = false;
            }
        }
    }

    private initializeTabs(): void {
        let _loc2_: ITabButtonWindow = null;
        this._tabs = new Dictionary();
        let _loc1_: WiredMenuTabConfig = null;
        for (const _loc3_ of this.tabConfigs ?? []) {
            if (_loc3_.isCreateImmediately) {
                this.getOrCreateTab(_loc3_.id);
            }
            if (_loc1_ == null && _loc3_.isEnabled) {
                _loc1_ = _loc3_;
            }
            _loc2_ = asGuarded(this._window.findChildByName(_loc3_.tabButtonName), isITabButtonWindow);
            _loc2_.addEventListener("WE_SELECTED", this.onTabSelected);
            this._window.findChildByName(_loc3_.containerName).visible = false;
        }
        this.selectTab(_loc1_.id);
        this.alignTabs();
    }

    public selectTab(param1: string): void {
        let _loc2_: WiredMenuTabConfig = this.getTabConfigById(param1);
        if (_loc2_ == null || !_loc2_.isEnabled) {
            return;
        }
        this.tabContext.selector.setSelected(castGuarded(this._window.findChildByName(_loc2_.tabButtonName), isISelectableWindow, "com.sulake.core.window.components.ISelectableWindow"));
    }

    private alignTabs(): void {
        let _loc2_: number = 0;
        let _loc3_: ITabButtonWindow = null;
        let _loc4_: WiredMenuTabConfig = null;
        let _loc1_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this.tabContext.numTabItems) {
            _loc3_ = this.tabContext.getTabItemAt(_loc2_ >>> 0);
            _loc4_ = this.getTabConfigByTabName(_loc3_.name);
            if (_loc4_.isEnabled) {
                _loc1_ += 1;
            } else {
                _loc3_.visible = false;
                _loc3_.width = 0;
            }
            _loc2_++;
        }
        _loc2_ = 0;
        while (_loc2_ < this.tabContext.numTabItems) {
            _loc3_ = this.tabContext.getTabItemAt(_loc2_ >>> 0);
            if (_loc3_.visible) {
                _loc3_.width = _loc3_.parent.width / _loc1_ | 0;
            }
            _loc2_++;
        }
    }

    private onTabSelected = (param1: WindowEvent): void => {
        let _loc2_: string = null;
        let _loc4_: IWindow = param1.target;
        for (const _loc3_ of this.tabConfigs ?? []) {
            if (_loc3_.tabButtonName == _loc4_.name) {
                _loc2_ = _loc3_.id;
                break;
            }
        }
        this.setActiveTab(_loc2_);
    };

    private setActiveTab(param1: string): void {
        let _loc2_: WiredMenuTabView = null;
        let _loc5_: WiredMenuTabConfig = null;
        let _loc4_: WiredMenuTabConfig = this.getTabConfigById(param1);
        if (_loc4_.id == this._activeTabId) {
            return;
        }
        if (this._activeTabId != null) {
            _loc2_ = this.getTabById(this._activeTabId);
            _loc5_ = this.getTabConfigById(this._activeTabId);
            if (this._isViewing) {
                _loc2_.stopViewing();
            }
            _loc2_.setTabInactive();
            if (!_loc5_.isReusable) {
                _loc2_.dispose();
                this._tabs.delete(this._activeTabId);
            }
            this._window.findChildByName(_loc5_.containerName).visible = false;
        }
        this._activeTabId = param1;
        let _loc3_: WiredMenuTabView = this.getOrCreateTab(param1);
        this._window.findChildByName(_loc4_.containerName).visible = true;
        _loc3_.setTabActive();
        if (this._isViewing) {
            _loc3_.startViewing();
        }
        this.headerTitle.text = this._controller.localizationManager.getLocalization(_loc4_.titleLocalizationKey, _loc4_.id);
    }

    public permissionsUpdated(): void {
        for (const _loc1_ of this._tabs?.values() ?? []) {
            _loc1_.permissionsUpdated();
        }
    }

    private get tabConfigs(): WiredMenuTabConfig[] {
        return this._SafeStr_7219.menuTabs;
    }

    private getTabConfigById(param1: string): WiredMenuTabConfig {
        for (const _loc2_ of this.tabConfigs ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    private getTabConfigByTabName(param1: string): WiredMenuTabConfig {
        for (const _loc2_ of this.tabConfigs ?? []) {
            if (_loc2_.tabButtonName == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    private getTabById(param1: string): WiredMenuTabView {
        return this._tabs.get(param1);
    }

    public get activeTab(): WiredMenuTabView {
        return this.getTabById(this._activeTabId);
    }

    public get activeTabId(): string {
        return this._activeTabId;
    }

    private getOrCreateTab(param1: string): WiredMenuTabView {
        let _loc3_: WiredMenuTabConfig = this.getTabConfigById(param1);
        let _loc2_: WiredMenuTabView = this._tabs.get(param1);
        if (_loc2_ == null) {
            _loc2_ = _loc3_.createTab(this._controller, asGuarded(this._window.findChildByName(_loc3_.containerName), isIWindowContainer));
            this._tabs.set(param1, _loc2_);
        }
        return _loc2_;
    }

    private onClickDiscord = (param1: WindowMouseEvent): void => {
        HabboWebTools.openWebPageAndMinimizeClient(this._controller.getProperty("wired.discord.link"));
    };

    public dispose(): void {
        let _loc1_: WiredMenuTabView = null;
        let _loc2_: ITabButtonWindow = null;
        if (this._disposed) {
            return;
        }
        this.hide();
        this.closeButton.removeEventListener("WME_CLICK", this.onWindowClose);
        for (const _loc3_ of this.tabConfigs ?? []) {
            _loc1_ = this.getTabById(_loc3_.id);
            if (_loc1_ != null) {
                if (_loc3_.id == this._activeTabId) {
                    if (this._isViewing) {
                        _loc1_.stopViewing();
                    }
                    _loc1_.setTabInactive();
                }
                _loc1_.dispose();
            }
            _loc2_ = asGuarded(this._window.findChildByName(_loc3_.tabButtonName), isITabButtonWindow);
            _loc2_.removeEventListener("WE_SELECTED", this.onTabSelected);
        }
        this._tabs = null;
        this._activeTabId = null;
        this._isViewing = false;
        this._window.dispose();
        this._window = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get tabContext(): ITabContextWindow {
        return asGuarded(this._window.findChildByName("tab_context"), isITabContextWindow);
    }

    private get headerTitle(): ITextWindow {
        return asGuarded(this._window.findChildByName("header_title"), isITextWindow);
    }

    public get loadingContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("loading_view"), isIWindowContainer);
    }

    public get discordRegion(): IRegionWindow {
        return asGuarded(this._window.findChildByName("discord_region"), isIRegionWindow);
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    get [IDisposable](): true {
        return true;
    }
}
