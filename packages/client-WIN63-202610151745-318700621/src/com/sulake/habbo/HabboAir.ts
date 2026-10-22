import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Component } from '@/com/sulake/core/runtime/Component';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICore } from '@/com/sulake/core/runtime/ICore';
import type { ICoreErrorLogger } from '@/com/sulake/core/runtime/ICoreErrorLogger';
import type { ICoreErrorReporter } from '@/com/sulake/core/runtime/ICoreErrorReporter';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IHabboLoadingScreen } from '@/com/sulake/habbo/IHabboLoadingScreen';
import { NativeApplication } from '@habbo-pixi/runtime/desktop/NativeApplication';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { MovieClip } from '@habbo-pixi/runtime/display/MovieClip';
import type { BrowserInvokeEvent } from '@habbo-pixi/runtime/events/BrowserInvokeEvent';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { InvokeEvent } from '@habbo-pixi/runtime/events/InvokeEvent';
import type { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import type { UncaughtErrorEvent } from '@habbo-pixi/runtime/events/UncaughtErrorEvent';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { URLRequestHeader } from '@habbo-pixi/runtime/net/URLRequestHeader';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { System } from '@habbo-pixi/runtime/system/System';
import { clearInterval } from '@habbo-pixi/runtime/utils/clearInterval';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { setInterval } from '@habbo-pixi/runtime/utils/setInterval';
import type { Namespace } from '@habbo-pixi/runtime/xml/Namespace';
import { QName } from '@habbo-pixi/runtime/xml/QName';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { FileProxy } from '@/com/sulake/air/FileProxy';
import { NativeApplicationProxy } from '@/com/sulake/air/NativeApplicationProxy';
import { Core, CoreComponentContext } from '@/com/sulake/core/runtime/Component.group';
import { ErrorEvent } from '@/com/sulake/core/runtime/events/ErrorEvent';
import { isIContext } from '@/com/sulake/core/runtime/IContext';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { MouseWheelEnabler } from '@/com/sulake/core/utils/MouseWheelEnabler';
import { HabboAvatarEditorCom } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager.group';
import { CoreCommunicationFrameworkLib } from '@/com/sulake/habbo/CoreCommunicationFrameworkLib';
import { HabboFriendBarCom } from '@/com/sulake/habbo/friendbar/HabboFriendBar.group';
import { HabboGamesCom } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { HabboAdManagerCom } from '@/com/sulake/habbo/HabboAdManagerCom';
import { HabboAvatarRenderLib } from '@/com/sulake/habbo/HabboAvatarRenderLib';
import { HabboCatalogCom } from '@/com/sulake/habbo/HabboCatalogCom';
import { HabboCommunicationCom } from '@/com/sulake/habbo/HabboCommunicationCom';
import { HabboCommunicationDemoCom } from '@/com/sulake/habbo/HabboCommunicationDemoCom';
import { HabboConfigurationCom } from '@/com/sulake/habbo/HabboConfigurationCom';
import { HabboDiscordCom } from '@/com/sulake/habbo/HabboDiscordCom';
import { HabboFreeFlowChatCom } from '@/com/sulake/habbo/HabboFreeFlowChatCom';
import { HabboFriendListCom } from '@/com/sulake/habbo/HabboFriendListCom';
import { HabboGroupsCom } from '@/com/sulake/habbo/HabboGroupsCom';
import { HabboHelpCom } from '@/com/sulake/habbo/HabboHelpCom';
import { HabboInventoryCom } from '@/com/sulake/habbo/HabboInventoryCom';
import { HabboLoadingScreen } from '@/com/sulake/habbo/HabboLoadingScreen';
import { HabboLocalizationCom } from '@/com/sulake/habbo/HabboLocalizationCom';
import { HabboMessengerCom } from '@/com/sulake/habbo/HabboMessengerCom';
import { HabboModerationCom } from '@/com/sulake/habbo/HabboModerationCom';
import { HabboNavigatorCom } from '@/com/sulake/habbo/HabboNavigatorCom';
import { HabboNewNavigatorCom } from '@/com/sulake/habbo/HabboNewNavigatorCom';
import { HabboNotificationsCom } from '@/com/sulake/habbo/HabboNotificationsCom';
import { HabboQuestEngineCom } from '@/com/sulake/habbo/HabboQuestEngineCom';
import { HabboRoomEngineCom } from '@/com/sulake/habbo/HabboRoomEngineCom';
import { HabboRoomObjectLogicLib } from '@/com/sulake/habbo/HabboRoomObjectLogicLib';
import { HabboRoomObjectVisualizationLib } from '@/com/sulake/habbo/HabboRoomObjectVisualizationLib';
import { HabboRoomSessionManagerLib } from '@/com/sulake/habbo/HabboRoomSessionManagerLib';
import { HabboRoomUICom } from '@/com/sulake/habbo/HabboRoomUICom';
import { HabboSessionDataManagerLib } from '@/com/sulake/habbo/HabboSessionDataManagerLib';
import { HabboSoundManagerFlash10Com } from '@/com/sulake/habbo/HabboSoundManagerFlash10Com';
import { HabboToolbarCom } from '@/com/sulake/habbo/HabboToolbarCom';
import { HabboTrackingLib } from '@/com/sulake/habbo/HabboTrackingLib';
import { HabboUserDefinedRoomEventsCom } from '@/com/sulake/habbo/HabboUserDefinedRoomEventsCom';
import { HabboWindowManagerCom } from '@/com/sulake/habbo/HabboWindowManagerCom';
import { Logger } from '@/com/sulake/habbo/Logger';
import { RoomManagerLib } from '@/com/sulake/habbo/RoomManagerLib';
import { RoomSpriteRendererLib } from '@/com/sulake/habbo/RoomSpriteRendererLib';
import { SiteLockValidator } from '@/com/sulake/habbo/SiteLockValidator';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { PlatformData } from '@/com/sulake/habbo/utils/PlatformData';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { PacketLog } from '@/debug/PacketLog';
import { LoginFlow } from '@/login/LoginFlow';

export class HabboAir extends MovieClip {
    static { registerClassName(this, 'HabboAir'); }

    public static readonly CORE_RATIO: number = 0.6;
    private static readonly INIT_STEPS: number = 3;
    protected static PROCESSLOG_ENABLED: boolean = false;
    public static readonly ERROR_VARIABLE_IS_FATAL: string = "is_fatal";
    public static readonly ERROR_VARIABLE_CLIENT_CRASH_TIME: string = "crash_time";
    public static readonly ERROR_VARIABLE_CONTEXT: string = "error_ctx";
    public static readonly ERROR_VARIABLE_FLASH_VERSION: string = "flash_version";
    public static readonly ERROR_VARIABLE_AVERAGE_UPDATE_INTERVAL: string = "avg_update";
    public static readonly ERROR_VARIABLE_DEBUG: string = "debug";
    public static readonly ERROR_VARIABLE_DESCRIPTION: string = "error_desc";
    public static readonly ERROR_VARIABLE_CATEGORY: string = "error_cat";
    public static readonly ERROR_VARIABLE_DATA: string = "error_data";
    private static readonly RECEPTION_LOG_STEP_FUNCTION: string = "NewUserReception.logStep";
    private static readonly STEP_NUX_ENTERED: string = "NUX_ENTERED";
    private static readonly STEP_RECEPTION_EXITED: string = "RECEPTION_EXITED";
    private static readonly STEP_NUX_EXITED: string = "NUX_EXITED";
    private static readonly STEP_CLIENT_LOADED: string = "CLIENT_LOADED";
    public static readonly ERROR_CATEGORY_FINALIZE_PRELOADING: number = 9;
    public static readonly ERROR_CATEGORY_DOWNLOAD_FONT: number = 11;
    public static readonly ERROR_UNCAUGHT_ERROR: number = 40;
    private static readonly LOCKED_COMPONENT_LOG_INTERVAL_MS: number = 2000;
    private static readonly LOCKED_COMPONENT_LOG_WARNING_DELAY_MS: number = 10000;
    private static readonly SANDBOX_CRASH_URL: string = "https://sandbox.habbo.com/api/log/crash";
    private static readonly S2_ENVIRONMENT_ID: string = "s2";
    private static readonly ARGUMENT_ENVIRONMENT: string = "server";
    private static readonly ARGUMENT_SSO_TOKEN: string = "ticket";
    private static _crashReportUrl: string = "https://www.habbo.com/api/log/crash";
    private static _SafeStr_6054: boolean = false;
    private static readonly REFRESH_PERIOD_IN_MILLIS: number = 15000;
    private static _lastRequestTime: Date;

    declare private _loadingScreen: IHabboLoadingScreen;

    declare private _startTime: number;
    static { (this.prototype as any)._startTime = 0; }

    private _loginFlow: LoginFlow = null;

    declare private _stageReady: boolean;
    static { (this.prototype as any)._stageReady = false; }

    declare private _argumentsParsed: boolean;
    static { (this.prototype as any)._argumentsParsed = false; }

    private _loginFlowEnabled: boolean = false;

    declare private _core: ICore;

    private _totalSteps: number = 3;
    private _loadedFiles: number = 0;
    private _completedInitSteps: number = 0;
    private _SafeStr_5915: boolean = false;
    private _coreRunning: boolean = false;
    private _prepareCoreOnNextFrame: boolean = false;
    private _coreInitializationStarted: boolean = false;
    private _applicationInfoLogged: boolean = false;
    private _lockedComponentLogIntervalId: number = 0;

    declare private _lockedComponentReports: any;

    private _coreShutDown: boolean = false;

    declare private _arguments: Map<any, any>;

    constructor() {
        super();
        let _loc1_: SiteLockValidator = new SiteLockValidator();
        if (!_loc1_.validateDomain(this)) {
            return;
        }
        this._lockedComponentReports = {};
        this._startTime = getTimer();
        this.stop();
        this._arguments = new Dictionary();
        if (this.stage) {
            this.onAddedToStage();
        } else {
            this.addEventListener("addedToStage", this.onAddedToStage);
        }
        NativeApplication.nativeApplication.addEventListener("invoke", this.onInvoke);
        NativeApplication.nativeApplication.addEventListener("browserInvoke", this.onBrowserInvoke);
        NativeApplication.nativeApplication.addEventListener("exiting", this.onApplicationExiting);
    }

    public static trackLoginStep(param1: string, param2: string = null): void {
        Logger.log("* HabboMain Login Step: " + param1);
        if (HabboAir.PROCESSLOG_ENABLED) {
            try {
                if (ExternalInterface.available) {
                    if (param2 != null) {
                        ExternalInterface.call("FlashExternalInterface.logLoginStep", param1, param2);
                    } else {
                        ExternalInterface.call("FlashExternalInterface.logLoginStep", param1);
                    }
                } else {
                    Logger.log("ExternalInterface is not available, tracking is disabled");
                }
            } catch (e) {
            }
        }
    }

    public static reportCrash(param1: string, param2: number, param3: boolean, param4: Error = null, param5: ICoreErrorLogger = null): void {
        let _loc6_: string = param4 == null ? "" : param4.stack;
        HabboAir.reportCrashStack(param1, param2, param3, _loc6_, param5);
    }

    public static reportCrashStack(param1: string, param2: number, param3: boolean, param4: string, param5: ICoreErrorLogger = null): void {
        let _loc10_: number = 0;
        if (HabboAir._lastRequestTime != null && HabboAir._lastRequestTime.getTime() + 15000 > new Date().getTime()) {
            return;
        }
        HabboAir._lastRequestTime = new Date();
        let _loc7_: any = {};
        _loc7_["crash_time"] = new Date().getTime().toString();
        _loc7_["is_fatal"] = param3.toString();
        _loc7_["error_ctx"] = "";
        _loc7_["flash_version"] = Capabilities.version;
        _loc7_["avg_update"] = 0;
        _loc7_["error_desc"] = param1;
        _loc7_["error_cat"] = String(param2);
        if (param4 != "") {
            _loc7_["error_data"] = param4;
        }
        _loc7_["debug"] = "Memory usage: " + Math.round(System.totalMemory / 1048576) + " MB";
        let _loc8_: any[] = ErrorReportStorage.getParameterNames();
        let _loc9_: number = _loc8_.length | 0;
        _loc10_ = 0;
        while (_loc10_ < _loc9_) {
            _loc7_[_loc8_[_loc10_]] = ErrorReportStorage.getParameter(stringOrNull(_loc8_[_loc10_]));
            _loc10_++;
        }
        _loc7_["debug"] = ErrorReportStorage.getDebugData();
        if (param3) {
            if (!HabboAir._SafeStr_6054) {
                HabboAir._SafeStr_6054 = true;
            }
        }
        let _loc6_: URLRequest = new URLRequest(HabboAir._crashReportUrl);
        _loc6_.method = "POST";
        _loc6_.requestHeaders.push(new URLRequestHeader("Content-Type", "application/json"));
        try {
            _loc6_.data = JSON.stringify(_loc7_);
            new URLLoader().load(_loc6_);
        } catch (e) {
            Logger.log("Error while sending error report: " + e.message);
        }
    }

    private onBrowserInvoke = (param1: BrowserInvokeEvent): void => {
        Logger.log("Received Browser Invoke: " + param1.arguments);
        NativeApplication.nativeApplication.removeEventListener("browserInvoke", this.onBrowserInvoke);
        this.parseArguments(param1.arguments);
    };

    private onInvoke = (param1: InvokeEvent): void => {
        NativeApplication.nativeApplication.removeEventListener("invoke", this.onInvoke);
        this.parseArguments(param1.arguments);
    };

    private parseArguments(param1: any[]): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: string = null;
        let _loc4_: string = null;
        this._arguments = new Dictionary();
        if (param1 && param1.length) {
            if (param1.length % 2 != 0) {
            }
            _loc2_ = param1.length / 2 | 0;
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                if (_loc3_ * 2 + 1 < param1.length) {
                    _loc5_ = stringOrNull(param1[_loc3_ * 2]);
                    _loc4_ = stringOrNull(param1[_loc3_ * 2 + 1]);
                    _loc5_ = _loc5_.replace("-", "");
                    if (_loc5_ == "server") {
                        _loc4_ = _loc4_.replace("hh", "");
                        _loc4_ = _loc4_.replace("br", "pt");
                        _loc4_ = _loc4_.replace("us", "en");
                        this._arguments.set("environment.id", _loc4_);
                        CommunicationUtils.writeSOLProperty("environment", _loc4_);
                    }
                    // packet log (tools/fixes/packet_log.py)
                    if (_loc5_ == "packets") {
                        PacketLog.enabled = PacketLog.isOn(_loc4_);
                    }
                    if (_loc5_ == "ticket") {
                        this._arguments.set("sso.token", _loc4_);
                    }
                }
                _loc3_++;
            }
        }
        this._argumentsParsed = true;
        this.tryInit();
    }

    private onAddedToStage = (param1: Event = null): void => {
        this.removeEventListener("addedToStage", this.onAddedToStage);
        this._stageReady = true;
        this.tryInit();
    };

    private tryInit(): void {
        let clientFatalErrorUrl: string;
        let urlPrefix: string;
        if (!this._argumentsParsed || !this._stageReady) {
            return;
        }
        clientFatalErrorUrl = stringOrNull(this._arguments.get("client.fatal.error.url"));
        if (clientFatalErrorUrl != null) {
            HabboAir._crashReportUrl = clientFatalErrorUrl;
        } else {
            urlPrefix = stringOrNull(this._arguments.get("url.prefix"));
            if (urlPrefix != null) {
                HabboAir._crashReportUrl = urlPrefix + "/flash_client_error";
            }
        }
        if (this.isSandboxConnection()) {
            HabboAir._crashReportUrl = "https://sandbox.habbo.com/api/log/crash";
        }
        HabboAir.PROCESSLOG_ENABLED = this._arguments.get("processlog.enabled") == "1";
        HabboAir.trackLoginStep("client.init.start");
        this.stage.scaleMode = "noScale";
        this.stage.quality = "low";
        this.stage.align = "TL";
        this.root.loaderInfo.uncaughtErrorEvents.addEventListener("uncaughtError", (param1: UncaughtErrorEvent): void => {
             HabboAir.reportCrash("Uncaught client error, eventType: " + param1.type + " errorID: " + param1.errorID + " runtime: " + (getTimer() - this._startTime) / 1000 + "s", 40, true, param1.error);
         });
        this.createLoginFlowOrLoadingScreen();
        this.startCoreInitializationIfPossible();
        MouseWheelEnabler.init(this.stage);
    }

    private isSandboxConnection(): boolean {
        let _loc1_: string = stringOrNull(this._arguments.get("environment.id"));
        return _loc1_ != null && _loc1_.toLowerCase() == "s2";
    }

    private onLoginFlowFinished = (param1: Event): void => {
        this._arguments.set("sso.token", this._loginFlow.ssoToken);
        this._arguments.set("environment.id", CommunicationUtils.readSOLString("environment"));
        this._loginFlow.removeEventListener("LOGIN_FLOW_FINISHED_EVENT", this.onLoginFlowFinished);
        this._loginFlow.dispose();
        this._loginFlow = null;
        this._loadingScreen = null;
        this.createLoadingScreen();
        this.startCoreInitializationIfPossible();
    };

    private clone(param1: Map<any, any>): Map<any, any> {
        let _loc2_: Map<any, any> = new Dictionary();
        for (const _loc3_ of param1?.keys() ?? []) {
            if (param1.get(_loc3_) instanceof Map) {
                _loc2_.set(_loc3_, this.clone(param1.get(_loc3_)));
            } else {
                _loc2_.set(_loc3_, param1.get(_loc3_));
            }
        }
        return _loc2_;
    }

    private createLoginFlowOrLoadingScreen(): void {
        if (!this.ssoTokenAvailable && this._loginFlowEnabled) {
            this._loginFlow = new LoginFlow(this.clone(this._arguments));
            this._loginFlow.addEventListener("LOGIN_FLOW_FINISHED_EVENT", this.onLoginFlowFinished);
            this.stage.addChild(this._loginFlow);
            this._loginFlow.init();
            this.updateLoadingBarProgress();
            return;
        }
        this.createLoadingScreen();
    }

    public createLoadingScreen(): void {
        this._loadingScreen = new HabboLoadingScreen(this.stage.stageWidth, this.stage.stageHeight, this.clone(this._arguments));
        this.updateLoadingBarProgress();
        this.stage.addChild(castTo(this._loadingScreen, DisplayObject));
    }

    private updateLoadingBarProgress(): void {
        if (this._loadingScreen != null) {
            this._loadingScreen.updateLoadingBar(0.6);
        }
    }

    private startCoreInitializationIfPossible(): void {
        if (this._coreInitializationStarted) {
            return;
        }
        if (this._loadingScreen == null) {
            return;
        }
        this._coreInitializationStarted = true;
        HabboAir.trackLoginStep("client.init.swf.loaded");
        this.logApplicationInfo();
        Logger.log(getQualifiedClassName(Core) + " version: " + Core.version);
        this.addEventListener("exitFrame", this.onExitFrame);
        this._prepareCoreOnNextFrame = true;
    }

    private logApplicationInfo(): void {
        if (this._applicationInfoLogged) {
            return;
        }
        this._applicationInfoLogged = true;
        let _loc2_: XML = NativeApplication.nativeApplication.applicationDescriptor;
        let _loc4_: Namespace = _loc2_.namespace();
        let _loc1_: string = _loc2_.child(new QName(_loc4_, "copyright")).toString();
        let _loc3_: string = _loc2_.child(new QName(_loc4_, "versionLabel")).toString();
        let _loc5_: string = _loc2_.child(new QName(_loc4_, "versionNumber")).toString();
        Logger.log("AIR Runtime version: " + NativeApplication.nativeApplication.runtimeVersion);
        Logger.log("Application ID: " + NativeApplication.nativeApplication.applicationID);
        Logger.log("Copyright: " + _loc1_);
        Logger.log("Version: " + _loc3_);
        Logger.log("VersionNumber: " + _loc5_);
    }

    protected onExitFrame = (param1: Event = null): void => {
        if (this._prepareCoreOnNextFrame) {
            this._prepareCoreOnNextFrame = false;
            this.prepareCore();
            return;
        }
        if (this._SafeStr_5915 && this._coreRunning) {
            this.disposeLoadingScreen();
            this.removeEventListener("exitFrame", this.onExitFrame);
        }
    };

    private prepareCore(): void {
        let _loc2_: ICoreErrorReporter = null;
        let _loc1_: IEventDispatcher = null;
        let _loc3_: XML = null;
        try {
            _loc2_ = Capabilities.playerType != "StandAlone" ? new HabboCoreErrorReporter() : null;
            this._core = Core.instantiate(this.stage, 1, _loc2_, this._arguments);
            _loc1_ = this.getCoreEventDispatcher();
            if (_loc1_ != null) {
                _loc1_.addEventListener("COMPONENT_EVENT_ERROR", this.onCoreError);
                _loc1_.addEventListener("COMPONENT_EVENT_REBOOT", this.onCoreReboot);
            }
            this._core.prepareComponent(HabboTrackingLib);
            this.addEventListener("progress", this.onProgressEvent);
            this.addEventListener("complete", this.onCompleteEvent);
            _loc3_ = new XML(`<config>
					<asset-libraries>
						<library url="hh_human_body.swf"/>
						<library url="hh_human_item.swf"/>
					</asset-libraries>
					<service-libraries/>
					<component-libraries/>
				</config>`);
            _loc3_ = new XML();
            this._core.readConfigDocument(_loc3_, this);
            (this._core instanceof CoreComponentContext ? this._core : null).fileProxy = new FileProxy();
            if (PlatformData.nativeApplicationProxy) {
                PlatformData.nativeApplicationProxy.dispose();
            }
            PlatformData.nativeApplicationProxy = new NativeApplicationProxy();
            this._totalSteps = this._core.getNumberOfFilesPending() + this._core.getNumberOfFilesLoaded() + 3;
            this._core.prepareComponent(CoreCommunicationFrameworkLib);
            this._core.prepareComponent(HabboRoomObjectLogicLib);
            this._core.prepareComponent(HabboRoomObjectVisualizationLib);
            this._core.prepareComponent(RoomManagerLib);
            this._core.prepareComponent(RoomSpriteRendererLib);
            this._core.prepareComponent(HabboRoomSessionManagerLib);
            this._core.prepareComponent(HabboAvatarRenderLib);
            this._core.prepareComponent(HabboSessionDataManagerLib);
            this._core.prepareComponent(HabboConfigurationCom);
            this._core.prepareComponent(HabboLocalizationCom);
            this._core.prepareComponent(HabboWindowManagerCom);
            this._core.prepareComponent(HabboCommunicationCom);
            this._core.prepareComponent(HabboCommunicationDemoCom);
            this._core.prepareComponent(HabboNavigatorCom);
            this._core.prepareComponent(HabboFriendListCom);
            this._core.prepareComponent(HabboMessengerCom);
            this._core.prepareComponent(HabboInventoryCom);
            this._core.prepareComponent(HabboToolbarCom);
            this._core.prepareComponent(HabboCatalogCom);
            this._core.prepareComponent(HabboRoomEngineCom);
            this._core.prepareComponent(HabboRoomUICom);
            this._core.prepareComponent(HabboAvatarEditorCom);
            this._core.prepareComponent(HabboNotificationsCom);
            this._core.prepareComponent(HabboHelpCom);
            this._core.prepareComponent(HabboAdManagerCom);
            this._core.prepareComponent(HabboModerationCom);
            this._core.prepareComponent(HabboUserDefinedRoomEventsCom);
            this._core.prepareComponent(HabboSoundManagerFlash10Com);
            this._core.prepareComponent(HabboQuestEngineCom);
            this._core.prepareComponent(HabboFriendBarCom);
            this._core.prepareComponent(HabboGroupsCom);
            this._core.prepareComponent(HabboGamesCom);
            this._core.prepareComponent(HabboFreeFlowChatCom);
            this._core.prepareComponent(HabboDiscordCom);
            this._core.prepareComponent(HabboNewNavigatorCom);
            this.addInitializationProgressListeners();
            this.startLockedComponentLogging();
        } catch (error) {
            HabboAir.trackLoginStep("client.init.core.fail");
            HabboAir.reportCrash("Failed to prepare the core: " + error.message, 10, true, error);
            this.showLoadingError("Failed to prepare the core: " + error.message, 10);
            Core.dispose();
        }
    }

    private updateProgressBar(): void {
        let _loc1_: number = NaN;
        if (this._loadingScreen != null) {
            _loc1_ = 0.6 + (this._completedInitSteps + this._loadedFiles) / this._totalSteps * (1 - 0.6);
            this._loadingScreen.updateLoadingBar(_loc1_);
        }
    }

    private onProgressEvent = (param1: ProgressEvent): void => {
        this._loadedFiles = this._core.getNumberOfFilesLoaded() | 0;
        this.updateProgressBar();
    };

    private onCompleteEvent = (param1: Event): void => {
        this.removeEventListener("progress", this.onProgressEvent);
        this.removeEventListener("complete", this.onCompleteEvent);
        this.initializeCore();
    };

    private initializeCore(): void {
        HabboAir.trackLoginStep("client.init.core.init");
        try {
            this._core.initialize();
            if (ExternalInterface.available) {
                ExternalInterface.addCallback("unloading", this.unloading);
            }
        } catch (error) {
            HabboAir.trackLoginStep("client.init.core.fail");
            this.showLoadingError("Failed to initialize the core: " + error.message, 10);
            Core.crash("Failed to initialize the core: " + error.message, 10, error);
        }
    }

    private showLoadingError(param1: string, param2: number = -1): void {
        this.removeEventListener("exitFrame", this.onExitFrame);
        this.removeEventListener("progress", this.onProgressEvent);
        this.removeEventListener("complete", this.onCompleteEvent);
        this.stopLockedComponentLogging();
        this._prepareCoreOnNextFrame = false;
        this._coreInitializationStarted = false;
        if (this._loadingScreen != null && !this._loadingScreen.disposed) {
            this._loadingScreen.showError(this.formatLoadingErrorMessage(param1, param2));
        }
    }

    private formatLoadingErrorMessage(param1: string, param2: number): string {
        let _loc3_: string = null;
        let _loc4_: string = null;
        let _loc5_: string = param1 == null ? "" : param1.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
        let _loc6_: string = _loc5_.toLowerCase();
        if (param2 == 8 || param2 == 7 || _loc6_.indexOf("gamedata") > -1 || _loc6_.indexOf("product data") > -1 || _loc6_.indexOf("localization") > -1) {
            _loc3_ = "Failed to download required game data.\nPlease check your connection and restart the client.";
        } else if (param2 == 2 || param2 == 5 || _loc6_.indexOf("download") > -1) {
            _loc3_ = "Failed to download required client libraries.\nPlease check your connection and restart the client.";
        } else {
            _loc3_ = "Client startup failed.\nPlease restart the client.";
        }
        if (_loc5_ != "") {
            _loc4_ = _loc5_;
            if (_loc4_.length > 220) {
                _loc4_ = _loc4_.substr(0, 220) + "...";
            }
            _loc3_ += "\n\nDetails: " + _loc4_;
        }
        return _loc3_;
    }

    private getCoreEventDispatcher(): IEventDispatcher {
        let _loc1_: IContext = isIContext(this._core) ? this._core : null;
        return _loc1_ != null ? _loc1_.events : null;
    }

    public unloading = (): void => {
        let _loc1_: IEventDispatcher = null;
        try {
            if (this._core && !this._core.disposed) {
                ErrorReportStorage.addDebugData("Unload", "Client unloading started");
                _loc1_ = this.getCoreEventDispatcher();
                if (_loc1_ != null) {
                    _loc1_.dispatchEvent(new Event("unload"));
                }
            }
        } catch (error) {
        }
    };

    public onCoreError = (param1: Event): void => {
        let _loc4_: string = "Unknown core error";
        let _loc3_: number = -1;
        let _loc5_: boolean = false;
        let _loc2_: Error = null;
        let _loc6_: ErrorEvent = param1 instanceof ErrorEvent ? param1 : null;
        if (_loc6_ != null) {
            _loc4_ = _loc6_.message;
            _loc3_ = _loc6_.category;
            _loc5_ = _loc6_.critical;
            _loc2_ = _loc6_.error;
        }
        Logger.log("onCoreError type=" + param1.type + " critical=" + _loc5_ + " category=" + _loc3_ + " message=" + _loc4_);
        if (_loc5_ && this._loadingScreen != null && !this._loadingScreen.disposed) {
            this.showLoadingError(_loc4_, _loc3_);
        }
        if (_loc5_) {
            HabboAir.reportCrash(_loc4_, _loc3_, true, _loc2_);
        }
    };

    private onApplicationExiting = (param1: Event): void => {
        this.shutdownCore();
    };

    private shutdownCore(): void {
        if (this._coreShutDown) {
            return;
        }
        this._coreShutDown = true;
        this.stopLockedComponentLogging();
        this.unloading();
        NativeApplication.nativeApplication.removeEventListener("exiting", this.onApplicationExiting);
        let _loc1_: IEventDispatcher = this.getCoreEventDispatcher();
        if (_loc1_ != null) {
            _loc1_.removeEventListener("COMPONENT_EVENT_ERROR", this.onCoreError);
            _loc1_.removeEventListener("COMPONENT_EVENT_REBOOT", this.onCoreReboot);
            _loc1_.removeEventListener("COMPONENT_EVENT_RUNNING", this.onCoreRunning);
        }
        Core.dispose();
        this._core = null;
    }

    private onCoreReboot = (param1: Event): void => {
        Logger.log("Reboot application! " + System.privateMemory, System.totalMemory, System.totalMemoryNumber);
        this.shutdownCore();
        Logger.log("Application ready for restart! " + System.privateMemory, System.totalMemory, System.totalMemoryNumber);
        NativeApplication.nativeApplication.exit(1);
    };

    private simpleQueueInterface(param1: IID, param2: (...args: any[]) => any): void {
        let _loc3_: any = this._core.queueInterface(param1, param2);
        if (_loc3_ != null) {
            param2(param1, _loc3_);
        }
    }

    private addInitializationProgressListeners(): void {
        let coreEvents: IEventDispatcher;
        this.simpleQueueInterface(new IIDHabboLocalizationManager(), (param1: IID, param2: Component): void => {
             param2.events.addEventListener("complete", this.onLocalizationComplete);
         });
        this.simpleQueueInterface(new IIDHabboConfigurationManager(), this.onConfigurationComplete);
        this.simpleQueueInterface(new IIDRoomEngine(), (param1: IID, param2: Component): void => {
             param2.events.addEventListener("REE_ENGINE_INITIALIZED", this.onRoomEngineReady);
         });
        coreEvents = this.getCoreEventDispatcher();
        if (coreEvents != null) {
            coreEvents.addEventListener("COMPONENT_EVENT_RUNNING", this.onCoreRunning);
        }
    }

    private startLockedComponentLogging(): void {
        if (this._lockedComponentLogIntervalId != 0) {
            return;
        }
        if (!(this._core instanceof CoreComponentContext)) {
            return;
        }
        this._lockedComponentLogIntervalId = setInterval(this.logLockedComponents, 2000) | 0;
        this.logLockedComponents();
    }

    private stopLockedComponentLogging(): void {
        if (this._lockedComponentLogIntervalId != 0) {
            clearInterval(this._lockedComponentLogIntervalId >>> 0);
            this._lockedComponentLogIntervalId = 0;
        }
        this._lockedComponentReports = {};
    }

    private logLockedComponents = (): void => {
        let _loc6_: string = null;
        let _loc10_: any = undefined;
        let _loc2_: string = null;
        let _loc7_: any = null;
        if (!(this._core instanceof CoreComponentContext)) {
            this.stopLockedComponentLogging();
            return;
        }
        let _loc4_: CoreComponentContext = this._core instanceof CoreComponentContext ? this._core : null;
        let _loc8_: any[] = _loc4_.getLockedComponents();
        if (_loc8_.length == 0) {
            this.stopLockedComponentLogging();
            return;
        }
        let _loc3_: number = getTimer();
        let _loc5_: any = {};
        for (const _loc1_ of _loc8_ ?? []) {
            _loc6_ = getQualifiedClassName(_loc1_);
            _loc10_ = _loc1_.requiredDependencyIids;
            _loc2_ = stringOrNull(_loc10_ != null && _loc10_.length > 0 ? _loc10_.join(", ") : "dependencies to finish");
            _loc7_ = this._lockedComponentReports[_loc6_];
            if (!_loc7_) {
                _loc7_ = { "firstSeen": _loc3_, "lastReport": 0, "description": _loc2_ };
                this._lockedComponentReports[_loc6_] = _loc7_;
            } else if (_loc7_.description != _loc2_) {
                Logger.log("[CoreInit] Component " + _loc6_ + " dependency wait updated to: " + _loc2_);
                _loc7_.description = _loc2_;
                _loc7_.lastReport = 0;
            }
            _loc5_[_loc6_] = true;
            if (_loc3_ - _loc7_.firstSeen >= 10000 && _loc3_ - _loc7_.lastReport >= 10000) {
                Logger.log("[CoreInit] Component " + _loc6_ + " still locked after " + ((_loc3_ - _loc7_.firstSeen) / 1000).toFixed(1) + "s, waiting for: " + _loc2_);
                _loc7_.lastReport = _loc3_;
            }
        }
        for (const _loc9_ of keysOf(this._lockedComponentReports)) {
            if (!_loc5_[_loc9_]) {
                delete this._lockedComponentReports[_loc9_];
            }
        }
    };

    private onLocalizationComplete = (param1: Event): void => {
        HabboAir.trackLoginStep("client.init.localization.loaded");
        this._completedInitSteps = this._completedInitSteps + 1;
        this.updateProgressBar();
    };

    private onConfigurationComplete = (param1: IID, param2: Component): void => {
        HabboAir.trackLoginStep("client.init.config.loaded");
        this._completedInitSteps = this._completedInitSteps + 1;
        this.updateProgressBar();
    };

    private onRoomEngineReady = (param1: Event): void => {
        this._SafeStr_5915 = true;
        HabboAir.trackLoginStep("client.init.room.ready");
        if (this._core.getInteger("spaweb", 0) == 1) {
            this.startSendingHeartBeat();
        }
    };

    private startSendingHeartBeat(): void {
        this.sendHeartBeat();
        setInterval(this.sendHeartBeat, 10000);
    }

    private sendHeartBeat = (): void => {
        HabboWebTools.sendHeartBeat();
    };

    private onCoreRunning = (param1: Event): void => {
        this._coreRunning = true;
        HabboAir.trackLoginStep("client.init.core.running");
        this._completedInitSteps = this._completedInitSteps + 1;
        this.updateProgressBar();
    };

    private disposeLoadingScreen(): void {
        this.stopLockedComponentLogging();
        if (this._loadingScreen != null) {
            this._loadingScreen.dispose();
            if (castTo(this._loadingScreen, DisplayObject).parent) {
                castTo(this._loadingScreen, DisplayObject).parent.removeChild(castTo(this._loadingScreen, DisplayObject));
            }
            this._loadingScreen = null;
        }
        let _loc1_: IEventDispatcher = this.getCoreEventDispatcher();
        if (_loc1_ != null) {
            _loc1_.removeEventListener("COMPONENT_EVENT_RUNNING", this.onCoreRunning);
        }
    }

    private get ssoTokenAvailable(): boolean {
        let _loc1_: string = stringOrNull(this._arguments.get("sso.token"));
        return _loc1_ != null && _loc1_.length > 0;
    }
}

class HabboCoreErrorReporter implements ICoreErrorReporter {
    declare private _logger: ICoreErrorLogger;

    constructor() {
    }

    public logError(param1: string, param2: boolean, param3: number = -1, param4: Error = null): void {
        HabboAir.reportCrash(param1, param3, param2, param4, this._logger);
    }

    public set errorLogger(param1: ICoreErrorLogger) {
        this._logger = param1;
    }
}
