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
import { Logger } from '@/com/sulake/habbo/Logger';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';

export class HabboConfigurationManager extends Component implements ICoreConfiguration, IHabboConfigurationManager {
    static { registerClassName(this, 'com.sulake.habbo.configuration::HabboConfigurationManager'); }

    private static readonly INTERPOLATION_DEPTH_LIMIT: number = 3;
    private static readonly REPLACE_CHAR: string = "%";
    private static readonly HABBICONS_RESOURCE_NAME: string = "habbicons";
    private static readonly _SafeStr_15014: string = "habbicons.asset.root";
    private static readonly HABBICONS_ASSET_HASH: string = "habbicons.asset.hash";
    private static readonly _SafeStr_15015: string = "habbicons.url";
    private static readonly HABBICONS_EXTERNAL_HASH: string = "habbicons.hash";
    private static readonly _SafeStr_15016: string = "https://images.habbo.com/habbicons";

    declare private _skipExternalVariables: boolean;

    declare private _skipLocalizations: boolean;

    declare private _properties: Map<any, any>;

    declare private _initialized: boolean;

    declare private _readOnlyProperties: any[];

    declare private _useHttps: boolean;

    declare private _environmentId: string;

    declare private _localization: IHabboLocalizationManager;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        param1.configuration = this;
        this._skipExternalVariables = (param2 & 0x10000000) > 0;
        this._skipLocalizations = (param2 & 0x01000000) > 0;
        this.lock();
        this.resetAll();
        if (!this.propertyExists("environment.id") && CommunicationUtils.propertyExists("environment")) {
            this.updateEnvironmentId(CommunicationUtils.readSOLString("environment"));
        }
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }, false, [{ "type": "complete", "callback": this.onLocalizationComplete }])]);
    }

    private onLocalizationComplete(param1: Event): void {
        this.initConfigurationDownload();
    }

    public updateEnvironmentId(param1: string): void {
        if (this._environmentId != param1) {
            this._environmentId = param1;
            this.setProperty("environment.id", param1);
            AssetLibrary.setCacheNamespace(param1);
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
        this.setProperty("flash.client.url", "app:/");
        this.parseArguments();
        this.setDefaults();
        this.updateEnvironmentVariables();
        if (!this.propertyExists("environment.id")) {
            this.initEmbeddedConfigurations();
        }
        if (!this._initialized && this._skipExternalVariables) {
            this._initialized = true;
            this.unlock();
            this.events.dispatchEvent(new Event("complete"));
        } else if (!this._initialized && this._skipLocalizations) {
            this.initConfigurationDownload();
        }
    }

    public override dispose(): void {
        super.dispose();
    }

    public isInitialized(): boolean {
        return this._initialized;
    }

    private updateEnvironmentVariables(): void {
        let _loc1_: string = null;
        let _loc5_: string = null;
        let _loc3_: string = null;
        let _loc4_: string[] = new Array<string>(0).fill(null);
        _loc4_.push("connection.info.host");
        _loc4_.push("connection.info.port");
        _loc4_.push("url.prefix");
        _loc4_.push("site.url");
        _loc4_.push("flash.dynamic.download.url");
        _loc4_.push("flash.dynamic.download.name.template");
        _loc4_.push("flash.dynamic.avatar.download.configuration");
        _loc4_.push("flash.dynamic.avatar.download.url");
        _loc4_.push("pocket.api");
        _loc4_.push("web.api");
        _loc4_.push("facebook.application.id");
        _loc4_.push("web.terms_of_service.link");
        for (const _loc2_ of _loc4_ ?? []) {
            _loc1_ = this.getProperty(_loc2_);
            _loc5_ = _loc2_ + "." + this._environmentId;
            if (this.propertyExists(_loc5_)) {
                _loc3_ = this.getProperty(_loc5_);
                this.setProperty(_loc2_, _loc3_);
            } else {
                this.setProperty(_loc2_, _loc1_);
            }
        }
    }

    public override propertyExists(param1: string): boolean {
        let _loc2_: string = asGuarded(this._properties.get(param1), isString);
        return _loc2_ != null;
    }

    public override getProperty(param1: string, param2: Map<any, any> = null): string {
        let _loc3_: string = asGuarded(this._properties.get(param1), isString);
        _loc3_ = this.interpolate(_loc3_);
        if (_loc3_ == null) {
            return "";
        }
        if (_loc3_.substr(0, 2) == "//") {
            _loc3_ = (this._useHttps ? "https:" : "http:") + _loc3_;
        }
        _loc3_ = this.updateUrlProtocol(_loc3_);
        if (param2 != null) {
            _loc3_ = this.fillParams(_loc3_, param2);
        }
        return _loc3_;
    }

    public override setProperty(param1: string, param2: string, param3: boolean = false, param4: boolean = false): void {
        if (param4) {
            if (this._properties.get(param1) == null) {
                Logger.log(param1 + "=" + param2);
            }
        }
        if (param1 == "environment.id") {
            this._environmentId = param2;
            AssetLibrary.setCacheNamespace(param2);
        }
        if (this._readOnlyProperties.indexOf(param1) < 0 || param3) {
            this._properties.set(param1, param2);
        }
        if (param3) {
            this._readOnlyProperties.push(param1);
        }
    }

    public override getBoolean(param1: string): boolean {
        let _loc2_: string = asGuarded(this._properties.get(param1), isString);
        if (_loc2_ == null) {
            return false;
        }
        return _loc2_ == "1" || _loc2_.toLowerCase() == "true";
    }

    public override getInteger(param1: string, param2: number): number {
        let _loc3_: string = asGuarded(this._properties.get(param1), isString);
        if (_loc3_ == null) {
            return param2;
        }
        return Number(_loc3_) | 0;
    }

    public override updateUrlProtocol(param1: string): string {
        let _loc2_: string = param1;
        if (this._useHttps) {
            _loc2_ = param1.replace("http://", "https://");
            _loc2_ = _loc2_.replace(":8090/", ":8443/");
        }
        return _loc2_;
    }

    public override interpolate(param1: string): string {
        let _loc6_: number = 0;
        let _loc5_: any = null;
        let _loc2_: number = 0;
        let _loc3_: string = null;
        if (param1 == null) {
            return null;
        }
        let _loc4_: string = param1;
        let _loc7_: RegExp = /\${([^}]*)}/g;
        _loc6_ = 0;
        while (_loc6_ < 3) {
            _loc2_ = 0;
            _loc3_ = "";
            while (true) {
                _loc5_ = _loc7_.exec(_loc4_);
                if (_loc5_ == null) {
                    break;
                }
                if (!this.propertyExists(stringOrNull(_loc5_[1]))) {
                    return null;
                }
                _loc3_ += _loc4_.substring(_loc2_, Number(_loc5_.index));
                _loc3_ += this.getProperty(stringOrNull(_loc5_[1]));
                _loc2_ = _loc5_.index + _loc5_[0].length | 0;
            }
            _loc3_ += _loc4_.substring(_loc2_);
            if (_loc3_ == _loc4_) {
                break;
            }
            _loc4_ = _loc3_;
            _loc6_++;
        }
        return _loc3_;
    }

    public initConfigurationDownload(): void {
        let _loc2_: AssetLoaderStruct = null;
        let _loc1_: URLRequest = null;
        let _loc4_: string = null;
        this._initialized = false;
        let _loc3_: string = this._localization == null ? this.getProperty("external.variables.txt") : "variables_" + this._localization.getActiveEnvironmentId().toLowerCase() + "_" + this._localization.getExternalVariablesHash();
        if (this.assets.hasAsset(_loc3_)) {
            this.assets.removeAsset(this.assets.getAssetByName(_loc3_));
        }
        if (this._localization == null) {
            _loc1_ = new URLRequest(_loc3_);
            _loc2_ = this.assets.loadAssetFromFile(_loc3_, _loc1_, "text/plain");
            _loc2_.addEventListener("AssetLoaderEventComplete", this.onInitConfiguration);
            _loc2_.addEventListener("AssetLoaderEventError", this.onConfigurationError);
        } else {
            _loc4_ = this._localization.getExternalVariablesUrl() + "/" + this._localization.getExternalVariablesHash();
            _loc2_ = this.assets.loadAssetFromFile(_loc3_, new URLRequest(_loc4_), "text/plain");
            _loc2_.addEventListener("AssetLoaderEventComplete", this.onInitConfiguration);
            _loc2_.addEventListener("AssetLoaderEventError", this.onConfigurationError);
        }
    }

    private parseConfiguration(param1: string): void {
        let _loc8_: any[] = null;
        let _loc9_: string = null;
        let _loc7_: string = null;
        let _loc2_: RegExp = /\n\r{1,}|\n{1,}|\r{1,}/gm;
        let _loc6_: RegExp = /^\s+|\s+$/g;
        let _loc5_: any[] = param1.split(_loc2_);
        let _loc4_: boolean = false;
        for (const _loc3_ of _loc5_ ?? []) {
            if (!(_loc3_.substr(0, 1) == "#" || _loc3_ == "")) {
                _loc8_ = _loc3_.split("=");
                if (_loc8_.length >= 2 && _loc8_[0].length > 0 && _loc8_[1].length > 0) {
                    _loc9_ = stringOrNull(_loc8_.shift());
                    _loc7_ = _loc8_.join("=");
                    _loc9_ = _loc9_.replace(_loc6_, "");
                    _loc7_ = _loc7_.replace(_loc6_, "");
                    if (_loc9_ == "configuration.readonly" && _loc7_ == "true") {
                        _loc4_ = true;
                    }
                    this.setProperty(_loc9_, _loc7_, _loc4_);
                }
            }
        }
    }

    private initEmbeddedConfigurations(): void {
        let _loc2_: number = 0;
        let _loc3_: string = null;
        let _loc4_: string = null;
        let _loc1_: string = CommunicationUtils.readSOLString("environment");
        Logger.log("[HabboConfigurationManager] Default Environment: " + _loc1_);
        for (const _loc5_ of this._properties?.keys() ?? []) {
            _loc2_ = _loc5_.lastIndexOf("." + _loc1_) | 0;
            if (_loc2_ != -1 && _loc2_ + 1 + _loc1_.length == _loc5_.length) {
                _loc3_ = stringOrNull(_loc5_.substring(0, _loc2_));
                _loc4_ = this.getProperty(stringOrNull(_loc5_));
                this.setProperty(_loc3_, _loc4_);
            }
        }
    }

    private fillParams(param1: string, param2: Map<any, any>): string {
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc7_: string = null;
        let _loc6_: string = null;
        _loc5_ = 0;
        while (_loc5_ < 10) {
            _loc3_ = param1.indexOf("%");
            if (_loc3_ < 0) {
                break;
            }
            _loc4_ = param1.indexOf("%", _loc3_ + 1);
            if (_loc4_ < 0) {
                break;
            }
            _loc7_ = param1.substring(_loc3_ + 1, _loc4_);
            _loc6_ = stringOrNull(param2.get(_loc7_));
            param1 = param1.replace("%" + _loc7_ + "%", _loc6_);
            _loc5_++;
        }
        return param1;
    }

    private onConfigurationError(param1: Event = null): void {
        let _loc3_: AssetLoaderEvent = param1 instanceof AssetLoaderEvent ? param1 : null;
        let _loc2_: number = 0;
        if (_loc3_ != null) {
            _loc2_ = _loc3_.status;
        }
        Logger.log(_loc3_.toString());
        HabboWebTools.logEventLog("external_variables download error " + _loc2_);
        Core.error("Could not load external variables. Failed to load URL " + this.getProperty("external.variables.txt") + " HTTP status " + _loc2_ + ". Client startup failed!", true, 20);
    }

    private onInitConfiguration(param1: Event = null): void {
        let _loc2_: string = null;
        let _loc3_: ByteArray = null;
        let _loc4_: number = 0;
        if (this.disposed) {
            return;
        }
        let _loc5_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc5_ == null) {
            return;
        }
        if (_loc5_.assetLoader.content instanceof ByteArray) {
            _loc3_ = asInstanceOf(_loc5_.assetLoader.content, ByteArray);
            _loc3_.position = 0;
            _loc2_ = _loc3_.readUTFBytes(_loc3_.length);
        } else {
            _loc2_ = asGuarded(_loc5_.assetLoader.content, isString);
        }
        if (_loc2_ != null) {
            this.parseConfiguration(_loc2_);
        }
        this.updateHabbiconAssetProperties();
        let _loc6_: IAsset = this.assets.getAssetByName(_loc5_.assetName);
        if (_loc6_) {
            this.assets.removeAsset(_loc6_).dispose();
        }
        if (_loc2_ == null || _loc2_.length == 0) {
            _loc4_ = _loc2_ != null ? _loc2_.length : -1;
            Core.error("Could not load external variables, got empty data from URL " + this.getProperty("external.variables.txt") + " data length = " + _loc4_ + ". Client startup failed!", false, 20);
        }
        if (!this._initialized) {
            this.configurationsLoaded();
        }
    }

    private configurationsLoaded(): void {
        this.events.dispatchEvent(new Event("HCE_CONFIGURATION_LOADED"));
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
        this.events.dispatchEvent(new Event("complete"));
    }

    private setDefaults(): void {
        let _loc1_: any[] = null;
        ErrorReportStorage.addDebugData("Flashvars/host", "Host: " + this.getProperty("connection.info.host"));
        ErrorReportStorage.addDebugData("Flashvars/port", "Port: " + this.getProperty("connection.info.port"));
        this.setProperty("client.fatal.error.url", "${url.prefix}/flash_client_error");
        this.setProperty("game.center.error.url", "${url.prefix}/log/gameerror");
        let _loc2_: string = this.getProperty("flashclient.crossdomain.policy.files");
        if (_loc2_ && _loc2_ != "") {
            _loc1_ = _loc2_.split(",");
            for (let _loc3_ of _loc1_ ?? []) {
                _loc3_ = _loc3_.replace(" ", "");
                Security.loadPolicyFile(stringOrNull(_loc3_));
            }
        }
        this.updateHabbiconAssetProperties();
    }

    private updateHabbiconAssetProperties(): void {
        let _loc1_: string = null;
        let _loc2_: string = null;
        if (this.propertyExists("habbicons.hash")) {
            _loc2_ = this.getProperty("habbicons.hash");
            if (_loc2_ != null && _loc2_ != "") {
                this.setProperty("habbicons.asset.hash", _loc2_);
                _loc1_ = this.propertyExists("habbicons.url") ? this.getProperty("habbicons.url") : "https://images.habbo.com/habbicons";
                this.setProperty("habbicons.asset.root", _loc1_);
                return;
            }
        }
        if (this._localization != null) {
            _loc1_ = this._localization.getGameDataResourceUrl("habbicons");
            _loc2_ = this._localization.getGameDataResourceHash("habbicons");
            if (_loc1_ != null && _loc1_ != "") {
                this.setProperty("habbicons.asset.root", _loc1_);
                if (_loc2_ != null && _loc2_ != "") {
                    this.setProperty("habbicons.asset.hash", _loc2_);
                }
                return;
            }
        }
        if (this.propertyExists("habbicons.asset.hash")) {
            this.setProperty("habbicons.asset.root", "https://images.habbo.com/habbicons");
        }
    }

    private parseDevelopmentVariables(): void {
    }

    private parseCommonVariables(): void {
        this.parseConfigurationAsset("common_configuration");
    }

    private parseConfigurationAsset(param1: string): void {
        let _loc2_: TextAsset = asInstanceOf(this.assets.getAssetByName(param1), TextAsset);
        if (_loc2_ != null) {
            this.parseConfiguration(stringOrNull(_loc2_.content.toString()));
        } else {
            Logger.log("Could not parse configuration " + param1);
        }
    }

    private parseLocalizationVariables(): void {
        this.parseConfigurationAsset("localization_configuration");
    }

    private parseArguments(): void {
        let _loc2_: string = null;
        let _loc1_: Map<any, any> = (asGuarded(this.context, isICore)).arguments;
        for (let _loc3_ of _loc1_?.keys() ?? []) {
            _loc2_ = stringOrNull(_loc1_.get(_loc3_));
            _loc3_ = _loc3_.replace(/[_]/g, ".");
            this.setProperty(stringOrNull(_loc3_), _loc2_);
            if (this._environmentId == null && _loc3_ == "environment.id") {
                this._environmentId = _loc2_;
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
}
