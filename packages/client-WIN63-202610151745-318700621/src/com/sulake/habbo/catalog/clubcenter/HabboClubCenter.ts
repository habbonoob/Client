import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IOfferCenter } from '@/com/sulake/habbo/catalog/offers/IOfferCenter';
import type { IOfferExtension } from '@/com/sulake/habbo/catalog/offers/IOfferExtension';
import type { IPurse } from '@/com/sulake/habbo/catalog/purse/IPurse';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { ScrKickbackData } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrKickbackData';
import type { BadgesParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/BadgesParser';
import type { ScrSendKickbackInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ScrSendKickbackInfoMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { BadgeImageReadyEvent } from '@/com/sulake/habbo/session/events/BadgeImageReadyEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ClubCenterView } from '@/com/sulake/habbo/catalog/clubcenter/ClubCenterView';
import { ClubSpecialInfoBubbleView } from '@/com/sulake/habbo/catalog/clubcenter/ClubSpecialInfoBubbleView';
import { BadgeResolver } from '@/com/sulake/habbo/catalog/clubcenter/util/BadgeResolver';
import { ClubGiftInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ClubGiftInfoEvent';
import { BadgesEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/BadgesEvent';
import { ScrSendKickbackInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrSendKickbackInfoMessageEvent';
import { GetClubGiftInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetClubGiftInfoMessageComposer';
import { GetBadgesComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/badges/GetBadgesComposer';
import { ScrGetKickbackInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/ScrGetKickbackInfoMessageComposer';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboClubCenter extends Component implements ILinkEventTracker, IOfferExtension {
    static { registerClassName(this, 'com.sulake.habbo.catalog.clubcenter::HabboClubCenter'); }

    private static readonly USE_FAKE_DATA: boolean = false;
    private static readonly DATA_UPDATE_INTERVAL_MSEC: number = 10000;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _catalog: IHabboCatalog;

    declare private _toolbar: IHabboToolbar;

    declare private _offerCenter: IOfferCenter;

    declare private _SafeStr_4850: boolean;

    declare private _messageEvents: IMessageEvent[];

    declare private _view: ClubCenterView;

    declare private _SafeStr_4119: ClubSpecialInfoBubbleView;

    declare private _data: ScrKickbackData;

    declare private _SafeStr_6294: number;

    declare private _SafeStr_4044: boolean;

    declare private _badgeId: string;

    declare private _giftsAvailable: number;

    declare private _SafeStr_4273: UtilsMap[];

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }, true), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderManager = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         })]);
    }

    protected override initComponent(): void {
        this._messageEvents = new Array<IMessageEvent>(0).fill(null);
        this.addMessageEvent(new ClubGiftInfoEvent(this.onClubGiftInfo));
        this.addMessageEvent(new ScrSendKickbackInfoMessageEvent(this.onKickbackInfoMessageEvent));
        this.addMessageEvent(new BadgesEvent(this.onBadges));
        this.context.addLinkEventTracker(this);
        if (this.getBoolean("offers.enabled") && this.getBoolean("offers.habboclub.enabled")) {
            this._offerCenter = this.catalog.getOfferCenter(this);
        }
    }

    public override dispose(): void {
        if (this._messageEvents != null && this._communicationManager != null) {
            for (const _loc1_ of this._messageEvents ?? []) {
                this._communicationManager.removeHabboConnectionMessageEvent(_loc1_);
            }
        }
        if (this._sessionDataManager != null && this._sessionDataManager.events) {
            this._sessionDataManager.events.removeEventListener("BIRE_BADGE_IMAGE_READY", this.onBadgeReady);
        }
        if (this._offerCenter != null) {
            this._offerCenter = null;
        }
        this.removeView();
        this._data = null;
        this._messageEvents = null;
        super.dispose();
    }

    public get linkPattern(): string {
        return "habboUI/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 3) {
            return;
        }
        if (_loc2_[1] == "open") {
            let _loc3_: any = _loc2_[2];
            if ("hccenter" === _loc3_) {
                this.showClubCenter();
            }
        }
    }

    private showClubCenter(): void {
        if (!this._view) {
            this._view = new ClubCenterView(this, this._windowManager, this._sessionDataManager.figure);
        }
        if (this.updateNeeded()) {
            this.updateData();
        } else {
            this.populate();
        }
        if (this._offerCenter && this._view && this._SafeStr_4850) {
            this._SafeStr_4850 = false;
            this.indicateVideoAvailable(true);
        }
    }

    public removeView(): void {
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this.removeBreakdown();
        this._SafeStr_4044 = false;
    }

    public removeBreakdown(): void {
        if (this._SafeStr_4119) {
            this._SafeStr_4119.dispose();
            this._SafeStr_4119 = null;
        }
    }

    private addMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._messageEvents.push(this._communicationManager.addHabboConnectionMessageEvent(param1));
    }

    private onKickbackInfoMessageEvent(param1: ScrSendKickbackInfoMessageEvent): void {
        let _loc2_: ScrSendKickbackInfoMessageParser = param1.getParser();
        this._data = _loc2_.data;
        this._SafeStr_4044 = false;
        this._SafeStr_6294 = getTimer();
        this.populate();
    }

    private onClubGiftInfo(param1: ClubGiftInfoEvent): void {
        this._giftsAvailable = param1.getParser().giftsAvailable;
        this.populate();
    }

    private onBadgeReady(param1: BadgeImageReadyEvent): void {
        if (param1.badgeId != this._badgeId || !this._sessionDataManager) {
            return;
        }
        this._sessionDataManager.events.removeEventListener("BIRE_BADGE_IMAGE_READY", this.onBadgeReady);
        this.populate();
    }

    public onBadges(param1: IMessageEvent): void {
        let _loc3_: BadgesParser = (param1 instanceof BadgesEvent ? param1 : null).getParser();
        if (this._SafeStr_4273 == null) {
            this._SafeStr_4273 = new Array<UtilsMap>(_loc3_.totalFragments >>> 0).fill(null);
        }
        let _loc4_: UtilsMap = new UtilsMap();
        _loc4_.concatenate(_loc3_.currentFragment);
        let _loc2_: UtilsMap = this.addMessageFragment(_loc4_, _loc3_.totalFragments, _loc3_.fragmentNo, this._SafeStr_4273);
        if (!_loc2_) {
            return;
        }
        this._SafeStr_4273 = null;
        this._badgeId = BadgeResolver.resolveClubBadgeId(_loc2_.getKeys());
    }

    private updateNeeded(): boolean {
        return !this._SafeStr_4044 && getTimer() - this._SafeStr_6294 > 10000;
    }

    private updateData(): void {
        this._SafeStr_4044 = true;
        this._communicationManager.connection.send(new GetBadgesComposer());
        this._communicationManager.connection.send(new GetClubGiftInfoMessageComposer());
        this._communicationManager.connection.send(new ScrGetKickbackInfoMessageComposer());
    }

    private populate(): void {
        if (this._view) {
            this._view.dataReceived(this._data, this.getPurse(), this.getGiftsAvailable(), BadgeResolver.resolveBadgeBitmap(this._badgeId, this.onBadgeReady, this._sessionDataManager));
        }
    }

    private get catalog(): IHabboCatalog {
        return this._catalog;
    }

    private getPurse(): IPurse {
        return this.catalog != null ? this.catalog.getPurse() : null;
    }

    private getGiftsAvailable(): number {
        return this._giftsAvailable;
    }

    public get localization(): IHabboLocalizationManager {
        return this.catalog != null ? this.catalog.localization : null;
    }

    public get avatarRenderManager(): IAvatarRenderManager {
        return this._avatarRenderManager;
    }

    public resolveClubStatus(): string {
        if (!this.catalog) {
            return "none";
        }
        let _loc1_: IPurse = this.getPurse();
        if (_loc1_.clubDays > 0) {
            return "active";
        }
        if (_loc1_.pastClubDays > 0 || _loc1_.pastVipDays > 0) {
            return "expired";
        }
        return "none";
    }

    public openPurchasePage(): void {
        if (this.catalog) {
            this.catalog.openCatalogPage("hc_membership", "NORMAL");
        }
    }

    public openClubGiftPage(): void {
        if (this.catalog) {
            this.catalog.openCatalogPage("club_gifts", "NORMAL");
        }
    }

    public showPaydayBreakdownView(): void {
        if (this._SafeStr_4119) {
            this.removeBreakdown();
            return;
        }
        this._SafeStr_4119 = new ClubSpecialInfoBubbleView(this, this._windowManager, this._data, this._view.getSpecialCalloutAnchor());
    }

    public openPaydayHelpPage(): void {
        this.context.createLinkEvent("habbopages/hcpayday");
    }

    public openHelpPage(): void {
        this.context.createLinkEvent("habbopages/habboclub");
    }

    public processHotelLink(param1: string): void {
        this.context.createLinkEvent(param1);
    }

    public isKickbackEnabled(): boolean {
        let _loc1_: string = this.getProperty("hccenter.activity.enabled");
        if (_loc1_ == null || _loc1_ == "") {
            return true;
        }
        return _loc1_ == "1" || _loc1_ == "true";
    }

    public get stage(): Stage {
        return this.context && this.context.displayObjectContainer ? this.context.displayObjectContainer.stage : null;
    }

    public getOffers(): void {
        this._catalog.getHabboClubOffers(3);
    }

    public get offerCenter(): IOfferCenter {
        return this._offerCenter;
    }

    public indicateRewards(): void {
    }

    public indicateVideoAvailable(param1: boolean): void {
        if (this._view) {
            this._view.setVideoOfferButtonVisibility(param1, this._offerCenter != null && !this._offerCenter.showingVideo);
        } else {
            this._SafeStr_4850 = param1;
        }
    }

    private addMessageFragment(param1: UtilsMap, param2: number, param3: number, param4: UtilsMap[]): UtilsMap {
        if (param2 == 1) {
            return param1;
        }
        param4[param3] = param1;
        for (const _loc5_ of param4 ?? []) {
            if (_loc5_ == null) {
                return null;
            }
        }
        let _loc6_: UtilsMap = new UtilsMap();
        for (const _loc7_ of param4 ?? []) {
            _loc6_.concatenate(_loc7_);
            _loc7_.dispose();
        }
        param4 = null;
        return _loc6_;
    }

    protected override initInstanceFields(): void {
        this.onKickbackInfoMessageEvent = this.onKickbackInfoMessageEvent.bind(this);
        this.onClubGiftInfo = this.onClubGiftInfo.bind(this);
        this.onBadgeReady = this.onBadgeReady.bind(this);
        this.onBadges = this.onBadges.bind(this);
        this._SafeStr_4850 = false;
        this._SafeStr_6294 = -10000;
        this._SafeStr_4044 = false;
        this._giftsAvailable = 0;
        super.initInstanceFields();
    }
}
