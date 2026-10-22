import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { NavigatorData } from '@/com/sulake/habbo/navigator/domain/NavigatorData';
import type { Tabs } from '@/com/sulake/habbo/navigator/domain/Tabs';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { ITransitionalMainViewCtrl } from '@/com/sulake/habbo/navigator/mainview/ITransitionalMainViewCtrl';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import { GuestRoomDoorbell } from '@/com/sulake/habbo/navigator/GuestRoomDoorbell';
import { GuestRoomPasswordInput } from '@/com/sulake/habbo/navigator/GuestRoomPasswordInput';
import { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import { RoomEventInfoCtrl } from '@/com/sulake/habbo/navigator/inroom/RoomEventInfoCtrl';
import { RoomEventViewCtrl } from '@/com/sulake/habbo/navigator/inroom/RoomEventViewCtrl';
import { RoomInfoViewCtrl } from '@/com/sulake/habbo/navigator/inroom/RoomInfoViewCtrl';
import { OfficialRoomEntryManager } from '@/com/sulake/habbo/navigator/mainview/OfficialRoomEntryManager';
import { EnforceCategoryCtrl } from '@/com/sulake/habbo/navigator/roomsettings/EnforceCategoryCtrl';
import { RoomCreateViewCtrl } from '@/com/sulake/habbo/navigator/roomsettings/RoomCreateViewCtrl';
import { RoomFilterCtrl } from '@/com/sulake/habbo/navigator/roomsettings/RoomFilterCtrl';
import { RoomSettingsCtrl } from '@/com/sulake/habbo/navigator/roomsettings/RoomSettingsCtrl';
import { FakeMainViewCtrl } from '@/com/sulake/habbo/navigator/transitional/FakeMainViewCtrl';

export class LegacyNavigator implements IHabboTransitionalNavigator {
    static { registerClassName(this, 'com.sulake.habbo.navigator.transitional::LegacyNavigator'); }

    constructor(param1: HabboNewNavigator, param2: HabboNavigator) {
        this._newNavigator = param1;
        this._oldNavigator = param2;
        this._SafeStr_6174 = new FakeMainViewCtrl(this._newNavigator, this._oldNavigator);
        this._roomSettingsCtrl = new RoomSettingsCtrl(this);
        this._roomInfoViewCtrl = new RoomInfoViewCtrl(this);
        this._roomCreateViewCtrl = new RoomCreateViewCtrl(this);
        this._passwordInput = new GuestRoomPasswordInput(this);
        this._doorbell = new GuestRoomDoorbell(this);
        this._officialRoomEntryManager = new OfficialRoomEntryManager(this);
        this._roomEventViewCtrl = new RoomEventViewCtrl(this);
        this._roomEventInfoCtrl = new RoomEventInfoCtrl(this);
        this._roomFilterCtrl = new RoomFilterCtrl(this);
        this._enforceCategoryCtrl = new EnforceCategoryCtrl(this);
    }

    declare private _newNavigator: HabboNewNavigator;

    declare private _oldNavigator: HabboNavigator;

    declare private _SafeStr_6174: FakeMainViewCtrl;

    declare private _roomSettingsCtrl: RoomSettingsCtrl;

    declare private _roomInfoViewCtrl: RoomInfoViewCtrl;

    declare private _roomCreateViewCtrl: RoomCreateViewCtrl;

    declare private _doorbell: GuestRoomDoorbell;

    declare private _roomEventViewCtrl: RoomEventViewCtrl;

    declare private _roomEventInfoCtrl: RoomEventInfoCtrl;

    declare private _roomFilterCtrl: RoomFilterCtrl;

    declare private _enforceCategoryCtrl: EnforceCategoryCtrl;

    declare private _passwordInput: GuestRoomPasswordInput;

    public get passwordInput(): GuestRoomPasswordInput {
        return this._oldNavigator.passwordInput;
    }

    declare private _officialRoomEntryManager: OfficialRoomEntryManager;

    public get officialRoomEntryManager(): OfficialRoomEntryManager {
        return this._oldNavigator.officialRoomEntryManager;
    }

    public set oldNavigator(param1: HabboNavigator) {
        this._oldNavigator = param1;
    }

    public get assets(): IAssetLibrary {
        return this._oldNavigator.assets;
    }

    public get windowManager(): IHabboWindowManager {
        return this._newNavigator.windowManager;
    }

    public get data(): NavigatorData {
        return this._oldNavigator.data;
    }

    public get mainViewCtrl(): ITransitionalMainViewCtrl {
        return this._SafeStr_6174;
    }

    public get tabs(): Tabs {
        return this._oldNavigator.tabs;
    }

    public get roomInfoViewCtrl(): RoomInfoViewCtrl {
        return this._roomInfoViewCtrl;
    }

    public get roomCreateViewCtrl(): RoomCreateViewCtrl {
        return this._roomCreateViewCtrl;
    }

    public get communication(): IHabboCommunicationManager {
        return this._oldNavigator.communication;
    }

    public get roomSettingsCtrl(): RoomSettingsCtrl {
        return this._roomSettingsCtrl;
    }

    public get sessionData(): ISessionDataManager {
        return this._oldNavigator.sessionData;
    }

    public get doorbell(): GuestRoomDoorbell {
        return this._doorbell;
    }

    public get roomEventViewCtrl(): RoomEventViewCtrl {
        return this._roomEventViewCtrl;
    }

    public get localization(): IHabboLocalizationManager {
        return this._oldNavigator.localization;
    }

    public get toolbar(): IHabboToolbar {
        return this._oldNavigator.toolbar;
    }

    public get habboHelp(): IHabboHelp {
        return this._oldNavigator.habboHelp;
    }

    public get roomEventInfoCtrl(): RoomEventInfoCtrl {
        return this._roomEventInfoCtrl;
    }

    public get roomFilterCtrl(): RoomFilterCtrl {
        return this._roomFilterCtrl;
    }

    public get roomSessionManager(): IRoomSessionManager {
        return this._oldNavigator.roomSessionManager;
    }

    public get enforceCategoryCtrl(): EnforceCategoryCtrl {
        return this._enforceCategoryCtrl;
    }

    public get tracking(): IHabboTracking {
        return this._oldNavigator.tracking;
    }

    public get events(): IEventDispatcher {
        return this._newNavigator.events;
    }

    public get homeRoomId(): number {
        return this._oldNavigator.homeRoomId;
    }

    public get enteredGuestRoomData(): GuestRoomData {
        return this._oldNavigator.enteredGuestRoomData;
    }

    public get disposed(): boolean {
        return this._oldNavigator == null;
    }

    public get visibleEventCategories(): any[] {
        return this._oldNavigator.data.visibleEventCategories;
    }

    public get roomSettingsControl(): RoomSettingsCtrl {
        return this._oldNavigator.roomSettingsCtrl;
    }

    public send(param1: IMessageComposer, param2: boolean = false): void {
        return this._oldNavigator.send(param1, param2);
    }

    public getXmlWindow(param1: string, param2: number = 1): IWindow {
        return this._oldNavigator.getXmlWindow(param1, param2);
    }

    public getText(param1: string): string {
        return this._oldNavigator.getText(param1);
    }

    public registerParameter(param1: string, param2: string, param3: string): string {
        return this._oldNavigator.registerParameter(param1, param2, param3);
    }

    public getButton(param1: string, param2: string, param3: (...args: any[]) => any, param4: number = 0, param5: number = 0, param6: number = 0): IBitmapWrapperWindow {
        return this._oldNavigator.getButton(param1, param2, param3, param4, param5, param6);
    }

    public refreshButton(param1: IWindowContainer, param2: string, param3: boolean, param4: (...args: any[]) => any, param5: number, param6: string = null): void {
        return this._oldNavigator.refreshButton(param1, param2, param3, param4, param5, param6);
    }

    public getButtonImage(param1: string, param2: string = "_png"): BitmapData {
        return this._oldNavigator.getButtonImage(param1, param2);
    }

    public openCatalogClubPage(param1: string): void {
        return this._oldNavigator.openCatalogClubPage(param1);
    }

    public openCatalogRoomAdsPage(): void {
        return this._oldNavigator.openCatalogRoomAdsPage();
    }

    public showFavouriteRooms(): void {
        return this._newNavigator.performSearch("favorites");
    }

    public showHistoryRooms(): void {
        return this._newNavigator.performSearch("history");
    }

    public showFrequentRooms(): void {
        return this._newNavigator.performSearch("history_freq");
    }

    public goToMainView(): void {
        this._roomCreateViewCtrl.hide();
    }

    public reportRoomFromWeb(param1: string, param2: string = null): void {
        this._oldNavigator.enterRoomWebRequest(param1, true, param2);
    }

    public goToRoom(param1: number, param2: boolean, param3: string = "", param4: number = -1, param5: boolean = false): void {
        this._oldNavigator.goToRoom(param1, false, param3, param4, param5);
    }

    public isPerkAllowed(param1: string): boolean {
        return this._oldNavigator.isPerkAllowed(param1);
    }

    public trackGoogle(param1: string, param2: string, param3: number = -1): void {
        return this._oldNavigator.trackGoogle(param1, param2, param3);
    }

    public getBoolean(param1: string): boolean {
        return this._oldNavigator.getBoolean(param1);
    }

    public getInteger(param1: string, param2: number): number {
        return this._oldNavigator.getInteger(param1, param2);
    }

    public goToHomeRoom(): boolean {
        this._newNavigator.goToHomeRoom();
        return true;
    }

    public performTagSearch(param1: string): void {
        return this._newNavigator.performTagSearch(param1);
    }

    public performTextSearch(param1: string): void {
        return this._newNavigator.performTextSearch(param1);
    }

    public performGuildBaseSearch(): void {
        return this._newNavigator.performSearch("groups");
    }

    public performCompetitionRoomsSearch(param1: number, param2: number): void {
        return this._newNavigator.performSearch("competition");
    }

    public showOwnRooms(): void {
        return this._newNavigator.performSearch("myworld_view");
    }

    public goToPrivateRoom(param1: number): void {
        this._newNavigator.goToRoom(param1);
    }

    public hasRoomRightsButIsNotOwner(param1: number): boolean {
        return this._oldNavigator.hasRoomRightsButIsNotOwner(param1);
    }

    public removeRoomRights(param1: number): void {
        return this._oldNavigator.removeRoomRights(param1);
    }

    public goToRoomNetwork(param1: number, param2: boolean): void {
        return this.goToRoomNetwork(param1, param2);
    }

    public startRoomCreation(): void {
        return this._newNavigator.createRoom();
    }

    public openNavigator(param1: Point = null): void {
        return this._newNavigator.open();
    }

    public closeNavigator(): void {
        return this._newNavigator.close();
    }

    public showToolbarHover(param1: Point): void {
    }

    public hideToolbarHover(param1: boolean): void {
    }

    public toggleRoomInfoVisibility(): void {
        if (this._roomInfoViewCtrl) {
            this._roomInfoViewCtrl.toggle();
        }
    }

    public canRateRoom(): boolean {
        return this._oldNavigator.canRateRoom();
    }

    public queueInterface(param1: IID, param2: (...args: any[]) => any = null): IUnknown {
        return this._newNavigator.queueInterface(param1, param2);
    }

    public release(param1: IID): number {
        return this._newNavigator.release(param1);
    }

    public dispose(): void {
        this._roomSettingsCtrl.dispose();
        this._roomInfoViewCtrl.dispose();
        this._roomCreateViewCtrl.dispose();
        this._passwordInput.dispose();
        this._doorbell.dispose();
        this._officialRoomEntryManager.dispose();
        this._roomEventViewCtrl.dispose();
        this._roomEventInfoCtrl.dispose();
        this._roomFilterCtrl.dispose();
        this._enforceCategoryCtrl = null;
        this._oldNavigator = null;
        this._newNavigator = null;
    }

    public openCatalogRoomAdsExtendPage(param1: string, param2: string, param3: Date, param4: number): void {
        return this._oldNavigator.openCatalogRoomAdsExtendPage(param1, param2, param3, param4);
    }

    public getProperty(param1: string, param2: Map<any, any> = null): string {
        return this._oldNavigator.getProperty(param1, param2);
    }

    public trackNavigationDataPoint(param1: string, param2: string, param3: string = "", param4: number = 0): void {
        return this._oldNavigator.trackNavigationDataPoint(param1, param2, param3, param4);
    }

    public isRoomFavorite(param1: number): boolean {
        return this._oldNavigator.isRoomFavorite(param1);
    }

    public isRoomHome(param1: number): boolean {
        return this._oldNavigator.isRoomHome(param1);
    }

    get [IHabboNavigator](): true {
        return true;
    }

    get [IUnknown](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
