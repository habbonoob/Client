import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { NewUserExperienceGiftOptions } from '@/com/sulake/habbo/communication/messages/incoming/nux/NewUserExperienceGiftOptions';
import type { NewUserExperienceGetGiftsSelection } from '@/com/sulake/habbo/communication/messages/outgoing/nux/NewUserExperienceGetGiftsSelection';
import type { NewUserExperienceGiftOfferParser } from '@/com/sulake/habbo/communication/messages/parser/nux/NewUserExperienceGiftOfferParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { NewUserExperienceGiftOfferEvent } from '@/com/sulake/habbo/communication/messages/incoming/nux/NewUserExperienceGiftOfferEvent';
import { NewUserExperienceNotCompleteEvent } from '@/com/sulake/habbo/communication/messages/incoming/nux/NewUserExperienceNotCompleteEvent';
import { SetPhoneNumberVerificationStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/gifts/SetPhoneNumberVerificationStatusMessageComposer';
import { NewUserExperienceGetGiftsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/nux/NewUserExperienceGetGiftsMessageComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { NuxGiftSelectionView } from '@/com/sulake/habbo/nux/NuxGiftSelectionView';
import { NuxNoobRoomOfferView } from '@/com/sulake/habbo/nux/NuxNoobRoomOfferView';
import { NuxOfferOldUserView } from '@/com/sulake/habbo/nux/NuxOfferOldUserView';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HabboNuxDialogs extends Component implements ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.nux::HabboNuxDialogs'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboNuxDialogs.#initStatics();
        return HabboNuxDialogs._log;
    }

    constructor(param1: IContext, param2: number, param3: IAssetLibrary) {
        super(param1, param2, param3);
    }

    declare protected _communicationManager: IHabboCommunicationManager;

    declare protected _navigator: IHabboNavigator;

    declare protected _roomSessionManager: IRoomSessionManager;

    declare private _connection: IConnection;

    declare private _SafeStr_4657: NuxOfferOldUserView;

    declare private _SafeStr_4483: NuxGiftSelectionView;

    declare private _SafeStr_4714: NuxNoobRoomOfferView;

    declare private _SafeStr_3636: Timer;

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
                this._communicationManager = param1;
            }, true), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
                this._windowManager = param1;
            }), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
                this._navigator = param1;
            }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
                this._localizationManager = param1;
            }), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
                this._catalog = param1;
            }), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
                this._sessionDataManager = param1;
            }), new ComponentDependency(new IIDHabboRoomSessionManager(), (param1: IRoomSessionManager): void => {
                this._roomSessionManager = param1;
            }, false, [{ "type": "RSE_STARTED", "callback": this.onRoomSessionEvent }, { "type": "RSE_ENDED", "callback": this.onRoomSessionEvent }])]);
    }

    declare protected _windowManager: IHabboWindowManager;

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    declare protected _localizationManager: IHabboLocalizationManager;

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    declare protected _catalog: IHabboCatalog;

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    declare protected _sessionDataManager: ISessionDataManager;

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get linkPattern(): string {
        return "nux/";
    }

    public get configuration(): ICoreConfiguration {
        return this;
    }

    public override dispose(): void {
        this.context.removeLinkEventTracker(this);
        if (this._windowManager) {
            this._windowManager = null;
        }
        this.destroyGiftSelectionView();
        this.destroyNoobRoomOfferView();
        this.destroyNuxOfferView();
        super.dispose();
    }

    protected override initComponent(): void {
        this._connection = this._communicationManager.connection;
        if (this._connection) {
            this._connection.addMessageEvent(new NewUserExperienceNotCompleteEvent(this.onNewUserExperienceNotCompleteMessage));
            this._connection.addMessageEvent(new NewUserExperienceGiftOfferEvent(this.onNewUserExperienceGiftOfferMessage));
        }
        this.context.addLinkEventTracker(this);
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        let _loc3_: any = _loc2_[1];
        if ("lobbyoffer" !== _loc3_) {
            HabboNuxDialogs._log.warn("HabboNuxDialogs unknown link-type received: " + _loc2_[1]);
        } else if (_loc2_.length > 2 && _loc2_[2] == "show") {
            this.createNoobRoomOfferView();
        } else {
            this.destroyNoobRoomOfferView();
        }
    }

    public onVerify(): void {
        this._connection.send(new SetPhoneNumberVerificationStatusMessageComposer(0));
    }

    public onReject(): void {
        this._windowManager.confirm("${phone.number.never.again.confirm.title}", "${phone.number.never.again.confirm.text}", 0, this.onNeverAgainConfirmClose);
    }

    public onSendGetGifts(param1: NewUserExperienceGetGiftsSelection[]): void {
        this.destroyGiftSelectionView();
        this._connection.send(new NewUserExperienceGetGiftsMessageComposer(param1));
    }

    public destroyNuxOfferView(): void {
        if (this._SafeStr_4657) {
            this._SafeStr_4657.dispose();
            this._SafeStr_4657 = null;
        }
    }

    public destroyNoobRoomOfferView(): void {
        if (this._SafeStr_3636) {
            this._SafeStr_3636.reset();
            this._SafeStr_3636 = null;
        }
        if (this._SafeStr_4714) {
            this._SafeStr_4714.dispose();
            this._SafeStr_4714 = null;
        }
    }

    private onNeverAgainConfirmClose(param1: IConfirmDialog, param2: WindowEvent): void {
        param1.dispose();
        if (param2.type == "WE_OK" && this._connection) {
            this.destroyNuxOfferView();
            this._connection.send(new SetPhoneNumberVerificationStatusMessageComposer(2));
        }
    }

    private onNewUserExperienceNotCompleteMessage(param1: NewUserExperienceNotCompleteEvent): void {
        this.createNuxOfferView();
    }

    private onNewUserExperienceGiftOfferMessage(param1: NewUserExperienceGiftOfferEvent): void {
        let _loc2_: NewUserExperienceGiftOfferParser = param1.getParser();
        this.createGiftSelectionView(_loc2_.giftOptions);
    }

    private createNuxOfferView(): void {
        this.destroyNuxOfferView();
        this._SafeStr_4657 = new NuxOfferOldUserView(this);
    }

    private createGiftSelectionView(param1: NewUserExperienceGiftOptions[]): void {
        this.destroyGiftSelectionView();
        this._SafeStr_4483 = new NuxGiftSelectionView(this, param1);
    }

    private destroyGiftSelectionView(): void {
        if (this._SafeStr_4483) {
            this._SafeStr_4483.dispose();
            this._SafeStr_4483 = null;
        }
    }

    private startNoobRoomOfferTimer(): void {
    }

    private onRoomSessionEvent(param1: RoomSessionEvent): void {
        let _loc2_: any = 0;
        if (!this.getBoolean("nux.lobbies.enabled") || !this._sessionDataManager.isRealNoob) {
            return;
        }
        if (param1.type == "RSE_STARTED" && param1.session && param1.session.roomId == this._navigator.homeRoomId) {
            _loc2_ = this.getInteger("nux.noob.lobby.popup.delay", 70) * 1000 >>> 0;
            this._SafeStr_3636 = new Timer(Number(_loc2_), 1);
            this._SafeStr_3636.addEventListener("timer", this.createNoobRoomOfferView);
            this._SafeStr_3636.start();
        } else {
            this.destroyNoobRoomOfferView();
        }
    }

    private createNoobRoomOfferView(param1: TimerEvent = null): void {
        if (!this.getBoolean("nux.lobbies.enabled") || !this._sessionDataManager.isRealNoob) {
            return;
        }
        this.destroyNoobRoomOfferView();
        this._SafeStr_4714 = new NuxNoobRoomOfferView(this);
        this._connection.send(new EventLogMessageComposer("NewNavigator", "nux.offer.lobby", "nux.offer.lobby"));
    }

    protected override initInstanceFields(): void {
        this.onNeverAgainConfirmClose = this.onNeverAgainConfirmClose.bind(this);
        this.onNewUserExperienceNotCompleteMessage = this.onNewUserExperienceNotCompleteMessage.bind(this);
        this.onNewUserExperienceGiftOfferMessage = this.onNewUserExperienceGiftOfferMessage.bind(this);
        this.onRoomSessionEvent = this.onRoomSessionEvent.bind(this);
        this.createNoobRoomOfferView = this.createNoobRoomOfferView.bind(this);
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboNuxDialogs.#staticsReady) return;
        HabboNuxDialogs.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboNuxDialogs, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.nux.HabboNuxDialogs"));
    }
}
