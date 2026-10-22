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

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _catalog: IHabboCatalog;

    declare private _roomEngine: IRoomEngine;

    declare private _calendarView: CalendarView;

    declare private _calendarData: CampaignCalendarData;

    declare private _pendingDay: number;

    declare private _useTestData: boolean;

    constructor(param1: IContext, param2: number, param3: IAssetLibrary) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }, true), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         })]);
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

    private onCampaignCalendarDataMessageEvent(param1: CampaignCalendarDataMessageEvent): void {
        if (false && this._useTestData) {
            return;
        }
        let _loc2_: CampaignCalendarDataMessageParser = param1.getParser();
        this._calendarData = _loc2_.cloneData();
    }

    private onCampaignCalendarDoorOpenedMessageEvent(param1: CampaignCalendarDoorOpenedMessageEvent): void {
        let _loc2_: CampaignCalendarDoorOpenedMessageParser = param1.getParser();
        if (_loc2_.doorOpened) {
            this.showProductNotification(_loc2_.productName, _loc2_.customImage, _loc2_.furnitureClassName);
        }
    }

    public openPackage(param1: number): void {
        this._pendingDay = param1;
        if (false && this._useTestData) {
            this.showProductNotification("A1 KUMIANKKA", "", "duck");
        } else {
            this._communicationManager.connection.send(new OpenCampaignCalendarDoorComposer(this._calendarData.campaignName, param1));
        }
    }

    public openPackageAsStaff(param1: number): void {
        this._pendingDay = param1;
        if (false && this._useTestData) {
            this.showProductNotification("hween_c15_evilcrystal2", "targetedoffers/web_offer_credits_small.png", "hween_c15_evilcrystal2");
        } else {
            this._communicationManager.connection.send(new OpenCampaignCalendarDoorAsStaffComposer(this._calendarData.campaignName, param1));
        }
    }

    private showProductNotification(param1: string, param2: string, param3: string): void {
        let _loc4_: IProductData = this._sessionDataManager.getProductData(param1);
        if (_loc4_ != null) {
            this._calendarData.openedDays.push(this._pendingDay);
            this._pendingDay = -1;
            if (param2 && param2 != "") {
                this._calendarView.setReceivedProduct(_loc4_, this.getImageGalleryUrl() + param2);
            } else if (param3 && param3 != "") {
                this._calendarView.setReceivedProduct(_loc4_);
                this.requestIconFromRoomEngine(this._calendarView, param3);
            }
        }
    }

    private requestIconFromRoomEngine(param1: IGetImageListener, param2: string): ImageResult {
        let _loc3_: ImageResult = null;
        let _loc4_: IFurnitureData = null;
        _loc4_ = this._sessionDataManager.getFloorItemDataByName(param2);
        if (_loc4_) {
            _loc3_ = this._roomEngine.getFurnitureIcon(_loc4_.id, param1);
        } else {
            _loc4_ = this._sessionDataManager.getWallItemDataByName(param2);
            if (_loc4_) {
                _loc3_ = this._roomEngine.getWallItemIcon(_loc4_.id, param1);
            }
        }
        if (_loc3_ && _loc3_.data) {
            param1.imageReady(_loc3_.id, _loc3_.data);
        }
        return _loc3_;
    }

    public get linkPattern(): string {
        return "openView/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        if (_loc2_[1] == "calendar") {
            this.showCalendar();
        }
    }

    private showCalendar(): void {
        if (!this._calendarView && this._calendarData) {
            this._calendarView = new CalendarView(this, this._windowManager);
        }
    }

    public hideCalendar(): void {
        if (this._calendarView) {
            this._calendarView.dispose();
            this._calendarView = null;
        }
    }

    private getImageGalleryUrl(): string {
        return this.getProperty("image.library.url");
    }

    public get calendarData(): CampaignCalendarData {
        return this._calendarData;
    }

    public get isAnyRoomController(): boolean {
        return this._sessionDataManager.isAnyRoomController;
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    protected override initInstanceFields(): void {
        this.onCampaignCalendarDataMessageEvent = this.onCampaignCalendarDataMessageEvent.bind(this);
        this.onCampaignCalendarDoorOpenedMessageEvent = this.onCampaignCalendarDoorOpenedMessageEvent.bind(this);
        this._pendingDay = -1;
        this._useTestData = false;
        super.initInstanceFields();
    }
}
