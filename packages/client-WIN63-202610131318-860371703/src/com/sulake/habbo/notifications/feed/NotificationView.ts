import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { NotificationController } from '@/com/sulake/habbo/notifications/feed/NotificationController';
import type { IFeedEntity } from '@/com/sulake/habbo/notifications/feed/view/content/IFeedEntity';
import type { IPane } from '@/com/sulake/habbo/notifications/feed/view/pane/IPane';
import type { HabboNotifications } from '@/com/sulake/habbo/notifications/HabboNotifications';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { StateController } from '@/com/sulake/habbo/notifications/feed/StateController';
import { FeedEntity } from '@/com/sulake/habbo/notifications/feed/view/content/FeedEntity';
import { InfoPane } from '@/com/sulake/habbo/notifications/feed/view/pane/InfoPane';
import { isIPane } from '@/com/sulake/habbo/notifications/feed/view/pane/IPane';
import { NotificationsPane } from '@/com/sulake/habbo/notifications/feed/view/pane/NotificationsPane';
import { SettingsPane } from '@/com/sulake/habbo/notifications/feed/view/pane/SettingsPane';
import { StatusPane } from '@/com/sulake/habbo/notifications/feed/view/pane/StatusPane';
import { StreamPane } from '@/com/sulake/habbo/notifications/feed/view/pane/StreamPane';

export class NotificationView {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed::NotificationView'); }

    public static readonly VIEW_PANE_FEEDS: string = "pane_feeds";
    public static readonly VIEW_PANE_NOTIFICATIONS: string = "pane_notifications";
    public static readonly VIEW_PANE_STREAM: string = "pane_stream";
    public static readonly VIEW_PANE_SETTINGS: string = "pane_settings";
    public static readonly VIEW_PANE_INFO: string = "pane_info";
    public static readonly VIEW_PANE_STATUS: string = "pane_status";
    private static readonly _SafeStr_7910: string = "settings_toggle";
    private static readonly ELEMENT_INFO: string = "info_toggle";

    declare private _SafeStr_3140: StateController;

    declare private _component: HabboNotifications;

    declare private _controller: NotificationController;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2424: UtilsMap;

    constructor(param1: NotificationController, param2: HabboNotifications) {
        this._controller = param1;
        this._component = param2;
        this._SafeStr_3140 = new StateController();
        FeedEntity.assignHandles(this.windowManager, this.assets, this.localization, param1);
        this.setupUserInterface();
        this.closePaneLevel(2);
        this.switchToPane("pane_notifications");
        this.setVisibilityState(1);
    }

    public dispose(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2424) {
            for (const _loc1_ of valuesOf(this._SafeStr_2424)) {
                _loc1_.dispose();
            }
            this._SafeStr_2424.dispose();
            this._SafeStr_2424 = null;
        }
        FeedEntity.removeHandles();
        this._controller = null;
        this._SafeStr_3140 = null;
        this._component = null;
    }

    public get windowManager(): IHabboWindowManager {
        return this._component.windowManager;
    }

    public get assets(): IAssetLibrary {
        return this._component.assets;
    }

    public get localization(): IHabboLocalizationManager {
        return this._component.localization;
    }

    public get controller(): NotificationController {
        return this._controller;
    }

    private setupUserInterface(): void {
        if (this._window) {
            return;
        }
        this._window = asGuarded(this._component.windowManager.buildFromXML(asInstanceOf(this._component.assets.getAssetByName("feed_display_xml").content, XML)), isIWindowContainer);
        this._window.height = this._window.desktop.height;
        this._window.setParamFlag(64);
        this._window.setParamFlag(2048);
        this._window.findChildByName("settings_toggle").addEventListener("WME_CLICK", this.onSettingsToggle);
        this._window.findChildByName("info_toggle").addEventListener("WME_CLICK", this.onInfoToggle);
        this._SafeStr_2424 = new UtilsMap();
        this._SafeStr_2424.add("pane_notifications", new NotificationsPane("pane_notifications", this, asGuarded(this._window.findChildByName("pane_notifications"), isIWindowContainer)));
        this._SafeStr_2424.add("pane_stream", new StreamPane("pane_stream", this, asGuarded(this._window.findChildByName("pane_stream"), isIWindowContainer)));
        this._SafeStr_2424.add("pane_info", new InfoPane("pane_info", this, asGuarded(this._window.findChildByName("pane_info"), isIWindowContainer)));
        this._SafeStr_2424.add("pane_settings", new SettingsPane("pane_settings", this, asGuarded(this._window.findChildByName("pane_settings"), isIWindowContainer)));
        this._SafeStr_2424.add("pane_status", new StatusPane("pane_status", this, asGuarded(this._window.findChildByName("pane_status"), isIWindowContainer)));
    }

    public toggleMinimized(): void {
        switch (this._SafeStr_3140.currentState() - 1) {
            case 0:
                this.setVisibilityState(2);
                break;
            case 1:
                this.setVisibilityState(1);
        }
    }

    public setVisibilityState(param1: number): void {
        let _loc2_: IWindowContainer = null;
        let _loc3_: number = this._SafeStr_3140.requestState(param1);
        switch (_loc3_) {
            case 0:
                this._window.x = this._window.desktop.width;
                this._window.visible = false;
                break;
            case 1:
                this._window.visible = true;
                _loc2_ = asGuarded(this._window.findChildByName("main_view"), isIWindowContainer);
                this._window.x = this._window.desktop.width - (this._window.width - _loc2_.width);
                break;
            case 2:
                this._window.visible = true;
                this._window.x = this._window.desktop.width - this._window.width;
        }
    }

    public setViewEnabled(param1: boolean): void {
        this._SafeStr_3140.setEnabled(param1);
        this.setVisibilityState(this._SafeStr_3140.currentState());
    }

    public setGameMode(param1: boolean): void {
        this._SafeStr_3140.setGameMode(param1);
        this.setVisibilityState(this._SafeStr_3140.currentState());
    }

    public switchToPane(param1: string): void {
        let _loc2_: IPane = this._SafeStr_2424.getValue(param1);
        if (!_loc2_) {
            return;
        }
        this.closePaneLevel(_loc2_.paneLevel);
        _loc2_.isVisible = true;
    }

    public closePaneLevel(param1: number): void {
        for (const _loc2_ of valuesOf(this._SafeStr_2424)) {
            if (_loc2_.paneLevel == param1) {
                _loc2_.isVisible = false;
            }
        }
    }

    public addNotificationFeedItem(param1: number, param2: IFeedEntity): void {
        (asInstanceOf(this._SafeStr_2424.getValue("pane_notifications"), NotificationsPane)).addItem(param1, param2);
    }

    public addStreamFeedItem(param1: IFeedEntity): void {
        (asInstanceOf(this._SafeStr_2424.getValue("pane_stream"), StreamPane)).addItem(param1);
    }

    public removeStreamItems(): void {
    }

    private onSettingsToggle = (param1: WindowMouseEvent): void => {
        let _loc2_: IPane = asGuarded(this._SafeStr_2424.getValue("pane_settings"), isIPane);
        if (_loc2_) {
            if (_loc2_.isVisible) {
                this.closePaneLevel(2);
            } else {
                this.switchToPane("pane_settings");
            }
        }
    };

    private onInfoToggle = (param1: WindowMouseEvent): void => {
        let _loc2_: IPane = asGuarded(this._SafeStr_2424.getValue("pane_info"), isIPane);
        if (_loc2_) {
            if (_loc2_.isVisible) {
                this.closePaneLevel(2);
            } else {
                this.switchToPane("pane_info");
            }
        }
    };
}
