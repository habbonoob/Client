import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCampaigns } from '@/com/sulake/habbo/campaign/HabboCampaigns';
import type { CampaignCalendarData } from '@/com/sulake/habbo/communication/messages/parser/campaign/CampaignCalendarData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CalendarItem } from '@/com/sulake/habbo/campaign/calendar/CalendarItem';
import { CalendarSpinnerUtil } from '@/com/sulake/habbo/campaign/calendar/CalendarSpinnerUtil';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class CalendarView implements IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.campaign.calendar::CalendarView'); }

    private static readonly MARGIN: number = 75;

    declare private _controller: HabboCampaigns;

    declare private _modal: IModalDialog;

    private _selectedIndex: number = -1;

    declare private _itemsOnScreen: number;
    static { (this.prototype as any)._itemsOnScreen = 0; }

    constructor(param1: HabboCampaigns, param2: IHabboWindowManager) {
        let _loc7_: number = 0;
        let _loc5_: IWindowContainer = null;
        this._controller = param1;
        this._modal = param2.buildModalDialogFromXML(XML.from(this._controller.assets.getAssetByName("campaign_calendar_xml").content));
        if (!this._modal || !this._modal.rootWindow || !this.itemList) {
            return;
        }
        let _loc3_: IWindowContainer = asGuarded(this.itemList.getListItemAt(0), isIWindowContainer);
        this.itemList.removeListItems();
        let _loc6_: number = this.calendarData.campaignDays;
        _loc7_ = 0;
        while (_loc7_ < _loc6_) {
            _loc5_ = CalendarItem.populateItem(_loc3_, this.calendarData, _loc7_);
            _loc5_.procedure = this.onInput;
            this.itemList.addListItem(_loc5_);
            _loc7_++;
        }
        let _loc4_: Stage = this._controller.context.displayObjectContainer.stage;
        _loc4_.addEventListener("resize", this.onResize);
        this.window.procedure = this.onInput;
        this.onResize(null);
        this.setSelectedIndex(this._controller.calendarData.currentDay);
    }

    public dispose(): void {
        let _loc1_: Stage = null;
        if (this._modal != null) {
            _loc1_ = this._controller.context.displayObjectContainer.stage;
            _loc1_.removeEventListener("resize", this.onResize);
            this._modal.dispose();
            this._modal = null;
        }
    }

    public setReceivedProduct(param1: IProductData, param2: string = null): void {
        this.setInfoText("${campaign.calendar.heading.product.received}", param1.name);
        this.updateThumbnail(param2);
    }

    public imageReady(param1: number, param2: BitmapData): void {
        this.updateThumbnail(param2);
    }

    private updateThumbnail(param1: any): void {
        let _loc2_: IWindowContainer = asGuarded(this.itemList.getListItemAt(this._selectedIndex >>> 0), isIWindowContainer);
        if (!_loc2_) {
            return;
        }
        CalendarItem.updateThumbnail(_loc2_, param1);
    }

    public imageFailed(param1: number): void {
    }

    public hide(): void {
        this._controller.hideCalendar();
    }

    private onResize = (param1: Event): void => {
        let _loc2_: Stage = this._controller.context.displayObjectContainer.stage;
        this._itemsOnScreen = Math.floor((_loc2_.stageWidth - 75 * 2) / (this.itemWidth + this.itemGap)) | 0;
        this._modal.rootWindow.width = this.calculateItemListWidth(this._itemsOnScreen) | 0;
        let _loc3_: IWindow = this.window.findChildByName("btn_forward");
        if (_loc3_) {
            _loc3_.x = this.scrollerWidth - this.window.findChildByName("btn_back").x - _loc3_.width;
        }
        _loc3_ = this.window.findChildByName("calendar_scrollbar");
        if (_loc3_) {
            _loc3_.width = this.scrollerWidth;
        }
        this.window.center();
        if (this._selectedIndex > -1) {
            this.setSelectedIndex(this._selectedIndex);
        }
    };

    private onInput = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        if (param1.type != "WME_DOWN") {
            return;
        }
        switch (param2.name) {
            case "btn_present":
                _loc3_ = this.itemList.getListItemIndex(param1.target.parent);
                if (_loc3_ < 0) {
                    return;
                }
                if (_loc3_ != this._selectedIndex) {
                    this.setSelectedIndex(_loc3_);
                } else {
                    this._controller.openPackage(this._selectedIndex);
                }
                break;
            case "btn_back":
                this.setSelectedIndex(this._selectedIndex - 1);
                break;
            case "btn_forward":
                this.setSelectedIndex(this._selectedIndex + 1);
                break;
            case "btn_force_open":
                this._controller.openPackageAsStaff(this._selectedIndex);
                break;
            case "header_button_close":
                this.hide();
        }
    };

    private setSelectedIndex(param1: number): void {
        let _loc6_: number = 0;
        let _loc2_: IWindowContainer = null;
        let _loc7_: IButtonWindow = null;
        let _loc5_: string = null;
        let _loc4_: string = null;
        if (param1 < 0 || param1 >= this.calendarData.campaignDays) {
            return;
        }
        this._selectedIndex = param1;
        this.itemList.scrollH = this.calculateCenteredItemScrollH(this._selectedIndex);
        _loc6_ = 0;
        while (_loc6_ < this.calendarData.campaignDays) {
            _loc2_ = asGuarded(this.itemList.getListItemAt(_loc6_ >>> 0), isIWindowContainer);
            CalendarItem.updateState(_loc2_, this.calendarData, _loc6_, param1);
            _loc6_++;
        }
        CalendarSpinnerUtil.createGradients(this, this._selectedIndex);
        if (this._controller.isAnyRoomController) {
            _loc7_ = asGuarded(this.window.findChildByName("btn_force_open"), isIButtonWindow);
            _loc7_.visible = true;
        }
        let _loc3_: number = CalendarItem.resolveDayState(this.calendarData, param1);
        if (this._selectedIndex < 0) {
            this.setInfoText(null, null);
            if (_loc7_) {
                _loc7_.disable();
            }
        } else {
            switch (_loc3_ - 1) {
                case 0:
                    _loc5_ = "${campaign.calendar.info.unlocked}";
                    break;
                case 1:
                    _loc5_ = "${campaign.calendar.info.available.desktop}";
                    break;
                case 2:
                    _loc5_ = "${campaign.calendar.info.expired}";
                    break;
                case 3:
                    _loc5_ = "${campaign.calendar.info.future}";
            }
            _loc4_ = this._controller.localizationManager.getLocalization("campaign.calendar.heading.day") || "";
            _loc4_ = _loc4_.replace("%number%", String(this._selectedIndex + 1));
            this.setInfoText(_loc4_, _loc5_);
            if (_loc7_) {
                if (_loc3_ != 1) {
                    _loc7_.enable();
                } else {
                    _loc7_.disable();
                }
            }
        }
    }

    private setInfoText(param1: string, param2: string): void {
        (asGuarded(this.window.findChildByName("info_heading"), isITextWindow)).text = param1 || "";
        (asGuarded(this.window.findChildByName("info_body"), isITextWindow)).text = param2 || "";
    }

    private startItemWiggle(param1: number): void {
    }

    public get window(): IFrameWindow {
        return this._modal ? asGuarded(this._modal.rootWindow, isIFrameWindow) : null;
    }

    private getItemIndexAt(param1: number): number {
        return Math.floor((this.itemList.scrollH * this.itemList.maxScrollH + param1) / ((this.itemList.maxScrollH + this.scrollerWidth) / this.itemList.numListItems)) | 0;
    }

    private calculateCenteredItemScrollH(param1: number): number {
        return (this.calculateItemListWidth(param1) - (this.scrollerWidth - this.itemWidth) * 0.5) / this.itemList.maxScrollH;
    }

    public calculateItemListWidth(param1: number): number {
        return param1 * this.itemWidth + Math.max(0, param1 - 1) * this.itemGap;
    }

    public get itemList(): IItemListWindow {
        return this.window ? asGuarded(this.window.findChildByName("calendar_itemlist"), isIItemListWindow) : null;
    }

    public get itemWidth(): number {
        return this.itemList && this.itemList.numListItems > 0 ? this.itemList.getListItemAt(0).width : 0;
    }

    public get itemGap(): number {
        return this.itemList ? this.itemList.spacing : 0;
    }

    public get scrollerWidth(): number {
        return this.window && this.window.content ? this.window.content.width : 0;
    }

    private get calendarData(): CampaignCalendarData {
        return this._controller.calendarData;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
