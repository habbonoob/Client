import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { ErrorEvent } from '@/com/sulake/core/runtime/events/ErrorEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { HabboLoginDemoScreen } from '@/com/sulake/habbo/communication/demo/HabboLoginDemoScreen';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboWebApiSession } from '@/com/sulake/habbo/communication/IHabboWebApiSession';
import type { AvatarData } from '@/com/sulake/habbo/communication/login/AvatarData';
import type { ILoginProvider } from '@/com/sulake/habbo/communication/login/ILoginProvider';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import { DataEvent } from '@habbo-pixi/runtime/events/DataEvent';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { LocalizationEvent } from '@/com/sulake/core/localization/enum/LocalizationEvent';
import { Component, Core } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { HotelViewEvent } from '@/com/sulake/core/runtime/events/HotelViewEvent';
import { ErrorPopupCtrl } from '@/com/sulake/habbo/communication/demo/ErrorPopupCtrl';
import { IncomingMessages } from '@/com/sulake/habbo/communication/demo/IncomingMessages';
import { DisconnectReasonEvent } from '@/com/sulake/habbo/communication/messages/incoming/handshake/DisconnectReasonEvent';
import { SSOTicketMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/handshake/SSOTicketMessageComposer';
import { TryLoginMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/handshake/TryLoginMessageComposer';
import { UniqueIDMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/handshake/UniqueIDMessageComposer';
import { VersionCheckMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/handshake/VersionCheckMessageComposer';
import { HabboComponentFlags } from '@/com/sulake/habbo/configuration/enum/HabboComponentFlags';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HabboCommunicationDemo extends Component {
    static { registerClassName(this, 'com.sulake.habbo.communication.demo::HabboCommunicationDemo'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboCommunicationDemo.#initStatics();
        return HabboCommunicationDemo._log;
    }

    public static readonly ERROR_TYPE_IO_ERROR: string = "ioError";
    public static readonly ERROR_CODE_MAINTENANCE: string = "maintenance";
    private static readonly AUTO_RECONNECT: boolean = false;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        param1.events.addEventListener("unload", this.unloading);
        this._SafeStr_3990 = new ErrorPopupCtrl(param1, 0, param3);
    }

    declare private _loginView: HabboLoginDemoScreen;

    declare private _logoutInProgress: boolean;

    declare private _externalVariablesUrl: string;

    declare private _incomingMessages: IncomingMessages;

    declare private _ssoTicket: string;

    declare private _flashClientUrl: string;

    declare private _loginName: string;

    declare private _password: string;

    declare private _SafeStr_3245: ILoginProvider;

    declare private _SafeStr_4356: boolean;

    declare private _autoLogin: boolean;

    declare private _SafeStr_5729: boolean;

    declare private _SafeStr_3990: ErrorPopupCtrl;

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
                this._windowManager = param1;
            }, !this.isRoomViewerMode), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
                this._communication = param1;
            }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
                this._localization = param1;
            }, true, [{ "type": "complete", "callback": this.onLocalizationsComplete }, { "type": LocalizationEvent.LOCALIZATION_FAILED, "callback": this.onLocalizationFailed }])]);
    }

    declare private _communication: IHabboCommunicationManager;

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    declare private _localization: IHabboLocalizationManager;

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    declare private _windowManager: IHabboWindowManager;

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public set ssoTicket(param1: string) {
        this._ssoTicket = param1;
    }

    public set flashClientUrl(param1: string) {
        this._flashClientUrl = param1;
    }

    public get isRoomViewerMode(): boolean {
        return HabboComponentFlags.isRoomViewerMode(this.flags | 0);
    }

    protected override initComponent(): void {
        Core.instance.events.addEventListener("COMPONENT_EVENT_ERROR", this.onCoreError);
        let _loc1_: Stage = this.context.displayObjectContainer.stage;
        if (_loc1_ != null) {
            _loc1_.dispatchEvent(new HotelViewEvent("HOTEL_VIEW_READY"));
        }
        this._SafeStr_4356 = false;
        if (this._incomingMessages) {
            this._incomingMessages.dispose();
            if (this._communication) {
                this._communication.renewSocket();
            }
        }
        this._incomingMessages = new IncomingMessages(this, this._communication);
        this.context.events.addEventListener("HHVE_ERROR", this.onHotelViewError);
        this.prepareProperties();
        HabboWebTools.baseUrl = this.getProperty(HabboProperty.URL_PREFIX);
        if (this._autoLogin) {
            this.initWithStoredCredentials();
        } else if (this._ssoTicket) {
            this.initWithSSO(this._ssoTicket);
        } else {
            this.initWithLoginView();
        }
    }

    public override dispose(): void {
        if (Core.instance.events) {
            Core.instance.events.removeEventListener("COMPONENT_EVENT_ERROR", this.onCoreError);
        }
        if (this._loginView) {
            this._loginView.dispose();
            this._loginView = null;
        }
        if (this._incomingMessages) {
            this._incomingMessages.dispose();
            this._incomingMessages = null;
        }
        this._localization = null;
        this._communication = null;
        if (this._SafeStr_3990) {
            this._SafeStr_3990.dispose();
            this._SafeStr_3990 = null;
        }
    }

    public initGameSocket(): void {
        this.dispatchLoginStepEvent("HABBO_CONNECTION_EVENT_INIT");
        if (this._ssoTicket != null) {
            this._communication.mode = 0;
        } else {
            this._communication.mode = 0;
        }
        this._communication.initConnection("habbo");
    }

    public setSSOTicket(param1: string): void {
        if (param1 && !this._ssoTicket) {
            this._ssoTicket = param1;
            this.initGameSocket();
        }
    }

    public sendTryLoginDevelopmentOnly(param1: string, param2: string, param3: number = 0): void {
        let _loc5_: IConnection = this._communication.connection;
        if (!_loc5_) {
            this._communication.initConnection("habbo");
            _loc5_ = this._communication.connection;
        }
        let _loc4_: TryLoginMessageComposer = new TryLoginMessageComposer(param1, param2, param3);
        _loc5_.send(_loc4_);
    }

    public sendConnectionParameters(param1: IConnection): void {
        let _loc2_: SSOTicketMessageComposer = null;
        param1.send(new VersionCheckMessageComposer(401, this._flashClientUrl, this._externalVariablesUrl));
        let _loc3_: string = CommunicationUtils.readSOLString("machineid");
        let _loc4_: string = CommunicationUtils.generateFingerprint();
        let _loc5_: any[] = Capabilities.version.split(" ");
        param1.send(new UniqueIDMessageComposer(_loc3_, _loc4_, _loc5_.join("/")));
        if (this._ssoTicket && this._ssoTicket.length > 0) {
            _loc2_ = new SSOTicketMessageComposer(this._ssoTicket);
            param1.send(_loc2_);
        }
    }

    public loginOk(): void {
        this._SafeStr_4356 = false;
        if (this._loginView != null) {
            this._loginView.closeLoginWindow();
            this._loginView.dispose();
            this._loginView = null;
        }
        this._SafeStr_5729 = false;
    }

    public alert(param1: string, param2: string): void {
        let titleKey: string = param1;
        let messageKey: string = param2;
        this._windowManager.alert(titleKey, messageKey, 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                param1.dispose();
            });
    }

    public dispatchLoginStepEvent(param1: string): void {
        if (castTo(this.context, Component) == null || castTo(this.context, Component).events == null) {
            return;
        }
        castTo(this.context, Component).events.dispatchEvent(new Event(param1));
    }

    public onUserList(param1: AvatarData[]): void {
        let _loc3_: string = null;
        let _loc2_: Timer = null;
        if (this._autoLogin) {
            _loc3_ = CommunicationUtils.readSOLString("useruniqueid");
            if (this.userExists(param1, _loc3_)) {
                _loc2_ = new Timer(500, 1);
                _loc2_.addEventListener("timerComplete", this.onAutoSendLogin);
                _loc2_.start();
            } else {
                this._loginView.populateCharacterList(param1);
            }
        } else {
            this._loginView.populateCharacterList(param1);
        }
    }

    public disconnected(param1: number, param2: string): void {
        let _loc3_: string = null;
        this._SafeStr_4356 = true;
        if (!this._loginView) {
            if (param2 == null || param2.length < 6) {
                param2 = this._localization.getLocalization(DisconnectReasonEvent.resolveDisconnectedReasonLocalizationKey(param1));
            }
            _loc3_ = "connection.login.logged_out";
            this._localization.registerParameter(_loc3_, "reason", param1.toString());
            this._localization.registerParameter(_loc3_, "reasonName", param2);
            this.alert(DisconnectReasonEvent.resolveDisconnectedReasonLocalizationKey(param1), "${connection.login.logged_out}");
            return;
        }
        this.onBufferedDisconnected(param1, param2);
    }

    public handleErrorMessage(param1: number, param2: number): void {
        switch (param1) {
            case 0:
                this.localization.registerParameter("connection.server.error.desc", "errorCode", String(param1));
                this.alert("${connection.server.error.title}", "${connection.server.error.desc}");
                break;
            case 1001:
            case 1002:
            case 1003:
            case 1004:
            case 1005:
            case 1006:
            case 1007:
            case 1008:
            case 1009:
            case 1010:
            case 1011:
            case 1012:
            case 1013:
            case 1014:
            case 1015:
            case 1016:
            case 1017:
            case 1018:
            case 1019:
                this._communication.connection.close();
                break;
            case 4013:
                this.alert("${connection.room.maintenance.title}", "${connection.room.maintenance.desc}");
                break;
            default:
                this.localization.registerParameter("connection.server.error.desc", "errorCode", String(param1));
                this.alert("${connection.server.error.title}", "${connection.server.error.desc}");
        }
    }

    public handleLoginFailedHotelClosedMessage(param1: number, param2: number): void {
        if (this._loginView) {
            this._loginView.showDisconnectedWithText(12);
        }
    }

    private prepareProperties(): void {
        this._localization.loadDefaultEmbedLocalizations("en");
        this._loginName = CommunicationUtils.readSOLString("login");
        this._password = CommunicationUtils.restorePassword();
        let _loc2_: string = CommunicationUtils.readSOLString("environment");
        let _loc3_: string = CommunicationUtils.readSOLString("loginmethod", "habbo");
        let _loc6_: boolean = CommunicationUtils.readSOLBoolean("autologin");
        let _loc5_: boolean = CommunicationUtils.forcedAutoLoginEnabled;
        CommunicationUtils.forcedAutoLoginEnabled = false;
        let _loc4_: any[] = this.getProperty(HabboProperty.LIVE_ENVIRONMENTS).split("/");
        if (_loc4_.indexOf(_loc2_) == -1) {
            HabboCommunicationDemo._log.warn("Missing environment, require hotel selection! " + _loc2_);
            _loc2_ = null;
            CommunicationUtils.writeSOLProperty("environment", null);
        }
        if (_loc2_ != null) {
            this.initEnvironment(_loc2_);
        }
        this._ssoTicket = this.getProperty(HabboProperty.SSO_TOKEN);
        this._flashClientUrl = this.getProperty(HabboProperty.CLIENT_URL);
        this._externalVariablesUrl = this.getProperty(HabboProperty.EXTERNAL_VARIABLES);
        let _loc1_: boolean = this.getBoolean(HabboProperty.USE_SSO);
    }

    private initWithStoredCredentials(): void {
        this._communication.mode = 0;
        this._loginView.showLoadingScreen();
        let _loc1_: string = CommunicationUtils.readSOLString("environment");
        this.initEnvironment(_loc1_);
    }

    private initWithSSO(param1: string): void {
        this._ssoTicket = param1;
        this._communication.mode = 0;
        this.initGameSocket();
    }

    private initWithLoginView(): void {
        let _loc1_: string = CommunicationUtils.readSOLString("environment");
        if (_loc1_ == null || _loc1_ == "") {
        }
        if (this._windowManager != null && !this.isRoomViewerMode) {
            Core.crash("Login without an SSO ticket is not supported", 29);
        }
        if (_loc1_ && _loc1_ == "") {
            this._SafeStr_3245.init(this._communication);
        }
    }

    private initEnvironment(param1: string): void {
        this.setProperty(HabboProperty.ENVIRONMENT_ID, param1);
        CommunicationUtils.writeSOLProperty("environment", param1);
        this.updateEnvironmentVariables(param1);
        this._communication.updateHostParameters();
        this._communication.resetHabboWebApiSession();
        this._localization.loadDefaultEmbedLocalizations(param1);
        if (this._loginView != null) {
            if (this._loginView.useWebApi) {
                this._SafeStr_3245.init(this._communication);
            } else {
                this._loginView.environmentReady();
            }
        }
    }

    private userExists(param1: AvatarData[], param2: string): boolean {
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_.uniqueId == param2) {
                return true;
            }
        }
        return false;
    }

    private onBufferedDisconnected(param1: number, param2: string): void {
        let _loc5_: boolean = false;
        let _loc3_: string = null;
        let _loc4_: any = false;
        if (param1 == 20) {
            this._loginView.showInvalidLoginError(null);
        } else {
            _loc5_ = !!(this._loginName && this._loginName.length && this._password && this._password.length);
            _loc3_ = CommunicationUtils.readSOLString("loginmethod", "habbo");
            _loc4_ = _loc3_ == "facebook";
            if (param1 != -3 || !_loc5_ && !_loc4_ || true) {
                this._loginView.showDisconnected(param1, param2);
                if (this._communication) {
                    this._communication.disconnect();
                }
            } else {
                this._SafeStr_5729 = true;
                CommunicationUtils.forcedAutoLoginEnabled = true;
                this.initComponent();
            }
        }
    }

    private isExcludeFromWarnings(param1: number): boolean {
        return this.isExcludedFromListProperty(param1, HabboProperty.EXCLUDE_WARNINGS_FOR_CATEGORIES);
    }

    private isExcludeFromCrashing(param1: number): boolean {
        return this.isExcludedFromListProperty(param1, HabboProperty.EXCLUDE_CRASHING_FOR_CATEGORIES);
    }

    private isExcludedFromListProperty(param1: number, param2: string): boolean {
        let _loc3_: string = this.getProperty(param2);
        if (!_loc3_) {
            return false;
        }
        let _loc4_: any[] = _loc3_.split(",");
        return _loc4_.indexOf(param1.toString()) != -1;
    }

    private updateEnvironmentVariables(param1: string): void {
        let _loc4_: any[] = null;
        let _loc2_: string = null;
        let _loc5_: string = null;
        _loc4_ = [];
        _loc4_.push(HabboProperty.CONNECTION_INFO_HOST);
        _loc4_.push(HabboProperty.CONNECTION_INFO_PORT);
        _loc4_.push(HabboProperty.URL_PREFIX);
        _loc4_.push(HabboProperty.SITE_URL);
        _loc4_.push(HabboProperty.DYNAMIC_DOWNLOAD_URL);
        _loc4_.push(HabboProperty.DYNAMIC_DOWNLOAD_NAME_TEMPLATE);
        _loc4_.push(HabboProperty.DYNAMIC_AVATAR_DOWNLOAD_CONFIGURATION);
        _loc4_.push(HabboProperty.DYNAMIC_AVATAR_DOWNLOAD_URL);
        _loc4_.push(HabboProperty.POCKET_API);
        _loc4_.push(HabboProperty.WEB_API);
        _loc4_.push(HabboProperty.FACEBOOK_APPLICATION_ID);
        _loc4_.push(HabboProperty.TERMS_OF_SERVICE_LINK);
        for (const _loc3_ of _loc4_ ?? []) {
            _loc2_ = this.getProperty(stringOrNull(_loc3_));
            _loc5_ = _loc3_ + "." + param1;
            if (this.propertyExists(_loc5_)) {
                this.setProperty(stringOrNull(_loc3_), this.getProperty(_loc5_));
            } else {
                this.setProperty(stringOrNull(_loc3_), _loc2_);
            }
        }
    }

    private onInitLogin(param1: Event): void {
        let _loc2_: IHabboWebApiSession = null;
        if (this._loginView.useWebApi) {
            _loc2_ = this._communication.getHabboWebApiSession();
            _loc2_.login(this._loginView.name, this._loginView.password);
        } else {
            this.initGameSocket();
        }
    }

    private onAvatarSelected(param1: Event): void {
        let _loc2_: IHabboWebApiSession = null;
        if (this._loginView.useWebApi) {
            _loc2_ = this._communication.getHabboWebApiSession();
            _loc2_.selectAvatar(this._loginView.selectedAccount.uniqueId);
        } else {
            this.sendTryLoginDevelopmentOnly(this._loginView.name, this._loginView.password, this._loginView.avatarId);
        }
    }

    private onEnvironmentSelected(param1: Event): void {
        this.initEnvironment(this._loginView.selectedEnvironment);
    }

    private onConfigurationLoaded(param1: Event): void {
        HabboCommunicationDemo._log.info("Configuration Loaded!");
    }

    private onConfigurationError(param1: Event): void {
        let _loc2_: DataEvent = param1 instanceof DataEvent ? param1 : null;
        HabboCommunicationDemo._log.error("Configuration Error!");
        if (_loc2_ && _loc2_.data == "503") {
        }
    }

    private onLocalizationsComplete(param1: Event): void {
    }

    private onLocalizationFailed(param1: Event): void {
    }

    private unloading(param1: Event): void {
        this._logoutInProgress = true;
    }

    private onAutoSendLogin(param1: TimerEvent): void {
        let _loc2_: number = CommunicationUtils.readSOLInteger("userid");
        this.sendTryLoginDevelopmentOnly(this._loginName, this._password, _loc2_);
    }

    private onCoreError(param1: ErrorEvent): void {
        switch (param1.category) {
            case 30:
            case 29:
            case 1:
            case 3:
            case 20:
            case 8:
            case 12:
            case 7:
                if (param1.critical && !this.isExcludeFromCrashing(param1.category)) {
                    this.disconnected(-2, this._localization.getLocalization("disconnected.reason.maintenance"));
                }
                break;
            default:
                this.handleNonMaintenanceCoreError(param1);
        }
    }

    private handleNonMaintenanceCoreError(param1: ErrorEvent): void {
        if (param1.error != null && (param1.error.errorID ?? 0) != param1.category) {
        }
        let _loc2_: boolean = this.isExcludeFromWarnings(param1.category) || !param1.critical && !this.getBoolean(HabboProperty.SHOW_ERROR_WARNING_INCLUDE_NONCRITICAL);
        if (!_loc2_ && this.getBoolean(HabboProperty.SHOW_ERROR_WARNING)) {
            this._SafeStr_3990.onError(param1, this.getBoolean(HabboProperty.SHOW_ERROR_STACKTRACE));
        }
        if (param1.critical && !this.isExcludeFromCrashing(param1.category) && this.getBoolean(HabboProperty.CRASH_ON_CRIT_ERROR)) {
            this.disconnected(-1, DisconnectReasonEvent.resolveDisconnectedReasonLocalizationKey(-1));
        }
    }

    private onHotelViewError(param1: Event): void {
        this.disconnected(-2, this._localization.getLocalization("disconnected.reason.maintenance"));
    }

    protected override initInstanceFields(): void {
        this.onLocalizationsComplete = this.onLocalizationsComplete.bind(this);
        this.onLocalizationFailed = this.onLocalizationFailed.bind(this);
        this.unloading = this.unloading.bind(this);
        this.onAutoSendLogin = this.onAutoSendLogin.bind(this);
        this.onCoreError = this.onCoreError.bind(this);
        this.onHotelViewError = this.onHotelViewError.bind(this);
        this._logoutInProgress = false;
        this._SafeStr_4356 = false;
        this._autoLogin = false;
        this._SafeStr_5729 = false;
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboCommunicationDemo.#staticsReady) return;
        HabboCommunicationDemo.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboCommunicationDemo, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.communication.demo.HabboCommunicationDemo"));
    }
}
