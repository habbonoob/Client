import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CanCreateRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/CanCreateRoomMessageComposer';

export class ToolbarHoverCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.toolbar::ToolbarHoverCtrl'); }

    private static readonly ITEM_BG_COLOR_OVER: number = 7433577;
    private static readonly ITEM_BG_COLOR_OUT: number = 5723213;
    private readonly ITEM_LIST: string = "item_list";
    private readonly SIMPLE_ITEM_TAG: string = "SIMPLE_ITEM";

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _navigator: HabboNavigator;

    declare private _localization: IHabboLocalizationManager;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _simpleItemBase: IWindowContainer;

    declare private _hideTimeout: Timer;

    declare private _SafeStr_2874: boolean;
    static { (this.prototype as any)._SafeStr_2874 = false; }

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
        this._localization = param1.localization;
        this._window = castGuarded(this._navigator.getXmlWindow("toolbar_hover"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2221 = castGuarded(this._window.findChildByName("item_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._simpleItemBase = castGuarded(this._SafeStr_2221.getListItemByTag("SIMPLE_ITEM"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2221.removeListItem(this._simpleItemBase);
        this._window.addEventListener("WME_OVER", this.onHoverOverWindow);
        this._window.addEventListener("WME_HOVERING", this.onHoverOverWindow);
        this._window.addEventListener("WME_OUT", this.onHoverOutWindow);
        this.addSimpleItem("navigator", "${navigator.title}", this.onNavigatorClick);
        this.addSimpleItem("home", "${toolbar.icon.label.exitroom.home}", this.onHomeClick);
        this.addSimpleItem("favorites", "${navigator.navisel.myfavourites}", this.onFavouritesClick);
        this.addSimpleItem("create", "${navigator.createroom.create}", this.onCreateRoomClick);
        this.addSimpleItem("history", "${navigator.navisel.visitedrooms}", this.onHistoryClick);
        this.addSimpleItem("frequent", "${navigator.navisel.frequentvisits}", this.onFrequentHistoryClick);
    }

    public dispose(): void {
        this._disposed = true;
        if (this._hideTimeout) {
            this._hideTimeout.reset();
            this._hideTimeout = null;
        }
        this._SafeStr_2221 = null;
        this._window = null;
        this._simpleItemBase = null;
        this._navigator = null;
        this._localization = null;
    }

    private onNavigatorClick = (param1: WindowMouseEvent): void => {
        this._navigator.openNavigator();
        this._navigator.goToMainView();
        this.hideForced();
    };

    private onHomeClick = (param1: WindowMouseEvent): void => {
        let _loc2_: number = this._navigator.data.homeRoomId;
        if (_loc2_ > -1) {
            this._navigator.goToPrivateRoom(_loc2_);
            this.hideForced();
        }
    };

    private onFavouritesClick = (param1: WindowMouseEvent): void => {
        this._navigator.showFavouriteRooms();
        this.hideForced();
    };

    private onCreateRoomClick = (param1: WindowMouseEvent): void => {
        this._navigator.send(new CanCreateRoomMessageComposer());
        this.hideForced();
    };

    private onHistoryClick = (param1: WindowMouseEvent): void => {
        this._navigator.showHistoryRooms();
        this.hideForced();
    };

    private onFrequentHistoryClick = (param1: WindowMouseEvent): void => {
        this._navigator.showFrequentRooms();
        this.hideForced();
    };

    private addSimpleItem(param1: string, param2: string, param3: (...args: any[]) => any): void {
        let _loc4_: IWindowContainer = castGuarded(this._simpleItemBase.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc4_.name = param1;
        (asGuarded(_loc4_.getChildByName("text"), isITextWindow)).text = param2;
        _loc4_.addEventListener("WME_CLICK", param3);
        _loc4_.addEventListener("WME_OVER", this.setItemBgHoverState);
        _loc4_.addEventListener("WME_OUT", this.setItemBgHoverState);
        this._SafeStr_2221.addListItem(_loc4_);
    }

    public show(param1: Point): void {
        this.stopHideTimeout();
        this._window.visible = true;
        this._window.position = param1;
    }

    public hideDelayed(): void {
        if (this._disposed || this._SafeStr_2874) {
            return;
        }
        this.startHideTimeout();
    }

    public hideForced(): void {
        if (this._disposed) {
            return;
        }
        this.stopHideTimeout();
        this._SafeStr_2874 = false;
        this._window.visible = false;
    }

    public hide(): void {
        if (this._disposed || this._SafeStr_2874) {
            return;
        }
        this.stopHideTimeout();
        this._SafeStr_2874 = false;
        this._window.visible = false;
    }

    private startHideTimeout(): void {
        if (!this._hideTimeout) {
            this._hideTimeout = new Timer(500, 1);
            this._hideTimeout.addEventListener("timerComplete", this.onHideTimeout);
            this._hideTimeout.start();
        } else {
            this._hideTimeout.reset();
            this._hideTimeout.start();
        }
    }

    private stopHideTimeout(): void {
        if (this._hideTimeout && this._hideTimeout.running) {
            this._hideTimeout.reset();
        }
    }

    private onHideTimeout = (param1: Event): void => {
        this.hide();
    };

    private setItemBgHoverState = (param1: WindowMouseEvent): void => {
        let _loc2_: boolean = false;
        let _loc4_: IRegionWindow = castGuarded(param1.target, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        let _loc3_: IBorderWindow = castGuarded(_loc4_.findChildByName("background"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        if (_loc3_) {
            _loc2_ = param1.type == "WME_OVER";
            _loc3_.color = (_loc2_ ? 7433577 : 5723213) >>> 0;
            this.onHoverOutWindow(param1);
        }
    };

    private onHoverOverWindow = (param1: WindowMouseEvent): void => {
        this._SafeStr_2874 = true;
    };

    private onHoverOutWindow = (param1: WindowMouseEvent): void => {
        if (this._window.hitTestGlobalPoint(new Point(param1.stageX, param1.stageY))) {
            this._SafeStr_2874 = true;
            return;
        }
        this._SafeStr_2874 = false;
        this.hideDelayed();
    };
}
