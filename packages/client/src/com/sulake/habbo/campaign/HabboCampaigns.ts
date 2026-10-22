import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { CampaignCalendarDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/campaign/CampaignCalendarDataMessageParser';
import type { CampaignCalendarDoorOpenedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/campaign/CampaignCalendarDoorOpenedMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { CalendarView } from '@/com/sulake/habbo/campaign/calendar/CalendarView';
import { CampaignCalendarDataMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/campaign/CampaignCalendarDataMessageEvent';
import { CampaignCalendarDoorOpenedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/campaign/CampaignCalendarDoorOpenedMessageEvent';
import { OpenCampaignCalendarDoorAsStaffComposer } from '@/com/sulake/habbo/communication/messages/outgoing/campaign/OpenCampaignCalendarDoorAsStaffComposer';
import { OpenCampaignCalendarDoorComposer } from '@/com/sulake/habbo/communication/messages/outgoing/campaign/OpenCampaignCalendarDoorComposer';
import { CampaignCalendarData } from '@/com/sulake/habbo/communication/messages/parser/campaign/CampaignCalendarData';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboCampaigns extends Component implements ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.campaign::HabboCampaigns'); }

    private static readonly LINK_PATTERN: string = "openView/";
    private static readonly LINK_CALENDAR: string = "calendar";
    private static readonly NO_PENDING_DAY: number = -1;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _catalog: IHabboCatalog;

    declare private _roomEngine: IRoomEngine;

    declare private _calendarView: CalendarView;

    declare private _calendarData: CampaignCalendarData;

    declare private _pendingDay: number;

    declare private _useTestData: boolean;

    constructor(context: IContext, flags: number, assetLibrary: IAssetLibrary) {
        super(context, flags, assetLibrary);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (communicationManager: IHabboCommunicationManager): void => {
                this._communicationManager = communicationManager;
            }, true), new ComponentDependency(new IIDSessionDataManager(), (sessionDataManager: ISessionDataManager): void => {
                this._sessionDataManager = sessionDataManager;
            }), new ComponentDependency(new IIDHabboWindowManager(), (windowManager: IHabboWindowManager): void => {
                this._windowManager = windowManager;
            }), new ComponentDependency(new IIDHabboLocalizationManager(), (localizationManager: IHabboLocalizationManager): void => {
                this._localizationManager = localizationManager;
            }), new ComponentDependency(new IIDHabboCatalog(), (catalog: IHabboCatalog): void => {
                this._catalog = catalog;
            }), new ComponentDependency(new IIDRoomEngine(), (roomEngine: IRoomEngine): void => {
                this._roomEngine = roomEngine;
            })]);
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get linkPattern(): string {
        return HabboCampaigns.LINK_PATTERN;
    }

    public get calendarData(): CampaignCalendarData {
        return this._calendarData;
    }

    public get isAnyRoomController(): boolean {
        return this._sessionDataManager.isAnyRoomController;
    }

    protected override initComponent(): void {
        if (false && this._useTestData) {
            this._calendarData = new CampaignCalendarData();
            this._calendarData.campaignDays = 24;
            this._calendarData.currentDay = 5;
            this._calendarData.campaignName = "summer";
            this._calendarData.openedDays = [0, 1];
            this._calendarData.missedDays = [2, 3];
            this.showCalendar();
        }
        this._communicationManager.addHabboConnectionMessageEvent(new CampaignCalendarDataMessageEvent(this.onCampaignCalendarDataMessageEvent));
        this._communicationManager.addHabboConnectionMessageEvent(new CampaignCalendarDoorOpenedMessageEvent(this.onCampaignCalendarDoorOpenedMessageEvent));
        this.context.addLinkEventTracker(this);
    }

    public openPackage(dayIndex: number): void {
        this._pendingDay = dayIndex;
        if (false && this._useTestData) {
            this.showProductNotification("A1 KUMIANKKA", "", "duck");
        } else {
            this._communicationManager.connection.send(new OpenCampaignCalendarDoorComposer(this._calendarData.campaignName, dayIndex));
        }
    }

    public openPackageAsStaff(dayIndex: number): void {
        this._pendingDay = dayIndex;
        if (false && this._useTestData) {
            this.showProductNotification("hween_c15_evilcrystal2", "targetedoffers/web_offer_credits_small.png", "hween_c15_evilcrystal2");
        } else {
            this._communicationManager.connection.send(new OpenCampaignCalendarDoorAsStaffComposer(this._calendarData.campaignName, dayIndex));
        }
    }

    public linkReceived(link: string): void {
        let parts: any[] = link.split("/");
        if (parts.length < 2) {
            return;
        }
        if (parts[1] == HabboCampaigns.LINK_CALENDAR) {
            this.showCalendar();
        }
    }

    public hideCalendar(): void {
        if (this._calendarView) {
            this._calendarView.dispose();
            this._calendarView = null;
        }
    }

    private onCampaignCalendarDataMessageEvent(event: CampaignCalendarDataMessageEvent): void {
        if (false && this._useTestData) {
            return;
        }
        let parser: CampaignCalendarDataMessageParser = event.getParser();
        this._calendarData = parser.cloneData();
    }

    private onCampaignCalendarDoorOpenedMessageEvent(event: CampaignCalendarDoorOpenedMessageEvent): void {
        let parser: CampaignCalendarDoorOpenedMessageParser = event.getParser();
        if (parser.doorOpened) {
            this.showProductNotification(parser.productName, parser.customImage, parser.furnitureClassName);
        }
    }

    private showProductNotification(productName: string, customImage: string, furnitureClassName: string): void {
        let productData: IProductData = this._sessionDataManager.getProductData(productName);
        if (productData != null) {
            this._calendarData.openedDays.push(this._pendingDay);
            this._pendingDay = HabboCampaigns.NO_PENDING_DAY;
            if (customImage && customImage != "") {
                this._calendarView.setReceivedProduct(productData, this.getImageGalleryUrl() + customImage);
            } else if (furnitureClassName && furnitureClassName != "") {
                this._calendarView.setReceivedProduct(productData);
                this.requestIconFromRoomEngine(this._calendarView, furnitureClassName);
            }
        }
    }

    private requestIconFromRoomEngine(listener: IGetImageListener, className: string): ImageResult {
        let result: ImageResult = null;
        let furnitureData: IFurnitureData = this._sessionDataManager.getFloorItemDataByName(className);
        if (furnitureData) {
            result = this._roomEngine.getFurnitureIcon(furnitureData.id, listener);
        } else {
            furnitureData = this._sessionDataManager.getWallItemDataByName(className);
            if (furnitureData) {
                result = this._roomEngine.getWallItemIcon(furnitureData.id, listener);
            }
        }
        if (result && result.data) {
            listener.imageReady(result.id, result.data);
        }
        return result;
    }

    private showCalendar(): void {
        if (!this._calendarView && this._calendarData) {
            this._calendarView = new CalendarView(this, this._windowManager);
        }
    }

    private getImageGalleryUrl(): string {
        return this.getProperty("image.library.url");
    }

    protected override initInstanceFields(): void {
        this.onCampaignCalendarDataMessageEvent = this.onCampaignCalendarDataMessageEvent.bind(this);
        this.onCampaignCalendarDoorOpenedMessageEvent = this.onCampaignCalendarDoorOpenedMessageEvent.bind(this);
        this._pendingDay = HabboCampaigns.NO_PENDING_DAY;
        this._useTestData = false;
        super.initInstanceFields();
    }
}
