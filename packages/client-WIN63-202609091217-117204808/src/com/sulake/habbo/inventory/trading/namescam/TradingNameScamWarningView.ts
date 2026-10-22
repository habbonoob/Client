import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TradingNameScamWarningController } from '@/com/sulake/habbo/inventory/trading/namescam/TradingNameScamWarningController';
import type { TradingNameScamWarningData } from '@/com/sulake/habbo/inventory/trading/namescam/TradingNameScamWarningData';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class TradingNameScamWarningView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.inventory.trading.namescam::TradingNameScamWarningView'); }

    public static readonly DESKTOP_WINDOW_LAYER: number = 1;
    private static readonly CLOSE_LOCK_SECONDS: number = 6;
    private static readonly SECTION_PADDING: number = 6;

    declare private _controller: TradingNameScamWarningController;

    declare private _windowManager: IHabboWindowManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _window: IFrameWindow;

    declare private _SafeStr_14310: Timer;

    private _SafeStr_14311: number = 0;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: TradingNameScamWarningController, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager) {
        this._controller = param1;
        this._windowManager = param2;
        this._localization = param4;
        this._window = asGuarded(param2.buildFromXML(XML.from(castTo(param3.getAssetByName("inventory_trading_name_scam_warning_xml"), XmlAsset).content), 1), isIFrameWindow);
        this._window.enableLookupCache();
        this._SafeStr_14310 = new Timer(1000, 6);
        this._SafeStr_14310.addEventListener("timer", this.onCloseLockTimer);
        this.headerCloseButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.dismissButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.openProfileButton.addEventListener("WME_CLICK", this.onOpenProfileClicked);
    }

    public show(param1: TradingNameScamWarningData): void {
        let _loc2_: IDesktopWindow = null;
        if (this._disposed || param1 == null) {
            return;
        }
        this._window.caption = this._localization.getLocalization("inventory.trading.namescam.title");
        this.warningText.text = this._localization.getLocalizationWithParams("inventory.trading.namescam.warning", "", "trader_name", param1.tradedUserName);
        this.warningText.height = this.warningText.textHeight + 6 | 0;
        this.traderLabel.text = this._localization.getLocalization("inventory.trading.namescam.trader");
        this.traderNameText.text = param1.tradedUserName;
        this.openProfileButton.id = param1.tradedUserId;
        let _loc3_: IAvatarImageWidget = asGuarded(this.traderAvatar.widget, isIAvatarImageWidget);
        if (_loc3_ != null) {
            _loc3_.figure = param1.tradedUserFigure;
            _loc3_.userId = param1.tradedUserId;
        }
        this.updateMatchesSection(this.roomMatchesSection, this.roomMatchesHeader, this.roomMatchesText, "inventory.trading.namescam.similar_in_room", param1.similarInRoom);
        this.updateMatchesSection(this.friendMatchesSection, this.friendMatchesHeader, this.friendMatchesText, "inventory.trading.namescam.similar_in_friends", param1.similarInFriends);
        this.startCloseLockCountdown();
        if (this._window.parent == null) {
            _loc2_ = this._windowManager.getDesktop(1);
            if (_loc2_ != null) {
                _loc2_.addChild(this._window);
            }
        }
        this._window.center();
        this._window.activate();
    }

    public hide(): void {
        let _loc1_: IDesktopWindow = null;
        this.stopCloseLockCountdown();
        if (this._windowManager != null && this._window != null && this._window.parent != null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    private startCloseLockCountdown(): void {
        this._SafeStr_14311 = 6;
        this._SafeStr_14310.reset();
        this._SafeStr_14310.start();
        this.updateCloseLockUI();
    }

    private stopCloseLockCountdown(): void {
        if (this._SafeStr_14310 != null) {
            this._SafeStr_14310.stop();
            this._SafeStr_14310.reset();
        }
        this._SafeStr_14311 = 0;
        this.updateCloseLockUI();
    }

    private onCloseLockTimer = (param1: TimerEvent): void => {
        this._SafeStr_14311 -= 1;
        if (this._SafeStr_14311 <= 0) {
            this.stopCloseLockCountdown();
            return;
        }
        this.updateCloseLockUI();
    };

    private updateCloseLockUI(): void {
        let _loc1_: boolean = this._SafeStr_14311 > 0;
        if (_loc1_) {
            this.dismissButton.disable();
            this.headerCloseButton.disable();
            this.closeCountdownText.visible = true;
            this.closeCountdownText.text = this._localization.getLocalizationWithParams("inventory.trading.namescam.close_countdown", "", "seconds", String(this._SafeStr_14311));
        } else {
            this.dismissButton.enable();
            this.headerCloseButton.enable();
            this.closeCountdownText.text = "";
            this.closeCountdownText.visible = false;
        }
    }

    private updateMatchesSection(param1: IWindowContainer, param2: ITextWindow, param3: ITextWindow, param4: string, param5: any[]): void {
        let _loc6_: boolean = param5 != null && param5.length > 0;
        param1.visible = _loc6_;
        if (!_loc6_) {
            param1.height = 0;
            param3.text = "";
            return;
        }
        param2.text = this._localization.getLocalization(param4);
        param3.text = param5.join("\r");
        param3.height = param3.textHeight + 6 | 0;
        param1.height = param3.y + param3.height + 6;
    }

    private onOpenProfileClicked = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._controller.openProfile(this.openProfileButton.id);
    };

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this._SafeStr_14311 > 0) {
            return;
        }
        this.hide();
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.headerCloseButton.removeEventListener("WME_CLICK", this.onWindowClose);
        this.dismissButton.removeEventListener("WME_CLICK", this.onWindowClose);
        this.openProfileButton.removeEventListener("WME_CLICK", this.onOpenProfileClicked);
        this._SafeStr_14310.removeEventListener("timer", this.onCloseLockTimer);
        this.hide();
        this._SafeStr_14310 = null;
        this._window.dispose();
        this._window = null;
        this._windowManager = null;
        this._localization = null;
        this._controller = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get headerCloseButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get contentList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("content_list"), isIItemListWindow);
    }

    private get warningText(): ITextWindow {
        return asGuarded(this._window.findChildByName("warning_text"), isITextWindow);
    }

    private get traderLabel(): ITextWindow {
        return asGuarded(this._window.findChildByName("trader_label"), isITextWindow);
    }

    private get traderNameText(): ITextWindow {
        return asGuarded(this._window.findChildByName("trader_name_text"), isITextWindow);
    }

    private get traderAvatar(): IWidgetWindow {
        return asGuarded(this._window.findChildByName("trader_avatar"), isIWidgetWindow);
    }

    private get openProfileButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("open_profile_button"), isIButtonWindow);
    }

    private get roomMatchesSection(): IWindowContainer {
        return asGuarded(this._window.findChildByName("room_matches_section"), isIWindowContainer);
    }

    private get roomMatchesHeader(): ITextWindow {
        return asGuarded(this._window.findChildByName("room_matches_header"), isITextWindow);
    }

    private get roomMatchesText(): ITextWindow {
        return asGuarded(this._window.findChildByName("room_matches_text"), isITextWindow);
    }

    private get friendMatchesSection(): IWindowContainer {
        return asGuarded(this._window.findChildByName("friend_matches_section"), isIWindowContainer);
    }

    private get friendMatchesHeader(): ITextWindow {
        return asGuarded(this._window.findChildByName("friend_matches_header"), isITextWindow);
    }

    private get friendMatchesText(): ITextWindow {
        return asGuarded(this._window.findChildByName("friend_matches_text"), isITextWindow);
    }

    private get dismissButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("close_button"), isIButtonWindow);
    }

    private get closeCountdownText(): ITextWindow {
        return asGuarded(this._window.findChildByName("close_countdown_text"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
