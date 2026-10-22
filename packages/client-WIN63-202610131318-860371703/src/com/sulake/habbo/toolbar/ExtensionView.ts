import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { IExtensionView } from '@/com/sulake/habbo/toolbar/IExtensionView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Core } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ExtensionViewEvent } from '@/com/sulake/habbo/toolbar/events/ExtensionViewEvent';

export class ExtensionView implements IExtensionView {
    static { registerClassName(this, 'com.sulake.habbo.toolbar::ExtensionView'); }

    private static readonly MARGIN: number = 3;
    private static readonly PURSE_EXTENSION_OFFSET: number = -8;

    declare private _toolbar: HabboToolbar;

    declare private _SafeStr_2203: IItemListWindow;

    declare private _items: UtilsMap;

    private _disposed: boolean = false;
    private _landingView: boolean = false;
    private _SafeStr_2937: any[] = [];

    declare private _windowManager: IHabboWindowManager;

    private _extraMargin: number = 0;

    constructor(param1: IHabboWindowManager, param2: IAssetLibrary, param3: HabboToolbar) {
        this._toolbar = param3;
        this._windowManager = param1;
        let _loc5_: XmlAsset = asInstanceOf(param2.getAssetByName("extension_grid_xml"), XmlAsset);
        if (_loc5_) {
            this._SafeStr_2203 = asGuarded(param1.buildFromXML(asInstanceOf(_loc5_.content, XML), 1), isIItemListWindow);
        }
        let _loc4_: IWindowContainer = this._SafeStr_2203.desktop;
        if (this._SafeStr_2203) {
            this._SafeStr_2203.x = _loc4_.width - this._SafeStr_2203.width - 3 - this.extraMargin;
            this._SafeStr_2203.y = 3;
            this._SafeStr_2203.visible = true;
        } else {
            Core.error("Unable to initialize Toolbar Extension view window from xml asset", false);
        }
        this._items = new UtilsMap();
    }

    public dispose(): void {
        let _loc1_: any[] = null;
        let _loc2_: any = null;
        if (!this._disposed) {
            _loc1_ = this._items.getKeys();
            for (_loc2_ of _loc1_ ?? []) {
                this.detachExtension(stringOrNull(_loc2_));
            }
            if (this._SafeStr_2203) {
                this._SafeStr_2203.dispose();
                this._SafeStr_2203 = null;
            }
            this._SafeStr_2937 = null;
            this._toolbar = null;
            this._items = null;
            this._disposed = true;
        }
    }

    public get visible(): boolean {
        return !!(this._SafeStr_2203 && this._SafeStr_2203.visible);
    }

    public get screenHeight(): number {
        if (!this._SafeStr_2203) {
            return 0;
        }
        return this._SafeStr_2203.height + this._SafeStr_2203.y >>> 0;
    }

    public attachExtension(param1: string, param2: IWindow, param3: number = -1, param4: any[] = null): void {
        if (!this._disposed) {
            if (this._items.getValue(param1)) {
                return;
            }
            this._items.add(param1, param2);
            param3 = param4 != null ? this.resolveIndex(param4) : param3;
            if (param3 == -1) {
                this._SafeStr_2937.push(param2);
            } else {
                this._SafeStr_2937.splice(param3, 0, param2);
            }
            if (this._SafeStr_2203) {
                this._toolbar.createAndAttachDimmerWindow(isIWindowContainer(param2) ? param2 : null);
                this.refreshItemWindow();
            }
            this.queueResizeEvent();
        }
    }

    public hasExtension(param1: string): boolean {
        return this._items.getValue(param1) != null;
    }

    private getKeyForWindow(param1: IWindow): string {
        let _loc2_: number = this._items.getValues().indexOf(param1);
        if (_loc2_ != -1) {
            return stringOrNull(this._items.getKeys()[_loc2_]);
        }
        return "";
    }

    public refreshItemWindow(): void {
        let _loc2_: string = null;
        this._SafeStr_2203.removeListItems();
        for (const _loc1_ of this._SafeStr_2937 ?? []) {
            _loc2_ = this.getKeyForWindow(_loc1_);
            if (_loc2_.indexOf("new_feature") == 0 || _loc2_.indexOf("purse_seasonal_currency") == 0) {
                this._SafeStr_2203.addListItem(_loc1_);
            } else {
                switch (_loc2_) {
                    case "logout_tools":
                    case "purse_credits":
                    case "purse_engagement_currency":
                    case "purse_habbo_club":
                    case "purse_seasonal_currency":
                    case "talent_promo":
                    case "club_promo":
                    case "vip_quests":
                    case "video_offers":
                    case "settings":
                    case "phone_number":
                    case "verification_code":
                    case "return_gift":
                    case "new_feature":
                    case "targeted_offer":
                        this._SafeStr_2203.addListItem(_loc1_);
                        break;
                    case "purse":
                        this._SafeStr_2203.addListItem(_loc1_);
                        this._SafeStr_2203.y = 3 + -8;
                        break;
                    default:
                        if (!this._landingView) {
                            this._SafeStr_2203.addListItem(_loc1_);
                        }
                }
            }
        }
        this._SafeStr_2203.arrangeListItems();
        this._SafeStr_2203.invalidate();
    }

    private resolveIndex(param1: any[]): number {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2937.length) {
            if (param1.indexOf(this._SafeStr_2937[_loc2_].name) > -1) {
                return _loc2_;
            }
            _loc2_++;
        }
        return -1;
    }

    public detachExtension(param1: string): void {
        let _loc2_: IWindowContainer = null;
        if (!this._disposed) {
            _loc2_ = this._items[param1];
            if (_loc2_ != null) {
                this._SafeStr_2937.splice(this._SafeStr_2937.indexOf(_loc2_), 1);
                if (this._SafeStr_2203) {
                    this._toolbar.removeDimmer(_loc2_);
                    this.refreshItemWindow();
                }
            }
            this._items.remove(param1);
            this.queueResizeEvent();
        }
    }

    private queueResizeEvent(): void {
        let _loc1_: Timer = new Timer(25, 1);
        _loc1_.addEventListener("timerComplete", this.onResizeTimer);
        _loc1_.start();
    }

    private onResizeTimer = (param1: TimerEvent): void => {
        if (this._toolbar) {
            this._toolbar.events.dispatchEvent(new ExtensionViewEvent("EVE_EXTENSION_VIEW_RESIZED"));
        }
    };

    public set visible(param1: boolean) {
        if (this._SafeStr_2203) {
            this._SafeStr_2203.visible = param1;
        }
    }

    public removeDimmers(): void {
        for (const _loc1_ of this._SafeStr_2937 ?? []) {
            this._toolbar.removeDimmer(_loc1_);
        }
    }

    public getIconLocation(param1: string): Rectangle {
        let _loc3_: IWindow = null;
        let _loc2_: Rectangle = null;
        let _loc4_: string = param1;
        if ("HTIE_EXT_GROUP" === _loc4_) {
            _loc3_ = asGuarded(this._items["room_group_info"], isIWindow);
        }
        if (_loc3_ != null && _loc3_.visible) {
            _loc2_ = new Rectangle();
            _loc3_.getGlobalRectangle(_loc2_);
            return _loc2_;
        }
        return null;
    }

    public getIcon(param1: string): IWindow {
        let _loc2_: IWindow = null;
        if (param1 == "HTIE_EXT_GROUP") {
            _loc2_ = asGuarded(this._items["room_group_info"], isIWindow);
        }
        return _loc2_;
    }

    public get landingView(): boolean {
        return this._landingView;
    }

    public set landingView(param1: boolean) {
        this._landingView = param1;
        this.refreshItemWindow();
    }

    public set extraMargin(param1: number) {
        this._extraMargin = param1;
        if (this._SafeStr_2203) {
            this._SafeStr_2203.x = this._SafeStr_2203.desktop.width - this._SafeStr_2203.width - 3 - this.extraMargin;
        }
    }

    public get extraMargin(): number {
        return this._extraMargin;
    }
}
