import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';

export class LiftView implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view::LiftView'); }

    private static readonly AUTO_CYCLE_TIMEOUT_MS: number = 8000;

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
        this._navigator.registerUpdateReceiver(this, 1000);
    }

    declare private _navigator: HabboNewNavigator;

    declare private _SafeStr_4712: IBorderWindow;

    declare private _SafeStr_4284: IItemListWindow;

    declare private _pagerIconTemplate: IRegionWindow;

    private _SafeStr_2379: number = -1;
    private _SafeStr_3969: number = getTimer() >>> 0;

    public get disposed(): boolean {
        return this._navigator == null;
    }

    public set pagerIconTemplate(param1: IRegionWindow) {
        this._pagerIconTemplate = param1;
    }

    public set borderWindow(param1: IBorderWindow) {
        this._SafeStr_4712 = param1;
        this._SafeStr_4284 = castGuarded(this._SafeStr_4712.findChildByName("pager_itemlist"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        castGuarded(this._SafeStr_4712.findChildByName("room_image_click_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").procedure = this.goToRoomRegionProcedure;
    }

    public dispose(): void {
        this._navigator.removeUpdateReceiver(this);
        this._navigator = null;
    }

    public refresh(param1: boolean = true): void {
        let _loc2_: number = 0;
        this._SafeStr_4284.destroyListItems();
        this._SafeStr_2379 = param1 ? 0 : this._SafeStr_2379;
        _loc2_ = 0;
        while (_loc2_ < this._navigator.liftDataContainer.liftedRooms.length) {
            this._SafeStr_4284.addListItem(this._pagerIconTemplate.clone());
            _loc2_++;
        }
        this.setPagerToSelectedPage();
        this.drawSelectedPage();
    }

    public update(param1: number): void {
        let _loc2_: number = getTimer() >>> 0;
        if (this._SafeStr_3969 + 8000 < _loc2_) {
            this.autoCycleToNextPage();
            this._SafeStr_3969 = _loc2_;
        }
    }

    private setPagerToSelectedPage(): void {
        let _loc1_: number = 0;
        let _loc2_: IRegionWindow = null;
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_4284.numListItems) {
            _loc2_ = castGuarded(this._SafeStr_4284.getListItemAt(_loc1_ >>> 0), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
            castGuarded(_loc2_.findChildByName("icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = _loc1_ == this._SafeStr_2379 ? "progress_disk_flat_on" : "progress_disk_flat_off";
            _loc2_.id = _loc1_;
            _loc2_.procedure = this.pagerPageProcedure;
            _loc1_++;
        }
    }

    private drawSelectedPage(): void {
        this.setPagerToSelectedPage();
        castGuarded(this._SafeStr_4712.findChildByName("room_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this._navigator.liftDataContainer.getUrlForLiftImageAtIndex(this._SafeStr_2379);
        if (this._SafeStr_2379 < this._navigator.liftDataContainer.liftedRooms.length) {
            this._SafeStr_4712.findChildByName("caption_text").caption = this._navigator.liftDataContainer.liftedRooms[this._SafeStr_2379].caption;
        }
    }

    private autoCycleToNextPage(): void {
        this._SafeStr_2379 = this._SafeStr_2379 + 1;
        if (this._SafeStr_2379 > this._navigator.liftDataContainer.liftedRooms.length - 1) {
            this._SafeStr_2379 = 0;
        }
        this.refresh(false);
    }

    private pagerPageProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (param2.id != this._SafeStr_2379) {
                this._SafeStr_2379 = param2.id;
                this.drawSelectedPage();
                this._SafeStr_3969 = getTimer() >>> 0;
                this._navigator.trackEventLog("browse.promotion", "Promotion", "", this._SafeStr_2379);
            }
        }
    };

    private goToRoomRegionProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (this._navigator.liftDataContainer.liftedRooms.length > this._SafeStr_2379) {
                this._navigator.goToRoom(this._navigator.liftDataContainer.liftedRooms[this._SafeStr_2379].flatId, "promotion");
            }
        }
    };

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
