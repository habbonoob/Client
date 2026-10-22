import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IHabboConfigurationManager } from '@/com/sulake/habbo/configuration/IHabboConfigurationManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Security } from '@habbo-pixi/runtime/system/Security';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import { TextAsset } from '@/com/sulake/core/assets/TextAsset';
import { AssetLibrary, AssetLoaderStruct, Component, Core } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { isICore } from '@/com/sulake/core/runtime/ICore';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { HabboConfigurationEvent } from '@/com/sulake/habbo/configuration/enum/HabboConfigurationEvent';
import { HabboConfigurationFlags } from '@/com/sulake/habbo/configuration/enum/HabboConfigurationFlags';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HabboConfigurationManager extends Component implements ICoreConfiguration, IHabboConfigurationManager {
    static { registerClassName(this, 'com.sulake.habbo.configuration::HabboConfigurationManager'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboConfigurationManager.#initStatics();
        return HabboConfigurationManager._log;
    }

    private static readonly INTERPOLATION_DEPTH_LIMIT: number = 3;
    private static readonly REPLACE_CHAR: string = "%";
    private static readonly MAX_PARAM_REPLACEMENTS: number = 10;
    private static readonly ENVIRONMENT_SOL_KEY: string = "environment";
    private static readonly READONLY_PROPERTY: string = "configuration.readonly";
    private static readonly COMMON_CONFIGURATION_ASSET: string = "common_configuration";
    private static readonly LOCALIZATION_CONFIGURATION_ASSET: string = "localization_configuration";

    private static get ENVIRONMENT_SPECIFIC_PROPERTIES(): string[] {
        HabboConfigurationManager.#initStatics();
        return HabboConfigurationManager.ENVIRONMENT_SPECIFIC_PROPERTIES;
    }

    declare private _skipExternalVariables: boolean;

    declare private _skipLocalizations: boolean;

    declare private _properties: Map<any, any>;

    declare private _initialized: boolean;

    declare private _readOnlyProperties: any[];

    declare private _useHttps: boolean;

    declare private _environmentId: string;

    declare private _localization: IHabboLocalizationManager;

    constructor(context: IContext, flags: number = 0, assetLibrary: IAssetLibrary = null) {
        super(context, flags, assetLibrary);
        context.configuration = this;
        this._skipExternalVariables = (flags & HabboConfigurationFlags.SKIP_EXTERNAL_VARIABLES) > 0;
        this._skipLocalizations = (flags & HabboConfigurationFlags.SKIP_LOCALIZATIONS) > 0;
        this.lock();
        this.resetAll();
        if (!this.propertyExists(HabboProperty.ENVIRONMENT_ID) && CommunicationUtils.propertyExists(HabboConfigurationManager.ENVIRONMENT_SOL_KEY)) {
            this.updateEnvironmentId(CommunicationUtils.readSOLString(HabboConfigurationManager.ENVIRONMENT_SOL_KEY));
        }
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboLocalizationManager(), (localization: IHabboLocalizationManager): void => {
                this._localization = localization;
            }, false, [{ "type": Event.COMPLETE, "callback": this.onLocalizationComplete }])]);
    }

    private onLocalizationComplete(event: Event): void {
        this.initConfigurationDownload();
    }

    public updateEnvironmentId(environmentId: string): void {
        if (this._environmentId != environmentId) {
            this._environmentId = environmentId;
            this.setProperty(HabboProperty.ENVIRONMENT_ID, environmentId);
            AssetLibrary.setCacheNamespace(environmentId);
            this.updateEnvironmentVariables();
        }
        this.initEmbeddedConfigurations();
        this.setDefaults();
    }

    public resetAll(): void {
        this._initialized = false;
        this._properties = new Dictionary();
        this._readOnlyProperties = [];
        this.parseDevelopmentVariables();
        this.parseCommonVariables();
        this.parseLocalizationVariables();
        this.setProperty(HabboProperty.CLIENT_URL, "app:/");
        this.parseArguments();
        this.setDefaults();
        this.updateEnvironmentVariables();
        if (!this.propertyExists(HabboProperty.ENVIRONMENT_ID)) {
            this.initEmbeddedConfigurations();
        }
        if (!this._initialized && this._skipExternalVariables) {
            this._initialized = true;
            this.unlock();
            this.events.dispatchEvent(new Event(Event.COMPLETE));
        } else if (!this._initialized && this._skipLocalizations) {
            this.initConfigurationDownload();
        }
    }

    public isInitialized(): boolean {
        return this._initialized;
    }

    private updateEnvironmentVariables(): void {
        let value: string = null;
        let environmentKey: string = null;
        let environmentValue: string = null;
        for (const key of HabboConfigurationManager.ENVIRONMENT_SPECIFIC_PROPERTIES ?? []) {
            value = this.getProperty(key);
            environmentKey = key + "." + this._environmentId;
            if (this.propertyExists(environmentKey)) {
                environmentValue = this.getProperty(environmentKey);
                this.setProperty(key, environmentValue);
            } else {
                this.setProperty(key, value);
            }
        }
    }

    public override propertyExists(key: string): boolean {
        let value: string = asGuarded(this._properties.get(key), isString);
        return value != null;
    }

    public override getProperty(key: string, params: Map<any, any> = null): string {
        let value: string = asGuarded(this._properties.get(key), isString);
        value = this.interpolate(value);
        if (value == null) {
            return "";
        }
        if (value.substr(0, 2) == "//") {
            value = (this._useHttps ? "https:" : "http:") + value;
        }
        value = this.updateUrlProtocol(value);
        if (params != null) {
            value = this.fillParams(value, params);
        }
        return value;
    }

    public override setProperty(key: string, value: string, readOnly: boolean = false, logIfNew: boolean = false): void {
        if (logIfNew) {
            if (this._properties.get(key) == null) {
                HabboConfigurationManager._log.info(key + "=" + value);
            }
        }
        if (key == HabboProperty.ENVIRONMENT_ID) {
            this._environmentId = value;
            AssetLibrary.setCacheNamespace(value);
        }
        if (this._readOnlyProperties.indexOf(key) < 0 || readOnly) {
            this._properties.set(key, value);
        }
        if (readOnly) {
            this._readOnlyProperties.push(key);
        }
    }

    public override getBoolean(key: string): boolean {
        let value: string = asGuarded(this._properties.get(key), isString);
        if (value == null) {
            return false;
        }
        return value == "1" || value.toLowerCase() == "true";
    }

    public override getInteger(key: string, defaultValue: number): number {
        let value: string = asGuarded(this._properties.get(key), isString);
        if (value == null) {
            return defaultValue;
        }
        return Number(value) | 0;
    }

    public override updateUrlProtocol(url: string): string {
        let result: string = url;
        if (this._useHttps) {
            result = url.replace("http://", "https://");
            result = result.replace(":8090/", ":8443/");
        }
        return result;
    }

    public override interpolate(value: string): string {
        let lastIndex: number = 0;
        let result: string = null;
        let match: any = null;
        if (value == null) {
            return null;
        }
        let source: string = value;
        let pattern: RegExp = /\${([^}]*)}/g;
        for (let depth: number = 0; depth < HabboConfigurationManager.INTERPOLATION_DEPTH_LIMIT; depth++) {
            lastIndex = 0;
            result = "";
            while (true) {
                match = pattern.exec(source);
                if (match == null) {
                    break;
                }
                if (!this.propertyExists(stringOrNull(match[1]))) {
                    return null;
                }
                result += source.substring(lastIndex, Number(match.index));
                result += this.getProperty(stringOrNull(match[1]));
                lastIndex = match.index + match[0].length | 0;
            }
            result += source.substring(lastIndex);
            if (result == source) {
                break;
            }
            source = result;
        }
        return result;
    }

    public initConfigurationDownload(): void {
        let request: URLRequest = null;
        let url: string = null;
        this._initialized = false;
        let assetName: string = this._localization == null ? this.getProperty(HabboProperty.EXTERNAL_VARIABLES) : "variables_" + this._localization.getActiveEnvironmentId().toLowerCase() + "_" + this._localization.getExternalVariablesHash();
        if (this.assets.hasAsset(assetName)) {
            this.assets.removeAsset(this.assets.getAssetByName(assetName));
        }
        let loader: AssetLoaderStruct = null;
        if (this._localization == null) {
            request = new URLRequest(assetName);
            loader = this.assets.loadAssetFromFile(assetName, request, "text/plain");
        } else {
            url = this._localization.getExternalVariablesUrl() + "/" + this._localization.getExternalVariablesHash();
            loader = this.assets.loadAssetFromFile(assetName, new URLRequest(url), "text/plain");
        }
        loader.addEventListener(AssetLoaderEvent.ASSET_LOADER_EVENT_COMPLETE, this.onInitConfiguration);
        loader.addEventListener(AssetLoaderEvent.ASSET_LOADER_EVENT_ERROR, this.onConfigurationError);
    }

    private parseConfiguration(configuration: string): void {
        let parts: any[] = null;
        let key: string = null;
        let value: string = null;
        let lineBreakPattern: RegExp = /\n\r{1,}|\n{1,}|\r{1,}/gm;
        let trimPattern: RegExp = /^\s+|\s+$/g;
        let lines: any[] = configuration.split(lineBreakPattern);
        let readOnly: boolean = false;
        for (const line of lines ?? []) {
            if (!(line.substr(0, 1) == "#" || line == "")) {
                parts = line.split("=");
                if (parts.length >= 2 && parts[0].length > 0 && parts[1].length > 0) {
                    key = stringOrNull(parts.shift());
                    value = parts.join("=");
                    key = key.replace(trimPattern, "");
                    value = value.replace(trimPattern, "");
                    if (key == HabboConfigurationManager.READONLY_PROPERTY && value == "true") {
                        readOnly = true;
                    }
                    this.setProperty(key, value, readOnly);
                }
            }
        }
    }

    private initEmbeddedConfigurations(): void {
        let suffixIndex: number = 0;
        let baseKey: string = null;
        let value: string = null;
        let environmentId: string = CommunicationUtils.readSOLString(HabboConfigurationManager.ENVIRONMENT_SOL_KEY);
        HabboConfigurationManager._log.info("Default Environment: " + environmentId);
        for (const key of this._properties?.keys() ?? []) {
            suffixIndex = key.lastIndexOf("." + environmentId);
            if (suffixIndex != -1 && suffixIndex + 1 + environmentId.length == key.length) {
                baseKey = key.substring(0, suffixIndex);
                value = this.getProperty(key);
                this.setProperty(baseKey, value);
            }
        }
    }

    private fillParams(url: string, params: Map<any, any>): string {
        let startIndex: number = 0;
        let endIndex: number = 0;
        let name: string = null;
        let value: string = null;
        for (let replacement: number = 0; replacement < HabboConfigurationManager.MAX_PARAM_REPLACEMENTS; replacement++) {
            startIndex = url.indexOf(HabboConfigurationManager.REPLACE_CHAR);
            if (startIndex < 0) {
                break;
            }
            endIndex = url.indexOf(HabboConfigurationManager.REPLACE_CHAR, startIndex + 1);
            if (endIndex < 0) {
                break;
            }
            name = url.substring(startIndex + 1, endIndex);
            value = stringOrNull(params.get(name));
            url = url.replace(HabboConfigurationManager.REPLACE_CHAR + name + HabboConfigurationManager.REPLACE_CHAR, value);
        }
        return url;
    }

    private onConfigurationError(event: Event = null): void {
        let loaderEvent: AssetLoaderEvent = event instanceof AssetLoaderEvent ? event : null;
        let status: number = 0;
        if (loaderEvent != null) {
            status = loaderEvent.status;
        }
        HabboConfigurationManager._log.info(loaderEvent.toString());
        HabboWebTools.logEventLog("external_variables download error " + status);
        Core.error("Could not load external variables. Failed to load URL " + this.getProperty(HabboProperty.EXTERNAL_VARIABLES) + " HTTP status " + status + ". Client startup failed!", true, 20);
    }

    private onInitConfiguration(event: Event = null): void {
        let configuration: string = null;
        let bytes: ByteArray = null;
        let length: number = 0;
        if (this.disposed) {
            return;
        }
        let loader: AssetLoaderStruct = asInstanceOf(event.target, AssetLoaderStruct);
        if (loader == null) {
            return;
        }
        if (loader.assetLoader.content instanceof ByteArray) {
            bytes = asInstanceOf(loader.assetLoader.content, ByteArray);
            bytes.position = 0;
            configuration = bytes.readUTFBytes(bytes.length);
        } else {
            configuration = asGuarded(loader.assetLoader.content, isString);
        }
        if (configuration != null) {
            this.parseConfiguration(configuration);
        }
        let asset: IAsset = this.assets.getAssetByName(loader.assetName);
        if (asset) {
            this.assets.removeAsset(asset).dispose();
        }
        if (configuration == null || configuration.length == 0) {
            length = configuration != null ? configuration.length : -1;
            Core.error("Could not load external variables, got empty data from URL " + this.getProperty(HabboProperty.EXTERNAL_VARIABLES) + " data length = " + length + ". Client startup failed!", false, 20);
        }
        if (!this._initialized) {
            this.configurationsLoaded();
        }
    }

    private configurationsLoaded(): void {
        this.events.dispatchEvent(new Event(HabboConfigurationEvent.CONFIGURATION_LOADED));
        this.configurationsComplete();
    }

    private configurationsComplete(): void {
        if (this.disposed) {
            return;
        }
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        if (this.locked) {
            this.unlock();
        }
        this.events.dispatchEvent(new Event(Event.COMPLETE));
    }

    private setDefaults(): void {
        let policyFiles: any[] = null;
        ErrorReportStorage.addDebugData("Flashvars/host", "Host: " + this.getProperty(HabboProperty.CONNECTION_INFO_HOST));
        ErrorReportStorage.addDebugData("Flashvars/port", "Port: " + this.getProperty(HabboProperty.CONNECTION_INFO_PORT));
        this.setProperty("client.fatal.error.url", "${url.prefix}/flash_client_error");
        this.setProperty("game.center.error.url", "${url.prefix}/log/gameerror");
        let policyFileList: string = this.getProperty("flashclient.crossdomain.policy.files");
        if (policyFileList && policyFileList != "") {
            policyFiles = policyFileList.split(",");
            for (let policyFile of policyFiles ?? []) {
                policyFile = policyFile.replace(" ", "");
                Security.loadPolicyFile(policyFile);
            }
        }
    }

    private parseDevelopmentVariables(): void {
    }

    private parseCommonVariables(): void {
        this.parseConfigurationAsset(HabboConfigurationManager.COMMON_CONFIGURATION_ASSET);
    }

    private parseConfigurationAsset(assetName: string): void {
        let asset: TextAsset = asInstanceOf(this.assets.getAssetByName(assetName), TextAsset);
        if (asset != null) {
            this.parseConfiguration(stringOrNull(asset.content.toString()));
        } else {
            HabboConfigurationManager._log.warn("Could not parse configuration " + assetName);
        }
    }

    private parseLocalizationVariables(): void {
        this.parseConfigurationAsset(HabboConfigurationManager.LOCALIZATION_CONFIGURATION_ASSET);
    }

    private parseArguments(): void {
        let value: string = null;
        let args: Map<any, any> = (asGuarded(this.context, isICore)).arguments;
        for (let key of args?.keys() ?? []) {
            value = stringOrNull(args.get(key));
            key = key.replace(/[_]/g, ".");
            this.setProperty(key, value);
            if (this._environmentId == null && key == HabboProperty.ENVIRONMENT_ID) {
                this._environmentId = value;
            }
        }
        (asGuarded(this.context, isICore)).clearArguments();
    }

    protected override initInstanceFields(): void {
        this.onLocalizationComplete = this.onLocalizationComplete.bind(this);
        this.onConfigurationError = this.onConfigurationError.bind(this);
        this.onInitConfiguration = this.onInitConfiguration.bind(this);
        this._skipExternalVariables = false;
        this._skipLocalizations = false;
        this._initialized = false;
        this._readOnlyProperties = [];
        this._useHttps = false;
        super.initInstanceFields();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboConfigurationManager.#staticsReady) return;
        HabboConfigurationManager.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboConfigurationManager, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("ENVIRONMENT_SPECIFIC_PROPERTIES", null);
        set("_log", new SimpleLogger("com.sulake.habbo.configuration.HabboConfigurationManager"));
        set("ENVIRONMENT_SPECIFIC_PROPERTIES", [HabboProperty.CONNECTION_INFO_HOST, HabboProperty.CONNECTION_INFO_PORT, HabboProperty.URL_PREFIX, HabboProperty.SITE_URL, HabboProperty.DYNAMIC_DOWNLOAD_URL, HabboProperty.DYNAMIC_DOWNLOAD_NAME_TEMPLATE, HabboProperty.DYNAMIC_AVATAR_DOWNLOAD_CONFIGURATION, HabboProperty.DYNAMIC_AVATAR_DOWNLOAD_URL, HabboProperty.POCKET_API, HabboProperty.WEB_API, HabboProperty.FACEBOOK_APPLICATION_ID, HabboProperty.TERMS_OF_SERVICE_LINK]);
    }
}
