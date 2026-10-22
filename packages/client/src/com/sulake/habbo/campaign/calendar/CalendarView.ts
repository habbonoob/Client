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
import { Event } from '@habbo-pixi/runtime/events/Event';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CalendarItem } from '@/com/sulake/habbo/campaign/calendar/CalendarItem';
import { CalendarSpinnerUtil } from '@/com/sulake/habbo/campaign/calendar/CalendarSpinnerUtil';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class CalendarView implements IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.campaign.calendar::CalendarView'); }

    private static readonly MARGIN: number = 75;

    declare private _campaigns: HabboCampaigns;

    declare private _dialog: IModalDialog;

    private _selectedIndex: number = -1;

    declare private _itemsOnScreen: number;
    static { (this.prototype as any)._itemsOnScreen = 0; }

    constructor(campaigns: HabboCampaigns, windowManager: IHabboWindowManager) {
        let item: IWindowContainer = null;
        this._campaigns = campaigns;
        this._dialog = windowManager.buildModalDialogFromXML(XML.from(this._campaigns.assets.getAssetByName("campaign_calendar_xml").content));
        if (!this._dialog || !this._dialog.rootWindow || !this.itemList) {
            return;
        }
        let template: IWindowContainer = asGuarded(this.itemList.getListItemAt(0), isIWindowContainer);
        this.itemList.removeListItems();
        this.itemList.disableAutodrag = true;
        let dayCount: number = this.calendarData.campaignDays;
        for (let dayIndex: number = 0; dayIndex < dayCount; dayIndex++) {
            item = CalendarItem.populateItem(template, this.calendarData, dayIndex);
            item.procedure = this.onInput;
            this.itemList.addListItem(item);
        }
        let stage: Stage = this._campaigns.context.displayObjectContainer.stage;
        stage.addEventListener(Event.RESIZE, this.onResize);
        this.window.procedure = this.onInput;
        this.onResize(null);
        this.setSelectedIndex(this._campaigns.calendarData.currentDay);
    }

    public get window(): IFrameWindow {
        return this._dialog ? asGuarded(this._dialog.rootWindow, isIFrameWindow) : null;
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
        return this._campaigns.calendarData;
    }

    public dispose(): void {
        let stage: Stage = null;
        if (this._dialog != null) {
            stage = this._campaigns.context.displayObjectContainer.stage;
            stage.removeEventListener(Event.RESIZE, this.onResize);
            this._dialog.dispose();
            this._dialog = null;
        }
    }

    public setReceivedProduct(productData: IProductData, imageUrl: string = null): void {
        this.setInfoText("${campaign.calendar.heading.product.received}", productData.name);
        this.updateThumbnail(imageUrl);
    }

    public imageReady(id: number, bitmapData: BitmapData): void {
        this.updateThumbnail(bitmapData);
    }

    public imageFailed(id: number): void {
    }

    public hide(): void {
        this._campaigns.hideCalendar();
    }

    public calculateItemListWidth(itemCount: number): number {
        return itemCount * this.itemWidth + Math.max(0, itemCount - 1) * this.itemGap;
    }

    private updateThumbnail(image: any): void {
        let item: IWindowContainer = asGuarded(this.itemList.getListItemAt(this._selectedIndex >>> 0), isIWindowContainer);
        if (!item) {
            return;
        }
        CalendarItem.updateThumbnail(item, image);
    }

    private onInput = (event: WindowEvent, target: IWindow): void => {
        let itemIndex: number = 0;
        if (event.type != WindowMouseEvent.DOWN) {
            return;
        }
        switch (target.name) {
            case "btn_present":
                itemIndex = this.itemList.getListItemIndex(event.target.parent);
                if (itemIndex < 0) {
                    return;
                }
                if (itemIndex != this._selectedIndex) {
                    this.setSelectedIndex(itemIndex);
                    break;
                }
                this._campaigns.openPackage(this._selectedIndex);
                break;
            case "btn_back":
                this.setSelectedIndex(this._selectedIndex - 1);
                break;
            case "btn_forward":
                this.setSelectedIndex(this._selectedIndex + 1);
                break;
            case "btn_force_open":
                this._campaigns.openPackageAsStaff(this._selectedIndex);
                break;
            case "header_button_close":
                this.hide();
        }
    };

    private setSelectedIndex(index: number): void {
        let item: IWindowContainer = null;
        let forceOpenButton: IButtonWindow = null;
        let infoBody: string = null;
        let infoHeading: string = null;
        if (index < 0 || index >= this.calendarData.campaignDays) {
            return;
        }
        this._selectedIndex = index;
        this.itemList.scrollH = this.calculateCenteredItemScrollH(this._selectedIndex);
        for (let dayIndex: number = 0; dayIndex < this.calendarData.campaignDays; dayIndex++) {
            item = asGuarded(this.itemList.getListItemAt(dayIndex >>> 0), isIWindowContainer);
            CalendarItem.updateState(item, this.calendarData, dayIndex, index);
        }
        CalendarSpinnerUtil.createGradients(this, this._selectedIndex);
        if (this._campaigns.isAnyRoomController) {
            forceOpenButton = asGuarded(this.window.findChildByName("btn_force_open"), isIButtonWindow);
            forceOpenButton.visible = true;
        }
        let dayState: number = CalendarItem.resolveDayState(this.calendarData, index);
        if (this._selectedIndex < 0) {
            this.setInfoText(null, null);
            if (forceOpenButton) {
                forceOpenButton.disable();
            }
        } else {
            switch (dayState) {
                case CalendarItem.STATE_UNLOCKED:
                    infoBody = "${campaign.calendar.info.unlocked}";
                    break;
                case CalendarItem.STATE_LOCKED_AVAILABLE:
                    infoBody = "${campaign.calendar.info.available.desktop}";
                    break;
                case CalendarItem.STATE_LOCKED_EXPIRED:
                    infoBody = "${campaign.calendar.info.expired}";
                    break;
                case CalendarItem.STATE_LOCKED_FUTURE:
                    infoBody = "${campaign.calendar.info.future}";
            }
            infoHeading = this._campaigns.localizationManager.getLocalization("campaign.calendar.heading.day") || "";
            infoHeading = infoHeading.replace("%number%", String(this._selectedIndex + 1));
            this.setInfoText(infoHeading, infoBody);
            if (forceOpenButton) {
                if (dayState != CalendarItem.STATE_UNLOCKED) {
                    forceOpenButton.enable();
                } else {
                    forceOpenButton.disable();
                }
            }
        }
    }

    private setInfoText(heading: string, body: string): void {
        (asGuarded(this.window.findChildByName("info_heading"), isITextWindow)).text = heading || "";
        (asGuarded(this.window.findChildByName("info_body"), isITextWindow)).text = body || "";
    }

    private startItemWiggle(index: number): void {
    }

    private getItemIndexAt(x: number): number {
        return Math.floor((this.itemList.scrollH * this.itemList.maxScrollH + x) / ((this.itemList.maxScrollH + this.scrollerWidth) / this.itemList.numListItems)) | 0;
    }

    private calculateCenteredItemScrollH(index: number): number {
        return (this.calculateItemListWidth(index) - (this.scrollerWidth - this.itemWidth) * 0.5) / this.itemList.maxScrollH;
    }

    private onResize = (event: Event): void => {
        let stage: Stage = this._campaigns.context.displayObjectContainer.stage;
        this._itemsOnScreen = Math.floor((stage.stageWidth - CalendarView.MARGIN * 2) / (this.itemWidth + this.itemGap)) | 0;
        this._dialog.rootWindow.width = this.calculateItemListWidth(this._itemsOnScreen) | 0;
        let child: IWindow = this.window.findChildByName("btn_forward");
        if (child) {
            child.x = this.scrollerWidth - this.window.findChildByName("btn_back").x - child.width;
        }
        child = this.window.findChildByName("calendar_scrollbar");
        if (child) {
            child.width = this.scrollerWidth;
        }
        this.window.center();
        if (this._selectedIndex > -1) {
            this.setSelectedIndex(this._selectedIndex);
        }
    };

    get [IGetImageListener](): true {
        return true;
    }
}
