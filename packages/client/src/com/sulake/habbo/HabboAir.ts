import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICore } from '@/com/sulake/core/runtime/ICore';
import type { ICoreErrorLogger } from '@/com/sulake/core/runtime/ICoreErrorLogger';
import type { ICoreErrorReporter } from '@/com/sulake/core/runtime/ICoreErrorReporter';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IHabboLoadingScreen } from '@/com/sulake/habbo/IHabboLoadingScreen';
import { NativeApplication } from '@habbo-pixi/runtime/desktop/NativeApplication';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { MovieClip } from '@habbo-pixi/runtime/display/MovieClip';
import { StageAlign } from '@habbo-pixi/runtime/display/StageAlign';
import { StageQuality } from '@habbo-pixi/runtime/display/StageQuality';
import { StageScaleMode } from '@habbo-pixi/runtime/display/StageScaleMode';
import { BrowserInvokeEvent } from '@habbo-pixi/runtime/events/BrowserInvokeEvent';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { InvokeEvent } from '@habbo-pixi/runtime/events/InvokeEvent';
import { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import { SecurityErrorEvent } from '@habbo-pixi/runtime/events/SecurityErrorEvent';
import { UncaughtErrorEvent } from '@habbo-pixi/runtime/events/UncaughtErrorEvent';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { URLRequestHeader } from '@habbo-pixi/runtime/net/URLRequestHeader';
import { URLRequestMethod } from '@habbo-pixi/runtime/net/URLRequestMethod';
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
import { Component, Core, CoreComponentContext } from '@/com/sulake/core/runtime/Component.group';
import { ErrorEvent } from '@/com/sulake/core/runtime/events/ErrorEvent';
import { isIContext } from '@/com/sulake/core/runtime/IContext';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { MouseWheelEnabler } from '@/com/sulake/core/utils/MouseWheelEnabler';
import { HabboAvatarEditorCom } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager.group';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
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
import { LoginStep } from '@/com/sulake/habbo/LoginStep';
import { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import { RoomManagerLib } from '@/com/sulake/habbo/RoomManagerLib';
import { RoomSpriteRendererLib } from '@/com/sulake/habbo/RoomSpriteRendererLib';
import { SiteLockValidator } from '@/com/sulake/habbo/SiteLockValidator';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { PlatformData } from '@/com/sulake/habbo/utils/PlatformData';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { SimpleLogger } from '@/debug/SimpleLogger';
import { LoginFlow } from '@/login/LoginFlow';

export class HabboAir extends MovieClip {
    static { registerClassName(this, 'HabboAir'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboAir.#initStatics();
        return HabboAir._log;
    }

    public static readonly CORE_RATIO: number = 0.6;
    private static readonly INIT_STEPS: number = 3;
    public static readonly ERROR_VARIABLE_IS_FATAL: string = "is_fatal";
    public static readonly ERROR_VARIABLE_CLIENT_CRASH_TIME: string = "crash_time";
    public static readonly ERROR_VARIABLE_CONTEXT: string = "error_ctx";
    public static readonly ERROR_VARIABLE_FLASH_VERSION: string = "flash_version";
    public static readonly ERROR_VARIABLE_AVERAGE_UPDATE_INTERVAL: string = "avg_update";
    public static readonly ERROR_VARIABLE_DEBUG: string = "debug";
    public static readonly ERROR_VARIABLE_DESCRIPTION: string = "error_desc";
    public static readonly ERROR_VARIABLE_CATEGORY: string = "error_cat";
    public static readonly ERROR_VARIABLE_DATA: string = "error_data";
    private static readonly LOCKED_COMPONENT_LOG_INTERVAL_MS: number = 2000;
    private static readonly LOCKED_COMPONENT_LOG_WARNING_DELAY_MS: number = 10000;
    private static readonly DEFAULT_CRASH_URL: string = "https://www.habbo.com/api/log/crash";
    private static readonly SANDBOX_CRASH_URL: string = "https://sandbox.habbo.com/api/log/crash";
    private static readonly S2_ENVIRONMENT_ID: string = "s2";
    private static readonly ARGUMENT_ENVIRONMENT: string = "server";
    private static readonly ARGUMENT_SSO_TOKEN: string = "ticket";
    private static readonly REFRESH_PERIOD_IN_MILLIS: number = 15000;
    private static readonly HEARTBEAT_INTERVAL_MS: number = 10000;
    private static readonly BYTES_PER_MEGABYTE: number = 1048576;
    private static readonly MAX_ERROR_DETAIL_LENGTH: number = 220;
    private static readonly CLIENT_FATAL_ERROR_URL_PROPERTY: string = "client.fatal.error.url";
    private static readonly SPAWEB_PROPERTY: string = "spaweb";
    private static readonly ENVIRONMENT_SOL_KEY: string = "environment";
    private static readonly JSON_CONTENT_TYPE: string = "application/json";
    private static readonly LOGIN_STEP_FUNCTION: string = "FlashExternalInterface.logLoginStep";
    protected static PROCESSLOG_ENABLED: boolean = false;

    private static get _crashReportUrl(): string {
        HabboAir.#initStatics();
        return HabboAir._crashReportUrl;
    }
    private static set _crashReportUrl(value: string) {
        HabboAir.#initStatics();
        HabboAir._crashReportUrl = value;
    }

    private static _fatalCrashReported: boolean = false;
    private static _lastRequestTime: Date;

    declare private _loadingScreen: IHabboLoadingScreen;

    declare private _startTime: number;
    static { (this.prototype as any)._startTime = 0; }

    private _loginFlow: LoginFlow = null;

    declare private _stageReady: boolean;
    static { (this.prototype as any)._stageReady = false; }

    declare private _argumentsParsed: boolean;
    static { (this.prototype as any)._argumentsParsed = false; }

    private _loginFlowEnabled: boolean = true;

    declare private _core: ICore;

    private _totalProgressSteps: number = HabboAir.INIT_STEPS;
    private _loadedFiles: number = 0;
    private _completedInitSteps: number = 0;
    private _roomEngineReady: boolean = false;
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
        // site lock bypassed for now (development; restore to check the page's domain again):
        // let siteLockValidator: SiteLockValidator = new SiteLockValidator();
        // if (!siteLockValidator.validateDomain(this)) {
        //     return;
        // }
        this._lockedComponentReports = {};
        this._startTime = getTimer();
        this.stop();
        this._arguments = new Dictionary();
        if (this.stage) {
            this.onAddedToStage();
        } else {
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
        }
        NativeApplication.nativeApplication.addEventListener(InvokeEvent.INVOKE, this.onInvoke);
        NativeApplication.nativeApplication.addEventListener(BrowserInvokeEvent.BROWSER_INVOKE, this.onBrowserInvoke);
        NativeApplication.nativeApplication.addEventListener(Event.EXITING, this.onApplicationExiting);
    }

    public static trackLoginStep(step: string, detail: string = null): void {
        HabboAir._log.info("* HabboMain Login Step: " + step);
        if (HabboAir.PROCESSLOG_ENABLED) {
            try {
                if (ExternalInterface.available) {
                    if (detail != null) {
                        ExternalInterface.call(HabboAir.LOGIN_STEP_FUNCTION, step, detail);
                    } else {
                        ExternalInterface.call(HabboAir.LOGIN_STEP_FUNCTION, step);
                    }
                } else {
                    HabboAir._log.debug("ExternalInterface is not available, tracking is disabled");
                }
            } catch (e) {
            }
        }
    }

    public static reportCrash(description: string, category: number, critical: boolean, error: Error = null, errorLogger: ICoreErrorLogger = null): void {
        let stackTrace: string = error == null ? "" : error.stack;
        HabboAir.reportCrashStack(description, category, critical, stackTrace, errorLogger);
    }

    public static reportCrashStack(description: string, category: number, critical: boolean, stackTrace: string, errorLogger: ICoreErrorLogger = null): void {
        if (HabboAir._lastRequestTime != null && HabboAir._lastRequestTime.getTime() + HabboAir.REFRESH_PERIOD_IN_MILLIS > new Date().getTime()) {
            return;
        }
        HabboAir._lastRequestTime = new Date();
        let report: any = {};
        report[HabboAir.ERROR_VARIABLE_CLIENT_CRASH_TIME] = new Date().getTime().toString();
        report[HabboAir.ERROR_VARIABLE_IS_FATAL] = critical.toString();
        report[HabboAir.ERROR_VARIABLE_CONTEXT] = "";
        report[HabboAir.ERROR_VARIABLE_FLASH_VERSION] = Capabilities.version;
        report[HabboAir.ERROR_VARIABLE_AVERAGE_UPDATE_INTERVAL] = 0;
        report[HabboAir.ERROR_VARIABLE_DESCRIPTION] = description;
        report[HabboAir.ERROR_VARIABLE_CATEGORY] = String(category);
        if (stackTrace != "") {
            report[HabboAir.ERROR_VARIABLE_DATA] = stackTrace;
        }
        report[HabboAir.ERROR_VARIABLE_DEBUG] = "Memory usage: " + Math.round(System.totalMemory / HabboAir.BYTES_PER_MEGABYTE) + " MB";
        let parameterNames: any[] = ErrorReportStorage.getParameterNames();
        let parameterCount: number = parameterNames.length | 0;
        for (let i: number = 0; i < parameterCount; i++) {
            report[parameterNames[i]] = ErrorReportStorage.getParameter(stringOrNull(parameterNames[i]));
        }
        report[HabboAir.ERROR_VARIABLE_DEBUG] = ErrorReportStorage.getDebugData();
        if (critical) {
            if (!HabboAir._fatalCrashReported) {
                HabboAir._fatalCrashReported = true;
            }
        }
        let request: URLRequest = new URLRequest(HabboAir._crashReportUrl);
        request.method = URLRequestMethod.POST;
        request.requestHeaders.push(new URLRequestHeader("Content-Type", HabboAir.JSON_CONTENT_TYPE));
        try {
            request.data = JSON.stringify(report);
            let loader: URLLoader = new URLLoader();
            loader.addEventListener(IOErrorEvent.IO_ERROR, HabboAir.onCrashReportError);
            loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, HabboAir.onCrashReportError);
            loader.load(request);
        } catch (e) {
            HabboAir._log.warn("Error while sending error report: " + e.message);
        }
    }

    private static onCrashReportError(event: Event): void {
        HabboAir._log.debug("Crash report upload failed: " + event);
    }

    private get ssoTokenAvailable(): boolean {
        let ssoToken: string = stringOrNull(this._arguments.get(HabboProperty.SSO_TOKEN));
        return ssoToken != null && ssoToken.length > 0;
    }

    public createLoadingScreen(): void {
        this._loadingScreen = new HabboLoadingScreen(this.stage.stageWidth, this.stage.stageHeight, this.clone(this._arguments));
        this.updateLoadingBarProgress();
        this.stage.addChild(castTo(this._loadingScreen, DisplayObject));
    }

    public unloading = (): void => {
        let coreEvents: IEventDispatcher = null;
        try {
            if (this._core && !this._core.disposed) {
                ErrorReportStorage.addDebugData("Unload", "Client unloading started");
                coreEvents = this.getCoreEventDispatcher();
                if (coreEvents != null) {
                    coreEvents.dispatchEvent(new Event(Event.UNLOAD));
                }
            }
        } catch (error) {
        }
    };

    public onCoreError = (event: Event): void => {
        let message: string = "Unknown core error";
        let category: number = -1;
        let critical: boolean = false;
        let error: Error = null;
        let errorEvent: ErrorEvent = event instanceof ErrorEvent ? event : null;
        if (errorEvent != null) {
            message = errorEvent.message;
            category = errorEvent.category;
            critical = errorEvent.critical;
            error = errorEvent.error;
        }
        HabboAir._log.error("onCoreError type=" + event.type + " critical=" + critical + " category=" + category + " message=" + message);
        if (critical && this._loadingScreen != null && !this._loadingScreen.disposed) {
            this.showLoadingError(message, category);
        }
        if (critical) {
            HabboAir.reportCrash(message, category, true, error);
        }
    };

    protected onExitFrame = (event: Event = null): void => {
        try {
            if (this._prepareCoreOnNextFrame) {
                this._prepareCoreOnNextFrame = false;
                this.prepareCore();
                return;
            }
            if (this._roomEngineReady && this._coreRunning) {
                this.disposeLoadingScreen();
                this.removeEventListener(Event.EXIT_FRAME, this.onExitFrame);
            }
        } catch (e) {
            HabboAir._log.error("Unhandled exception in onExitFrame: " + (e instanceof Error ? e.message : String(e)), 0, e instanceof Error ? e : null);
        }
    };

    private parseArguments(args: any[]): void {
        let name: string = null;
        let value: string = null;
        this._arguments = new Dictionary();
        if (args && args.length) {
            let pairCount: number = args.length / 2 | 0;
            for (let pair: number = 0; pair < pairCount; pair++) {
                if (pair * 2 + 1 < args.length) {
                    name = stringOrNull(args[pair * 2]);
                    value = stringOrNull(args[pair * 2 + 1]);
                    name = name.replace("-", "");
                    if (name == HabboAir.ARGUMENT_ENVIRONMENT) {
                        value = value.replace("hh", "");
                        value = value.replace("br", "pt");
                        value = value.replace("us", "en");
                        this._arguments.set(HabboProperty.ENVIRONMENT_ID, value);
                        CommunicationUtils.writeSOLProperty(HabboAir.ENVIRONMENT_SOL_KEY, value);
                    }
                    if (name == HabboAir.ARGUMENT_SSO_TOKEN) {
                        this._arguments.set(HabboProperty.SSO_TOKEN, value);
                    }
                }
            }
        }
        this._argumentsParsed = true;
        this.tryInit();
    }

    private tryInit(): void {
        let clientFatalErrorUrl: string;
        let urlPrefix: string;
        if (!this._argumentsParsed || !this._stageReady) {
            return;
        }
        clientFatalErrorUrl = stringOrNull(this._arguments.get(HabboAir.CLIENT_FATAL_ERROR_URL_PROPERTY));
        if (clientFatalErrorUrl != null) {
            HabboAir._crashReportUrl = clientFatalErrorUrl;
        } else {
            urlPrefix = stringOrNull(this._arguments.get(HabboProperty.URL_PREFIX));
            if (urlPrefix != null) {
                HabboAir._crashReportUrl = urlPrefix + "/flash_client_error";
            }
        }
        if (this.isSandboxConnection()) {
            HabboAir._crashReportUrl = HabboAir.SANDBOX_CRASH_URL;
        }
        HabboAir.PROCESSLOG_ENABLED = this._arguments.get(HabboProperty.PROCESSLOG_ENABLED_KEY) == "1";
        HabboAir.trackLoginStep(LoginStep.CLIENT_START);
        this.stage.scaleMode = StageScaleMode.NO_SCALE;
        this.stage.quality = StageQuality.LOW;
        this.stage.align = StageAlign.TOP_LEFT;
        this.root.loaderInfo.uncaughtErrorEvents.addEventListener(UncaughtErrorEvent.UNCAUGHT_ERROR, (event: UncaughtErrorEvent): void => {
                HabboAir.reportCrash("Uncaught client error, eventType: " + event.type + " errorID: " + event.errorID + " runtime: " + (getTimer() - this._startTime) / 1000 + "s", Core.ERROR_UNCAUGHT_ERROR, true, event.error);
            });
        this.createLoginFlowOrLoadingScreen();
        this.startCoreInitializationIfPossible();
        MouseWheelEnabler.init(this.stage);
    }

    private isSandboxConnection(): boolean {
        let environmentId: string = stringOrNull(this._arguments.get(HabboProperty.ENVIRONMENT_ID));
        return environmentId != null && environmentId.toLowerCase() == HabboAir.S2_ENVIRONMENT_ID;
    }

    private clone(source: Map<any, any>): Map<any, any> {
        let result: Map<any, any> = new Dictionary();
        for (const key of source?.keys() ?? []) {
            if (source.get(key) instanceof Map) {
                result.set(key, this.clone(source.get(key)));
            } else {
                result.set(key, source.get(key));
            }
        }
        return result;
    }

    private createLoginFlowOrLoadingScreen(): void {
        if (!this.ssoTokenAvailable && this._loginFlowEnabled) {
            this._loginFlow = new LoginFlow(this.clone(this._arguments));
            this._loginFlow.addEventListener(LoginFlow.LOGIN_FLOW_FINISHED_EVENT, this.onLoginFlowFinished);
            this.stage.addChild(this._loginFlow);
            this._loginFlow.init();
            this.updateLoadingBarProgress();
            return;
        }
        this.createLoadingScreen();
    }

    private updateLoadingBarProgress(): void {
        if (this._loadingScreen != null) {
            this._loadingScreen.updateLoadingBar(HabboAir.CORE_RATIO);
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
        HabboAir.trackLoginStep(LoginStep.SWF_LOADED);
        this.logApplicationInfo();
        HabboAir._log.info(getQualifiedClassName(Core) + " version: " + Core.version);
        this.addEventListener(Event.EXIT_FRAME, this.onExitFrame);
        this._prepareCoreOnNextFrame = true;
    }

    private logApplicationInfo(): void {
        if (this._applicationInfoLogged) {
            return;
        }
        this._applicationInfoLogged = true;
        let descriptor: XML = NativeApplication.nativeApplication.applicationDescriptor;
        let descriptorNs: Namespace = descriptor.namespace();
        let copyright: string = descriptor.child(new QName(descriptorNs, "copyright")).toString();
        let versionLabel: string = descriptor.child(new QName(descriptorNs, "versionLabel")).toString();
        let versionNumber: string = descriptor.child(new QName(descriptorNs, "versionNumber")).toString();
        HabboAir._log.info("AIR Runtime version: " + NativeApplication.nativeApplication.runtimeVersion);
        HabboAir._log.info("Application ID: " + NativeApplication.nativeApplication.applicationID);
        HabboAir._log.info("Copyright: " + copyright);
        HabboAir._log.info("Version: " + versionLabel);
        HabboAir._log.info("VersionNumber: " + versionNumber);
    }

    private prepareCore(): void {
        let errorReporter: ICoreErrorReporter = null;
        let coreEvents: IEventDispatcher = null;
        let config: XML = null;
        try {
            errorReporter = Capabilities.playerType != "StandAlone" ? new HabboCoreErrorReporter() : null;
            this._core = Core.instantiate(this.stage, 1, errorReporter, this._arguments);
            coreEvents = this.getCoreEventDispatcher();
            if (coreEvents != null) {
                coreEvents.addEventListener(Component.COMPONENT_EVENT_ERROR, this.onCoreError);
                coreEvents.addEventListener(Component.COMPONENT_EVENT_REBOOT, this.onCoreReboot);
            }
            this._core.prepareComponent(HabboTrackingLib);
            this.addEventListener(ProgressEvent.PROGRESS, this.onProgressEvent);
            this.addEventListener(Event.COMPLETE, this.onCompleteEvent);
            config = new XML(`<config>
                    <asset-libraries>
                        <library url="hh_human_body.swf"/>
                        <library url="hh_human_item.swf"/>
                    </asset-libraries>
                    <service-libraries/>
                    <component-libraries/>
                </config>`);
            config = new XML();
            this._core.readConfigDocument(config, this);
            (this._core instanceof CoreComponentContext ? this._core : null).fileProxy = new FileProxy();
            if (PlatformData.nativeApplicationProxy) {
                PlatformData.nativeApplicationProxy.dispose();
            }
            PlatformData.nativeApplicationProxy = new NativeApplicationProxy();
            this._totalProgressSteps = this._core.getNumberOfFilesPending() + this._core.getNumberOfFilesLoaded() + HabboAir.INIT_STEPS;
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
            HabboAir.trackLoginStep(LoginStep.CORE_ERROR);
            HabboAir.reportCrash("Failed to prepare the core: " + error.message, Core.ERROR_CATEGORY_INITIALIZE_CORE, true, error);
            this.showLoadingError("Failed to prepare the core: " + error.message, Core.ERROR_CATEGORY_INITIALIZE_CORE);
            Core.dispose();
        }
    }

    private updateProgressBar(): void {
        let progress: number = NaN;
        if (this._loadingScreen != null) {
            progress = HabboAir.CORE_RATIO + (this._completedInitSteps + this._loadedFiles) / this._totalProgressSteps * (1 - HabboAir.CORE_RATIO);
            this._loadingScreen.updateLoadingBar(progress);
        }
    }

    private initializeCore(): void {
        HabboAir.trackLoginStep(LoginStep.CORE_INIT);
        try {
            this._core.initialize();
            if (ExternalInterface.available) {
                ExternalInterface.addCallback("unloading", this.unloading);
            }
        } catch (error) {
            HabboAir.trackLoginStep(LoginStep.CORE_ERROR);
            this.showLoadingError("Failed to initialize the core: " + error.message, Core.ERROR_CATEGORY_INITIALIZE_CORE);
            Core.crash("Failed to initialize the core: " + error.message, Core.ERROR_CATEGORY_INITIALIZE_CORE, error);
        }
    }

    private showLoadingError(message: string, category: number = -1): void {
        this.removeEventListener(Event.EXIT_FRAME, this.onExitFrame);
        this.removeEventListener(ProgressEvent.PROGRESS, this.onProgressEvent);
        this.removeEventListener(Event.COMPLETE, this.onCompleteEvent);
        this.stopLockedComponentLogging();
        this._prepareCoreOnNextFrame = false;
        this._coreInitializationStarted = false;
        if (this._loadingScreen != null && !this._loadingScreen.disposed) {
            this._loadingScreen.showError(this.formatLoadingErrorMessage(message, category));
        }
    }

    private formatLoadingErrorMessage(message: string, category: number): string {
        let text: string = null;
        let details: string = null;
        let trimmed: string = message == null ? "" : message.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
        let lowerCase: string = trimmed.toLowerCase();
        if (category == Core.ERROR_CATEGORY_DOWNLOAD_LOCALIZATION || category == Core.ERROR_CATEGORY_PRODUCT_DATA || lowerCase.indexOf("gamedata") > -1 || lowerCase.indexOf("product data") > -1 || lowerCase.indexOf("localization") > -1) {
            text = "Failed to download required game data.\nPlease check your connection and restart the client.";
        } else if (category == Core.ERROR_CATEGORY_DOWNLOAD_LIBRARY || category == Core.ERROR_CATEGORY_COMPONENT_RESOURCE_LOAD_ERROR || lowerCase.indexOf("download") > -1) {
            text = "Failed to download required client libraries.\nPlease check your connection and restart the client.";
        } else {
            text = "Client startup failed.\nPlease restart the client.";
        }
        if (trimmed != "") {
            details = trimmed;
            if (details.length > HabboAir.MAX_ERROR_DETAIL_LENGTH) {
                details = details.substr(0, HabboAir.MAX_ERROR_DETAIL_LENGTH) + "...";
            }
            text += "\n\nDetails: " + details;
        }
        return text;
    }

    private getCoreEventDispatcher(): IEventDispatcher {
        let context: IContext = isIContext(this._core) ? this._core : null;
        return context != null ? context.events : null;
    }

    private shutdownCore(): void {
        if (this._coreShutDown) {
            return;
        }
        this._coreShutDown = true;
        this.stopLockedComponentLogging();
        this.unloading();
        NativeApplication.nativeApplication.removeEventListener(Event.EXITING, this.onApplicationExiting);
        let coreEvents: IEventDispatcher = this.getCoreEventDispatcher();
        if (coreEvents != null) {
            coreEvents.removeEventListener(Component.COMPONENT_EVENT_ERROR, this.onCoreError);
            coreEvents.removeEventListener(Component.COMPONENT_EVENT_REBOOT, this.onCoreReboot);
            coreEvents.removeEventListener(Component.COMPONENT_EVENT_RUNNING, this.onCoreRunning);
        }
        Core.dispose();
        this._core = null;
    }

    private simpleQueueInterface(identifier: IID, callback: (...args: any[]) => any): void {
        let existing: any = this._core.queueInterface(identifier, callback);
        if (existing != null) {
            callback(identifier, existing);
        }
    }

    private addInitializationProgressListeners(): void {
        let coreEvents: IEventDispatcher;
        this.simpleQueueInterface(new IIDHabboLocalizationManager(), (identifier: IID, component: Component): void => {
                component.events.addEventListener(Event.COMPLETE, this.onLocalizationComplete);
            });
        this.simpleQueueInterface(new IIDHabboConfigurationManager(), this.onConfigurationComplete);
        this.simpleQueueInterface(new IIDRoomEngine(), (identifier: IID, component: Component): void => {
                component.events.addEventListener(RoomEngineEvent.ROOM_ENGINE_INITIALIZED, this.onRoomEngineReady);
            });
        coreEvents = this.getCoreEventDispatcher();
        if (coreEvents != null) {
            coreEvents.addEventListener(Component.COMPONENT_EVENT_RUNNING, this.onCoreRunning);
        }
    }

    private startLockedComponentLogging(): void {
        if (this._lockedComponentLogIntervalId != 0) {
            return;
        }
        if (!(this._core instanceof CoreComponentContext)) {
            return;
        }
        this._lockedComponentLogIntervalId = setInterval(this.logLockedComponents, HabboAir.LOCKED_COMPONENT_LOG_INTERVAL_MS) | 0;
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
        let className: string = null;
        let requiredIids: string[] = null;
        let description: string = null;
        let report: any = null;
        if (!(this._core instanceof CoreComponentContext)) {
            this.stopLockedComponentLogging();
            return;
        }
        let context: CoreComponentContext = this._core instanceof CoreComponentContext ? this._core : null;
        let lockedComponents: any[] = context.getLockedComponents();
        if (lockedComponents.length == 0) {
            this.stopLockedComponentLogging();
            return;
        }
        let now: number = getTimer();
        let stillLocked: any = {};
        for (const component of lockedComponents ?? []) {
            className = getQualifiedClassName(component);
            requiredIids = component.requiredDependencyIids;
            description = requiredIids != null && requiredIids.length > 0 ? requiredIids.join(", ") : "dependencies to finish";
            report = this._lockedComponentReports[className];
            if (!report) {
                report = { "firstSeen": now, "lastReport": 0, "description": description };
                this._lockedComponentReports[className] = report;
            } else if (report.description != description) {
                HabboAir._log.debug("[CoreInit] Component " + className + " dependency wait updated to: " + description);
                report.description = description;
                report.lastReport = 0;
            }
            stillLocked[className] = true;
            if (now - report.firstSeen >= HabboAir.LOCKED_COMPONENT_LOG_WARNING_DELAY_MS && now - report.lastReport >= HabboAir.LOCKED_COMPONENT_LOG_WARNING_DELAY_MS) {
                HabboAir._log.debug("[CoreInit] Component " + className + " still locked after " + ((now - report.firstSeen) / 1000).toFixed(1) + "s, waiting for: " + description);
                report.lastReport = now;
            }
        }
        for (const reportedClassName of keysOf(this._lockedComponentReports)) {
            if (!stillLocked[reportedClassName]) {
                delete this._lockedComponentReports[reportedClassName];
            }
        }
    };

    private onConfigurationComplete = (identifier: IID, component: Component): void => {
        HabboAir.trackLoginStep(LoginStep.CONFIG_LOADED);
        this._completedInitSteps = this._completedInitSteps + 1;
        this.updateProgressBar();
    };

    private startSendingHeartBeat(): void {
        this.sendHeartBeat();
        setInterval(this.sendHeartBeat, HabboAir.HEARTBEAT_INTERVAL_MS);
    }

    private sendHeartBeat = (): void => {
        HabboWebTools.sendHeartBeat();
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
        let coreEvents: IEventDispatcher = this.getCoreEventDispatcher();
        if (coreEvents != null) {
            coreEvents.removeEventListener(Component.COMPONENT_EVENT_RUNNING, this.onCoreRunning);
        }
    }

    private onBrowserInvoke = (event: BrowserInvokeEvent): void => {
        HabboAir._log.info("Received Browser Invoke: " + event.arguments);
        NativeApplication.nativeApplication.removeEventListener(BrowserInvokeEvent.BROWSER_INVOKE, this.onBrowserInvoke);
        this.parseArguments(event.arguments);
    };

    private onInvoke = (event: InvokeEvent): void => {
        NativeApplication.nativeApplication.removeEventListener(InvokeEvent.INVOKE, this.onInvoke);
        this.parseArguments(event.arguments);
    };

    private onAddedToStage = (event: Event = null): void => {
        this.removeEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
        this._stageReady = true;
        this.tryInit();
    };

    private onLoginFlowFinished = (event: Event): void => {
        this._arguments.set(HabboProperty.SSO_TOKEN, this._loginFlow.ssoToken);
        this._arguments.set(HabboProperty.ENVIRONMENT_ID, CommunicationUtils.readSOLString(HabboAir.ENVIRONMENT_SOL_KEY));
        this._loginFlow.removeEventListener(LoginFlow.LOGIN_FLOW_FINISHED_EVENT, this.onLoginFlowFinished);
        this._loginFlow.dispose();
        this._loginFlow = null;
        this._loadingScreen = null;
        this.createLoadingScreen();
        this.startCoreInitializationIfPossible();
    };

    private onProgressEvent = (event: ProgressEvent): void => {
        this._loadedFiles = this._core.getNumberOfFilesLoaded() | 0;
        this.updateProgressBar();
    };

    private onCompleteEvent = (event: Event): void => {
        this.removeEventListener(ProgressEvent.PROGRESS, this.onProgressEvent);
        this.removeEventListener(Event.COMPLETE, this.onCompleteEvent);
        this.initializeCore();
    };

    private onApplicationExiting = (event: Event): void => {
        this.shutdownCore();
    };

    private onCoreReboot = (event: Event): void => {
        HabboAir._log.info("Reboot application! " + [System.privateMemory, System.totalMemory, System.totalMemoryNumber].join(","));
        this.shutdownCore();
        HabboAir._log.info("Application ready for restart! " + [System.privateMemory, System.totalMemory, System.totalMemoryNumber].join(","));
        NativeApplication.nativeApplication.exit(1);
    };

    private onLocalizationComplete = (event: Event): void => {
        HabboAir.trackLoginStep(LoginStep.LOCALIZATION_LOADED);
        this._completedInitSteps = this._completedInitSteps + 1;
        this.updateProgressBar();
    };

    private onRoomEngineReady = (event: Event): void => {
        this._roomEngineReady = true;
        HabboAir.trackLoginStep(LoginStep.ROOM_ENGINE_READY);
        if (this._core.getInteger(HabboAir.SPAWEB_PROPERTY, 0) == 1) {
            this.startSendingHeartBeat();
        }
    };

    private onCoreRunning = (event: Event): void => {
        this._coreRunning = true;
        HabboAir.trackLoginStep(LoginStep.CORE_RUNNING);
        this._completedInitSteps = this._completedInitSteps + 1;
        this.updateProgressBar();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboAir.#staticsReady) return;
        HabboAir.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboAir, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_crashReportUrl", null);
        set("_log", new SimpleLogger("HabboAir"));
        set("_crashReportUrl", HabboAir.DEFAULT_CRASH_URL);
    }
}

class HabboCoreErrorReporter implements ICoreErrorReporter {
    declare private _logger: ICoreErrorLogger;

    public set errorLogger(value: ICoreErrorLogger) {
        this._logger = value;
    }

    public logError(message: string, critical: boolean, category: number = -1, error: Error = null): void {
        HabboAir.reportCrash(message, category, critical, error, this._logger);
    }
}
