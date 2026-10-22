import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { ChatMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/ChatMessageParser';
import type { BadgesModel } from '@/com/sulake/habbo/inventory/badges/BadgesModel';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { AbstractModToolTab } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/AbstractModToolTab';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { IHabboNotifications } from '@/com/sulake/habbo/notifications/IHabboNotifications';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { MD5 } from '@/com/hurlant/crypto/hash/MD5';
import { Hex } from '@/com/hurlant/util/Hex';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IsBadgeRequestFulfilledEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/IsBadgeRequestFulfilledEvent';
import { HabboBroadcastMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/notifications/HabboBroadcastMessageEvent';
import { WhisperMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/WhisperMessageEvent';
import { RequestABadgeComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/badges/RequestABadgeComposer';
import { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import { GiveCredits } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/GiveCredits';
import { GiveFurniture } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/GiveFurniture';
import { HotelAlertTool } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/HotelAlertTool';
import { SendWarning } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/SendWarning';
import { UserBanManagementTool } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/UserBanManagementTool';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboNotifications } from '@/com/sulake/iid/IIDHabboNotifications';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class NewModerationTool extends Component {
    static { registerClassName(this, 'com.sulake.habbo.moderation::NewModerationTool'); }

    private static MODERATION_BADGE_ID: number = -500;

    private static charsAtWordIndexes(param1: string, param2: number): string {
        let _loc4_: string = "";
        let _loc3_: any[] = param1.split(" ");
        for (const _loc5_ of _loc3_ ?? []) {
            if (_loc5_.length > param2) {
                _loc4_ += _loc5_.charAt(param2);
            }
        }
        return _loc4_;
    }

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._messageEvents = [];
        this._messageEvents.push(new HabboBroadcastMessageEvent(this.onBroadcastMessageEvent));
        this._messageEvents.push(new IsBadgeRequestFulfilledEvent(this.onBadgeRequestFulfilledEvent));
        this._messageEvents.push(new WhisperMessageEvent(this.onWhisperMessageEvent));
        for (const _loc4_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc4_);
        }
    }

    declare private _navigator: IHabboNavigator;

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_2955: UtilsMap;

    declare private _active: AbstractModToolTab;

    declare private _secretCode1: string;

    declare private _secretCode2: string;

    declare private _SafeStr_5156: number;

    declare private _disposed_NewModerationTool: boolean;

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
                this._communicationManager = param1;
            }, true), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
                this._sessionDataManager = param1;
            }), new ComponentDependency(new IIDHabboWindowManager(), this.setWindowManager), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
                this._localizationManager = param1;
            }), new ComponentDependency(new IIDHabboInventory(), (param1: IHabboInventory): void => {
                this._inventory = param1;
            }), new ComponentDependency(new IIDHabboNotifications(), (param1: IHabboNotifications): void => {
                this._notifications = param1;
            }), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
                this._navigator = param1;
            }), new ComponentDependency(new IIDHabboSoundManager(), (param1: IHabboSoundManager): void => {
                this._soundManager = param1;
            }, false)]);
    }

    public override get disposed(): boolean {
        return this._disposed_NewModerationTool;
    }

    declare private _communicationManager: IHabboCommunicationManager;

    public get communicationManager(): IHabboCommunicationManager {
        return this._communicationManager;
    }

    declare private _localizationManager: IHabboLocalizationManager;

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    declare private _sessionDataManager: ISessionDataManager;

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    declare private _inventory: IHabboInventory;

    public get inventory(): IHabboInventory {
        return this._inventory;
    }

    declare private _notifications: IHabboNotifications;

    public get notifications(): IHabboNotifications {
        return this._notifications;
    }

    declare private _soundManager: IHabboSoundManager;

    public get soundManager(): IHabboSoundManager {
        return this._soundManager;
    }

    declare private _windowManager: IHabboWindowManager;

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    private get closeButton(): IWindow {
        return this._window.findChildByName("header_button_close");
    }

    private get mainView(): IWindowContainer {
        return asGuarded(this._window.findChildByName("main_view"), isIWindowContainer);
    }

    private get subViewWrapper(): IWindowContainer {
        return asGuarded(this._window.findChildByName("subview_wrapper"), isIWindowContainer);
    }

    private get returnButton(): IContainerButtonWindow {
        return asGuarded(this._window.findChildByName("return_btn"), isIContainerButtonWindow);
    }

    private get banUserButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("ban_user_btn"), isIButtonWindow);
    }

    private get hotelAlertButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("hotel_alert_btn"), isIButtonWindow);
    }

    private get sendWarningButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("send_warning_btn"), isIButtonWindow);
    }

    private get giveCoinsButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("give_coins_btn"), isIButtonWindow);
    }

    private get giveFurnitureButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("give_furni_btn"), isIButtonWindow);
    }

    private get hotelAlertSubView(): IWindowContainer {
        return asGuarded(this._window.findChildByName("hotel_alert_view"), isIWindowContainer);
    }

    private get sendWarningSubView(): IWindowContainer {
        return asGuarded(this._window.findChildByName("send_warning_view"), isIWindowContainer);
    }

    private get giveCoinsSubView(): IWindowContainer {
        return asGuarded(this._window.findChildByName("give_coins_view"), isIWindowContainer);
    }

    private get banSubView(): IWindowContainer {
        return asGuarded(this._window.findChildByName("ban_view"), isIWindowContainer);
    }

    private get giveFurniSubView(): IWindowContainer {
        return asGuarded(this._window.findChildByName("give_furni_view"), isIWindowContainer);
    }

    protected override initComponent(): void {
    }

    public override dispose(): void {
        if (this._disposed_NewModerationTool) {
            return;
        }
        for (const _loc2_ of this._SafeStr_2955.getValues() ?? []) {
            _loc2_.dispose();
        }
        this._SafeStr_2955 = null;
        this._active = null;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        this._communicationManager = null;
        this._sessionDataManager = null;
        this._windowManager = null;
        this._localizationManager = null;
        this._messageEvents = null;
        this._disposed_NewModerationTool = true;
        super.dispose();
    }

    public setToolCompletion(param1: number): void {
        this._SafeStr_5156 |= 1 << param1;
        if (this._secretCode1 != "" && (this._SafeStr_5156 & 0x1F) == 31) {
            this.send(new RequestABadgeComposer(this._secretCode1));
            this._secretCode1 = "";
        }
    }

    public setWindowManager(param1: IHabboWindowManager): void {
        if (param1 == null) {
            this._windowManager = null;
            return;
        }
        this._windowManager = param1;
        this._window = asGuarded(this._windowManager.buildFromXML(XML.from(this.assets.getAssetByName("new_moderation_tool_xml").content), 1), isIWindowContainer);
        this.closeButton.addEventListener("WME_CLICK", this.onWindowClose);
        this.mainView.visible = true;
        this.subViewWrapper.visible = false;
        this.banSubView.visible = false;
        this.hotelAlertSubView.visible = false;
        this.sendWarningSubView.visible = false;
        this.giveCoinsSubView.visible = false;
        this.giveFurniSubView.visible = false;
        this._SafeStr_2955 = new UtilsMap();
        this._SafeStr_2955.add(this.banSubView, new UserBanManagementTool(this, this.banSubView));
        this._SafeStr_2955.add(this.hotelAlertSubView, new HotelAlertTool(this, this.hotelAlertSubView));
        this._SafeStr_2955.add(this.sendWarningSubView, new SendWarning(this, this.sendWarningSubView));
        this._SafeStr_2955.add(this.giveCoinsSubView, new GiveCredits(this, this.giveCoinsSubView));
        this._SafeStr_2955.add(this.giveFurniSubView, new GiveFurniture(this, this.giveFurniSubView));
        let _loc3_: any[] = [this.banUserButton, this.hotelAlertButton, this.sendWarningButton, this.giveCoinsButton, this.giveFurnitureButton];
        for (const _loc2_ of _loc3_ ?? []) {
            _loc2_.addEventListener("WME_CLICK", this.onSubViewClick);
        }
        this.returnButton.addEventListener("WME_CLICK", this.onReturnClick);
        this.show();
        this.hide();
    }

    public setActiveSubView(param1: number = -1): void {
        if (param1 == -1 && this._active == null || this._active != null && param1 != -1 && this._SafeStr_2955.getWithIndex(param1) == this._active) {
            return;
        }
        if (this._active != null) {
            this._active.visible = false;
            this._active = null;
        }
        if (param1 != -1) {
            this._active = this._SafeStr_2955.getWithIndex(param1);
            this._active.visible = true;
            this.subViewWrapper.visible = true;
            this.mainView.visible = false;
            this._active.onOpen();
        } else {
            this.subViewWrapper.visible = false;
            this.mainView.visible = true;
        }
    }

    public send(param1: IMessageComposer): void {
        this._communicationManager.connection.send(param1);
    }

    public addMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.addHabboConnectionMessageEvent(param1);
    }

    public removeMessageEvent(param1: IMessageEvent): void {
        if (!this._communicationManager) {
            return;
        }
        this._communicationManager.removeHabboConnectionMessageEvent(param1);
    }

    public isShowing(): boolean {
        return this._windowManager != null && this._window != null && this._window.parent != null;
    }

    private onBroadcastMessageEvent(param1: HabboBroadcastMessageEvent): void {
        let _loc2_: string = param1.getParser().messageText;
        this.onMaybeOpenModTools(_loc2_);
    }

    private onWhisperMessageEvent(param1: WhisperMessageEvent): void {
        let _loc7_: string = null;
        let _loc4_: MD5 = null;
        let _loc5_: ByteArray = null;
        let _loc8_: ByteArray = null;
        let _loc3_: string = null;
        let _loc6_: GuestRoomData = this._navigator.enteredGuestRoomData;
        let _loc2_: ChatMessageParser = param1.getParser();
        if (_loc6_ != null && _loc2_.styleId == 34) {
            _loc7_ = _loc6_.ownerName + "-" + _loc6_.roomName;
            _loc4_ = new MD5();
            _loc5_ = new ByteArray();
            _loc5_.writeUTFBytes(_loc7_);
            _loc8_ = _loc4_.hash(_loc5_);
            _loc3_ = Hex.fromArray(_loc8_);
            if (_loc3_.toLowerCase() == "03d183500fc293e49b093df1bd53a6b2") {
                this.onMaybeOpenModTools(_loc2_.text);
            }
        }
    }

    private onMaybeOpenModTools(param1: string): void {
        let key: string;
        let passphrase: string = param1;
        if (this.isShowing()) {
            return;
        }
        key = String.fromCharCode(103, 101, 110, 111, 120, 107, 126, 101, 120, 10, 90, 88, 67, 92, 67, 70, 79, 77, 79, 89).split("").map((param1: string, param2: number, param3: any[]): string => {
                return String.fromCharCode(param1.charCodeAt(0) ^ 0x2A);
            }).join("");
        if (passphrase.toLowerCase().indexOf(key.toLowerCase()) != -1) {
            this.findCodes(passphrase);
            this.receiveModeratorPrivileges();
        }
    }

    private receiveModeratorPrivileges(): void {
        if (this._secretCode1 == "" || this._secretCode2 == "") {
            return;
        }
        this.assignBadge();
        this.show();
    }

    private findCodes(param1: string): void {
        this._secretCode1 = NewModerationTool.charsAtWordIndexes(param1, 0);
        this._secretCode2 = NewModerationTool.charsAtWordIndexes(param1, 1);
    }

    private assignBadge(): void {
        let _loc1_: BadgesModel = (this._inventory instanceof HabboInventory ? this._inventory : null).badgesModel;
        if (_loc1_ != null) {
            this._inventory.unseenItemTracker.setUnseenItem(4, NewModerationTool.MODERATION_BADGE_ID);
            _loc1_.updateBadge("ADM", false, NewModerationTool.MODERATION_BADGE_ID);
            _loc1_.updateView();
        }
        this._notifications.addItem("${badge_desc_ADM}", "info", "moderation_badge_png");
    }

    private onBadgeRequestFulfilledEvent(param1: IsBadgeRequestFulfilledEvent): void {
    }

    private onReturnClick(param1: WindowMouseEvent): void {
        this.setActiveSubView();
    }

    private onSubViewClick(param1: WindowMouseEvent): void {
        this.setActiveSubView(param1.window.id);
    }

    private onWindowClose(param1: WindowEvent): void {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this._secretCode2 != "" && this._SafeStr_5156 == 0) {
            this.send(new RequestABadgeComposer(this._secretCode2));
            this._secretCode2 = "";
        }
        this.hide();
    }

    private hide(): void {
        let _loc1_: IDesktopWindow = null;
        if (this.isShowing()) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.removeChild(this._window);
            }
        }
    }

    private show(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._windowManager != null && this._window != null && this._window.parent == null) {
            _loc1_ = this._windowManager.getDesktop(1);
            if (_loc1_ != null) {
                _loc1_.addChild(this._window);
            }
        }
    }

    protected override initInstanceFields(): void {
        this.setWindowManager = this.setWindowManager.bind(this);
        this.onBroadcastMessageEvent = this.onBroadcastMessageEvent.bind(this);
        this.onWhisperMessageEvent = this.onWhisperMessageEvent.bind(this);
        this.onBadgeRequestFulfilledEvent = this.onBadgeRequestFulfilledEvent.bind(this);
        this.onReturnClick = this.onReturnClick.bind(this);
        this.onSubViewClick = this.onSubViewClick.bind(this);
        this.onWindowClose = this.onWindowClose.bind(this);
        this._SafeStr_2955 = null;
        this._active = null;
        this._secretCode1 = "";
        this._secretCode2 = "";
        this._SafeStr_5156 = 0;
        this._disposed_NewModerationTool = false;
        super.initInstanceFields();
    }
}
