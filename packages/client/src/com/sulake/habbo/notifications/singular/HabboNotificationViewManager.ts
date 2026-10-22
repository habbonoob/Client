import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { HabboNotifications } from '@/com/sulake/habbo/notifications/HabboNotifications';
import type { HabboNotificationItem } from '@/com/sulake/habbo/notifications/singular/HabboNotificationItem';
import type { BadgeImageReadyEvent } from '@/com/sulake/habbo/session/events/BadgeImageReadyEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { HabboNotificationItemView } from '@/com/sulake/habbo/notifications/singular/HabboNotificationItemView';

export class HabboNotificationViewManager implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.notifications.singular::HabboNotificationViewManager'); }

    private static readonly SPACING: number = 4;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _windowManager: IHabboWindowManager;

    declare private _toolbar: IHabboToolbar;

    declare private _notifications: HabboNotifications;

    declare private _styleConfig: UtilsMap;

    declare private _viewConfig: UtilsMap;

    private _disposed: boolean = false;

    declare private _viewItems: any[];

    constructor(param1: HabboNotifications, param2: IAssetLibrary, param3: IHabboWindowManager, param4: IHabboToolbar, param5: UtilsMap, param6: UtilsMap) {
        this._notifications = param1;
        this._SafeStr_3052 = param2;
        this._windowManager = param3;
        this._toolbar = param4;
        this._styleConfig = param5;
        this._viewConfig = param6;
        this._viewItems = [];
        if (this._toolbar) {
            this._toolbar.events.addEventListener("EVE_EXTENSION_VIEW_RESIZED", this.refreshTopMargin);
        }
        this._notifications.registerUpdateReceiver(this, 2);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public replaceIcon(param1: BadgeImageReadyEvent): void {
        for (const _loc2_ of this._viewItems ?? []) {
            _loc2_.replaceIcon(param1);
        }
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: number = this._viewItems.length | 0;
        _loc2_ = 0;
        while (_loc2_ < _loc1_) {
            (asInstanceOf(this._viewItems.pop(), HabboNotificationItemView)).dispose();
            _loc2_++;
        }
        this._SafeStr_3052 = null;
        this._windowManager = null;
        if (this._styleConfig) {
            this._styleConfig.dispose();
            this._styleConfig = null;
        }
        if (this._viewConfig) {
            this._viewConfig.dispose();
            this._viewConfig = null;
        }
        if (this._toolbar) {
            this._toolbar.events.removeEventListener("EVE_EXTENSION_VIEW_RESIZED", this.refreshTopMargin);
            this._toolbar = null;
        }
        if (this._notifications != null) {
            this._notifications.removeUpdateReceiver(this);
            this._notifications = null;
        }
        this._disposed = true;
    }

    public showItem(param1: HabboNotificationItem): boolean {
        if (!this.isSpaceAvailable()) {
            return false;
        }
        let _loc4_: string = param1.style.customLayout == null ? "layout_notification_xml" : param1.style.customLayout;
        let _loc3_: string = param1.style.customView;
        let _loc5_: UtilsMap = _loc3_ == null ? this._viewConfig["view"] : this._viewConfig[_loc3_];
        let _loc2_: HabboNotificationItemView = new HabboNotificationItemView(this._notifications.localization, this._SafeStr_3052.getAssetByName(_loc4_), this._windowManager, this._styleConfig, _loc5_, param1);
        _loc2_.reposition(this.getNextAvailableVerticalPosition());
        this._viewItems.push(_loc2_);
        this._viewItems.sort((a, b) => a.verticalPosition - b.verticalPosition);
        return true;
    }

    public isSpaceAvailable(): boolean {
        return this.getNextAvailableVerticalPosition() + 70 < this._windowManager.getDesktop(0).height;
    }

    public update(param1: number): void {
        let _loc2_: HabboNotificationItemView = null;
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._viewItems.length) {
            (asInstanceOf(this._viewItems[_loc3_], HabboNotificationItemView)).update(param1);
            _loc3_++;
        }
        _loc3_ = 0;
        while (_loc3_ < this._viewItems.length) {
            _loc2_ = asInstanceOf(this._viewItems[_loc3_], HabboNotificationItemView);
            if (_loc2_.ready) {
                _loc2_.dispose();
                this._viewItems.splice(_loc3_, 1);
                _loc3_--;
            }
            _loc3_++;
        }
    }

    private getNextAvailableVerticalPosition(): number {
        let _loc3_: number = 0;
        let _loc1_: HabboNotificationItemView = null;
        if (!this._toolbar) {
            return 4;
        }
        if (!this._toolbar.extensionView) {
            return 4;
        }
        let _loc2_: number = this._toolbar.extensionView.screenHeight + 4;
        if (this._viewItems.length == 0) {
            return _loc2_;
        }
        let _loc4_: any = _loc2_;
        _loc3_ = 0;
        while (_loc3_ < this._viewItems.length) {
            _loc1_ = asInstanceOf(this._viewItems[_loc3_], HabboNotificationItemView);
            if (_loc4_ + _loc1_.height < _loc1_.verticalPosition) {
                return _loc4_ | 0;
            }
            _loc4_ = _loc1_.verticalPosition + _loc1_.height + 4;
            _loc3_++;
        }
        return _loc4_ | 0;
    }

    public refreshTopMargin = (param1: Event): void => {
        let _loc4_: number = 0;
        let _loc2_: HabboNotificationItemView = null;
        let _loc3_: number = this._toolbar.extensionView.screenHeight + 4;
        _loc4_ = 0;
        while (_loc4_ < this._viewItems.length) {
            _loc2_ = asInstanceOf(this._viewItems[_loc4_], HabboNotificationItemView);
            _loc2_.reposition(_loc3_);
            _loc3_ = _loc2_.verticalPosition + _loc2_.height + 4;
            _loc4_++;
        }
    };

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
