import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IGameDataResources } from '@/com/sulake/core/localization/IGameDataResources';
import type { ILocalizable } from '@/com/sulake/core/localization/ILocalizable';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { ILocalizationDefinition } from '@/com/sulake/core/localization/ILocalizationDefinition';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { GameDataResources } from '@/com/sulake/core/localization/GameDataResources';
import { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import { isILocalization } from '@/com/sulake/core/localization/ILocalization';
import { isILocalizationDefinition } from '@/com/sulake/core/localization/ILocalizationDefinition';
import { Localization } from '@/com/sulake/core/localization/Localization';
import { LocalizationDefinition } from '@/com/sulake/core/localization/LocalizationDefinition';
import { AssetLoaderStruct, Component } from '@/com/sulake/core/runtime/Component.group';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Logger } from '@/com/sulake/habbo/Logger';

export class CoreLocalizationManager extends Component implements IDisposable, ICoreLocalizationManager {
    static { registerClassName(this, 'com.sulake.core.localization::CoreLocalizationManager'); }

    private static readonly INTERPOLATION_DEPTH_LIMIT: number = 3;

    declare private _SafeStr_2259: Map<any, any>;

    declare private _SafeStr_3073: UtilsMap;

    declare private _SafeStr_6611: string;

    declare private _SafeStr_3583: any[];

    declare private _acceptEmptyMap: UtilsMap;

    declare private _activeEnvironmentId: string;

    declare private _gameDataResources: IGameDataResources;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    private static validateLocalizationData(param1: string, param2: boolean): boolean {
        if (param1 == null) {
            return false;
        }
        if (param1.length == 0 && !param2) {
            return false;
        }
        if (param1.indexOf("<!DOCTYPE html") != -1) {
            return false;
        }
        return true;
    }

    protected override initComponent(): void {
        this._SafeStr_2259 = new Dictionary();
        this._SafeStr_3073 = new UtilsMap();
        this._acceptEmptyMap = new UtilsMap();
    }

    public override dispose(): void {
        this._SafeStr_2259 = null;
        if (this._SafeStr_3073 != null) {
            this._SafeStr_3073.dispose();
        }
        this._SafeStr_3073 = null;
        this._SafeStr_3583 = null;
        super.dispose();
    }

    public registerLocalizationDefinition(param1: string, param2: string, param3: string, param4: string): void {
        let _loc5_: LocalizationDefinition = this._SafeStr_3073[param1];
        if (_loc5_ == null) {
            _loc5_ = new LocalizationDefinition(param4, param2, param3);
            this._SafeStr_3073[param1] = _loc5_;
        }
    }

    public activateLocalizationDefinition(param1: string): boolean {
        let _loc2_: LocalizationDefinition = this._SafeStr_3073[param1];
        if (_loc2_ != null) {
            this._SafeStr_6611 = param1;
            this.loadLocalizationFromURL(_loc2_.url, _loc2_.languageCode);
            return true;
        }
        return false;
    }

    public getGameDataResources(): IGameDataResources {
        return this._gameDataResources;
    }

    public getLocalizationDefinitions(): UtilsMap {
        return this._SafeStr_3073;
    }

    public getLocalizationDefinition(param1: string): ILocalizationDefinition {
        return asGuarded(this._SafeStr_3073[param1], isILocalizationDefinition);
    }

    public getActiveEnvironmentId(): string {
        return this._activeEnvironmentId;
    }

    public getActiveLocalizationDefinition(): ILocalizationDefinition {
        return this.getLocalizationDefinition(this._SafeStr_6611);
    }

    public loadLocalizationFromURL(param1: string, param2: string, param3: boolean = false): void {
        let urlLoader: URLLoader;
        let hashesUrl: string = param1;
        let environmentId: string = param2;
        let acceptEmpty: boolean = param3;
        if (!hashesUrl || hashesUrl == "") {
            Logger.log("[CoreLocalizationManager] Localization hashes URL was null or empty!");
            this.events.dispatchEvent(new Event("LOCALIZATION_EVENT_LOCALIZATION_FAILED"));
            return;
        }
        urlLoader = new URLLoader(new URLRequest(hashesUrl));
        urlLoader.addEventListener("complete", (param1: Event): void => {
             let _loc4_: GameDataResources = null;
             let _loc5_: string = null;
             let _loc6_: IAsset = null;
             let _loc7_: string = null;
             let _loc3_: AssetLoaderStruct = null;
             let _loc2_: string = stringOrNull(param1.currentTarget.data);
             if (_loc2_ && _loc2_.length > 0) {
                 try {
                     _loc4_ = GameDataResources.parse(_loc2_);
                     if (!_loc4_.isValid()) {
                         this.events.dispatchEvent(new Event("LOCALIZATION_EVENT_LOCALIZATION_FAILED"));
                         return;
                     }
                     this._gameDataResources = _loc4_;
                     _loc5_ = "localization_" + environmentId.toLowerCase() + "_" + _loc4_.getExternalTextsHash();
                     _loc6_ = this.assets.getAssetByName(_loc5_);
                     if (_loc6_ && environmentId == this._activeEnvironmentId) {
                         this.events.dispatchEvent(new Event("LOCALIZATION_EVENT_LOCALIZATION_LOADED"));
                         return;
                     }
                     this._activeEnvironmentId = environmentId;
                     this._acceptEmptyMap.remove(_loc5_);
                     this._acceptEmptyMap.add(_loc5_, acceptEmpty);
                     _loc7_ = _loc4_.getExternalTextsUrl() + "/" + _loc4_.getExternalTextsHash();
                     Logger.log("[CoreLocalizationManager] load localization for url: " + _loc7_);
                     _loc3_ = this.assets.loadAssetFromFile(_loc5_, new URLRequest(_loc7_), "text/plain");
                     _loc3_.addEventListener("AssetLoaderEventComplete", this.onLocalizationReady);
                     _loc3_.addEventListener("AssetLoaderEventError", this.onLocalizationFailed);
                 } catch (error) {
                     Logger.log("Failed parsing hashes", error.stack);
                     this.events.dispatchEvent(new Event("LOCALIZATION_EVENT_LOCALIZATION_FAILED"));
                 }
             } else {
                 this.events.dispatchEvent(new Event("LOCALIZATION_EVENT_LOCALIZATION_FAILED"));
             }
         });
        urlLoader.addEventListener("error", (param1: Event): void => {
             this.events.dispatchEvent(new Event("LOCALIZATION_EVENT_LOCALIZATION_FAILED"));
         });
        urlLoader.addEventListener("ioError", (param1: Event): void => {
             this.events.dispatchEvent(new Event("LOCALIZATION_EVENT_LOCALIZATION_FAILED"));
         });
    }

    private onLocalizationReady(param1: AssetLoaderEvent): void {
        let _loc5_: string = null;
        let _loc3_: string = null;
        let _loc4_: ByteArray = null;
        let _loc7_: IAsset = null;
        let _loc2_: boolean = false;
        let _loc6_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc6_ != null) {
            _loc5_ = _loc6_.assetName;
            if (_loc6_.assetLoader.content instanceof ByteArray) {
                _loc4_ = asInstanceOf(_loc6_.assetLoader.content, ByteArray);
                _loc4_.position = 0;
                _loc3_ = _loc4_.readUTFBytes(_loc4_.length);
            } else {
                _loc3_ = asGuarded(_loc6_.assetLoader.content, isString);
            }
            _loc7_ = this.assets.getAssetByName(_loc5_);
            if (_loc7_) {
                this.assets.removeAsset(_loc7_).dispose();
            }
            _loc2_ = this._acceptEmptyMap.getValue(_loc5_);
            if (!CoreLocalizationManager.validateLocalizationData(_loc3_, _loc2_)) {
                this.events.dispatchEvent(new Event("LOCALIZATION_EVENT_LOCALIZATION_FAILED"));
                return;
            }
            this.parseLocalizationData(_loc3_);
            this.events.dispatchEvent(new Event("LOCALIZATION_EVENT_LOCALIZATION_LOADED"));
        }
    }

    private onLocalizationFailed(param1: AssetLoaderEvent): void {
        let _loc4_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        let _loc2_: URLRequest = new URLRequest(_loc4_.assetLoader.url);
        let _loc3_: AssetLoaderStruct = this.assets.loadAssetFromFile(_loc4_.assetLoader.url, _loc2_, "text/plain");
        _loc3_.addEventListener("AssetLoaderEventComplete", this.onLocalizationReady);
        _loc3_.addEventListener("AssetLoaderEventError", this.onLocalizationRetryFailed);
    }

    private onLocalizationRetryFailed(param1: AssetLoaderEvent): void {
        let _loc2_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        ErrorReportStorage.addDebugData("Localization name", _loc2_.assetName);
        ErrorReportStorage.addDebugData("Localization url", _loc2_.assetLoader.url);
        ErrorReportStorage.addDebugData("Localization error", "Code: " + _loc2_.assetLoader.errorCode);
    }

    public hasLocalization(param1: string): boolean {
        let _loc2_: Localization = asInstanceOf(this._SafeStr_2259.get(param1), Localization);
        return _loc2_ != null;
    }

    public getLocalization(param1: string, param2: string = ""): string {
        let _loc3_: Localization = asInstanceOf(this._SafeStr_2259.get(param1), Localization);
        if (_loc3_ == null) {
            this._SafeStr_3583.push(param1);
            return param2;
        }
        return _loc3_.value;
    }

    private getRawValue(param1: string, param2: string = ""): string {
        let _loc3_: Localization = asInstanceOf(this._SafeStr_2259.get(param1), Localization);
        if (_loc3_ == null) {
            this._SafeStr_3583.push(param1);
            return param2;
        }
        return _loc3_.raw;
    }

    public updateLocalization(param1: string, param2: string): void {
        let _loc3_: Localization = this._SafeStr_2259.get(param1);
        if (_loc3_ == null) {
            _loc3_ = new Localization(this, param1, param2);
            this._SafeStr_2259.set(param1, _loc3_);
        } else {
            _loc3_.setValue(param2);
        }
    }

    private updateAllListeners(): void {
        for (const _loc1_ of this._SafeStr_2259?.values() ?? []) {
            _loc1_.updateListeners();
        }
    }

    public registerListener(param1: string, param2: ILocalizable): boolean {
        let _loc3_: Localization = this._SafeStr_2259.get(param1);
        if (_loc3_ == null) {
            this._SafeStr_3583.push(param1);
            _loc3_ = new Localization(this, param1, param1);
            this._SafeStr_2259.set(param1, _loc3_);
        }
        _loc3_.registerListener(param2);
        return true;
    }

    public removeListener(param1: string, param2: ILocalizable): boolean {
        let _loc3_: Localization = this._SafeStr_2259.get(param1);
        if (_loc3_ != null) {
            _loc3_.removeListener(param2);
        }
        return true;
    }

    public registerParameter(param1: string, param2: string, param3: string, param4: string = "%"): string {
        let _loc5_: Localization = this._SafeStr_2259.get(param1);
        if (_loc5_ == null) {
            _loc5_ = new Localization(this, param1, param1);
            this._SafeStr_2259.set(param1, _loc5_);
        }
        _loc5_.registerParameter(param2, param3, param4);
        return _loc5_.value;
    }

    public getLocalizationRaw(param1: string): ILocalization {
        return asGuarded(this._SafeStr_2259.get(param1), isILocalization);
    }

    public getKeys(): any[] {
        let _loc1_: any[] = [];
        for (const _loc2_ of this._SafeStr_2259?.keys() ?? []) {
            _loc1_.push(_loc2_);
        }
        return _loc1_;
    }

    public printNonExistingKeys(): void {
        let _loc1_: string = "";
        for (const _loc2_ of this._SafeStr_3583 ?? []) {
            _loc1_ += _loc2_ + "\n";
        }
        Logger.log(_loc1_);
    }

    private applyLocalizationData(param1: Map<any, any>): void {
        let _loc2_: string = null;
        for (const _loc3_ of param1?.keys() ?? []) {
            _loc2_ = stringOrNull(param1.get(_loc3_));
            this.updateLocalization(stringOrNull(_loc3_), _loc2_);
        }
    }

    protected parseLocalizationData(param1: string): Map<any, any> {
        let _loc6_: number = 0;
        let _loc4_: string = null;
        let _loc11_: any[] = null;
        let _loc12_: string = null;
        let _loc10_: string = null;
        if (param1 == null) {
            return null;
        }
        let _loc5_: Map<any, any> = new Dictionary();
        let _loc2_: RegExp = /\n\r{1,}|\n{1,}|\r{1,}/gm;
        let _loc9_: RegExp = /^\s+|\s+$/g;
        let _loc8_: any[] = param1.split(_loc2_);
        let _loc7_: RegExp = /\\n/gm;
        let _loc3_: number = _loc8_.length | 0;
        _loc6_ = 0;
        while (_loc6_ < _loc3_) {
            _loc4_ = stringOrNull(_loc8_[_loc6_]);
            if (_loc4_.charAt(0) != "#") {
                _loc11_ = _loc4_.split("=");
                if (_loc11_[0].length > 0) {
                    if (_loc11_.length > 1) {
                        _loc12_ = stringOrNull(_loc11_.shift());
                        _loc10_ = _loc11_.join("=");
                        _loc12_ = _loc12_.replace(_loc9_, "");
                        _loc10_ = _loc10_.replace(_loc9_, "");
                        _loc10_ = _loc10_.replace(_loc7_, "\n");
                        if (_loc10_.length > 0) {
                            this.updateLocalization(_loc12_, _loc10_);
                            _loc5_.set(_loc12_, _loc10_);
                        }
                    }
                }
            }
            _loc6_++;
        }
        this.updateAllListeners();
        return _loc5_;
    }

    public override interpolate(param1: string): string {
        let _loc5_: number = 0;
        let _loc4_: any = null;
        let _loc3_: number = 0;
        let _loc7_: number = 0;
        let _loc2_: Localization = null;
        let _loc6_: RegExp = /\${([^}]*)}/g;
        _loc5_ = 0;
        while (_loc5_ < 3) {
            _loc4_ = _loc6_.exec(param1);
            if (_loc4_ == null) {
                return param1;
            }
            _loc3_ = 0;
            _loc7_ = 1;
            while (_loc7_ < _loc4_.length) {
                _loc2_ = this._SafeStr_2259.get(_loc4_[_loc7_]);
                if (_loc2_ != null) {
                    _loc3_++;
                    param1 = param1.replace("${" + _loc4_[_loc7_] + "}", _loc2_.value);
                }
                _loc7_ += 1;
            }
            if (_loc3_ == 0) {
                break;
            }
            _loc5_++;
        }
        return super.interpolate(param1);
    }

    protected override initInstanceFields(): void {
        this.onLocalizationReady = this.onLocalizationReady.bind(this);
        this.onLocalizationFailed = this.onLocalizationFailed.bind(this);
        this.onLocalizationRetryFailed = this.onLocalizationRetryFailed.bind(this);
        this._SafeStr_3583 = [];
        super.initInstanceFields();
    }

    get [ICoreLocalizationManager](): true {
        return true;
    }
}
