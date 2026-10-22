import { asGuarded, asInstanceOf, isString } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AvatarStructure } from '@/com/sulake/habbo/avatar/AvatarStructure';
import type { IAvatarEffectListener } from '@/com/sulake/habbo/avatar/IAvatarEffectListener';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { AssetLoaderStruct, EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { EffectAssetDownloadLibrary } from '@/com/sulake/habbo/avatar/EffectAssetDownloadLibrary';
import { LibraryLoadedEvent } from '@/com/sulake/habbo/avatar/events/LibraryLoadedEvent';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class EffectAssetDownloadManager extends EventDispatcherWrapper {
    static { registerClassName(this, 'com.sulake.habbo.avatar::EffectAssetDownloadManager'); }

    public static readonly LIBRARY_LOADED: string = "LIBRARY_LOADED";

    declare private _SafeStr_4045: any[];

    declare private _map: Map<any, any>;

    private _SafeStr_4579: number = 3;

    declare private _SafeStr_2761: AssetLoaderStruct;

    declare private _assets: IAssetLibrary;

    declare private _SafeStr_5697: boolean;
    static { (this.prototype as any)._SafeStr_5697 = false; }

    declare private _SafeStr_4055: string;

    declare private _SafeStr_6569: string;

    declare private _SafeStr_7220: string;

    declare private _SafeStr_2176: AvatarStructure;

    declare private _listeners: Map<any, any>;

    declare private _SafeStr_4323: Map<any, any>;

    declare private _downloadShiftTimer: Timer;

    declare private _SafeStr_3005: any[];

    declare private _SafeStr_3837: any[];

    declare private _SafeStr_3597: any[];

    private readonly DOWNLOAD_TIMEOUT: number = 100;
    private readonly MAX_SIMULTANEOUS_DOWNLOADS: number = 2;

    constructor(param1: IAssetLibrary, param2: string, param3: string, param4: AvatarStructure, param5: string) {
        let _loc9_: XmlAsset = null;
        let _loc7_: XML = null;
        super();
        this._SafeStr_4045 = ["dance.1", "dance.2", "dance.3", "dance.4"];
        this._map = new Dictionary();
        this._assets = param1;
        this._SafeStr_2176 = param4;
        this._SafeStr_4055 = param2;
        this._SafeStr_6569 = param3;
        this._SafeStr_7220 = param5;
        this._listeners = new Dictionary();
        this._SafeStr_4323 = new Dictionary();
        this._SafeStr_3005 = [];
        this._SafeStr_3837 = [];
        this._SafeStr_3597 = [];
        let _loc6_: URLRequest = new URLRequest(this._SafeStr_4055);
        let _loc8_: IAsset = this._assets.getAssetByName("effectmap");
        if (_loc8_ == null) {
            this._SafeStr_2761 = this._assets.loadAssetFromFile("effectmap", _loc6_, "text/xml");
            this.addMapLoaderEventListeners();
        } else {
            _loc9_ = asInstanceOf(this._assets.getAssetByName("effectmap"), XmlAsset);
            _loc7_ = (asInstanceOf(_loc9_.content, XML)).copy();
            this.loadEffectMapData(_loc7_);
        }
        this._downloadShiftTimer = new Timer(100, 1);
        this._downloadShiftTimer.addEventListener("timerComplete", this.onNextDownloadTimeout);
        this._SafeStr_2176.renderManager.events.addEventListener("AVATAR_RENDER_READY", this.purgeInitDownloadBuffer);
    }

    public loadMandatoryLibs(): void {
        let _loc2_: any;
        let _loc4_: any[] = null;
        let _loc1_: any[] = this._SafeStr_4045.slice();
        for (const _loc3_ of _loc1_ ?? []) {
            _loc4_ = this._map.get(_loc3_);
            if (_loc4_ != null) {
                for (_loc2_ of _loc4_ ?? []) {
                    this.addToQueue(_loc2_);
                }
            }
        }
    }

    private addMapLoaderEventListeners(): void {
        if (this._SafeStr_2761) {
            this._SafeStr_2761.addEventListener("AssetLoaderEventComplete", this.onConfigurationComplete);
            this._SafeStr_2761.addEventListener("AssetLoaderEventError", this.onConfigurationError);
        }
    }

    private removeMapLoaderEventListeners(): void {
        if (this._SafeStr_2761) {
            this._SafeStr_2761.removeEventListener("AssetLoaderEventComplete", this.onConfigurationComplete);
            this._SafeStr_2761.removeEventListener("AssetLoaderEventError", this.onConfigurationError);
        }
    }

    private onConfigurationComplete = (param1: Event): void => {
        let _loc2_: XML = null;
        if (this.disposed) {
            return;
        }
        let _loc3_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc3_ == null) {
            return;
        }
        try {
            _loc2_ = new XML(asGuarded(_loc3_.assetLoader.content, isString));
        } catch (e) {
            return;
        }
        this.loadEffectMapData(_loc2_);
    };

    private onConfigurationError = (param1: Event): void => {
        let _loc2_: string = null;
        let _loc3_: URLRequest = null;
        if (this.disposed) {
            return;
        }
        this._SafeStr_4579 = this._SafeStr_4579 - 1;
        if (this._SafeStr_4579 <= 0) {
            HabboWebTools.logEventLog("Effect download error " + this._SafeStr_4055);
        } else {
            if (this._SafeStr_4055.indexOf("?") > 0) {
                _loc2_ = this._SafeStr_4055 + "&retry=" + this._SafeStr_4579;
            } else {
                _loc2_ = this._SafeStr_4055 + "?retry=" + this._SafeStr_4579;
            }
            this.removeMapLoaderEventListeners();
            _loc3_ = new URLRequest(_loc2_);
            this._SafeStr_2761 = this._assets.loadAssetFromFile("effectmap", _loc3_, "text/xml");
            this.addMapLoaderEventListeners();
        }
    };

    private loadEffectMapData(param1: XML): void {
        if (param1 == null) {
            return;
        }
        if (param1.toString() == "") {
            return;
        }
        this.generateMap(param1);
        this.loadMandatoryLibs();
        this._SafeStr_5697 = true;
        this.dispatchEvent(new Event("complete"));
    }

    private generateMap(param1: XML): void {
        let _loc2_: EffectAssetDownloadLibrary = null;
        let _loc3_: string = null;
        let _loc5_: any[] = null;
        for (const _loc4_ of param1.child("effect") ?? []) {
            _loc2_ = new EffectAssetDownloadLibrary(_loc4_.attribute("lib").toString(), "0", this._SafeStr_6569, this._assets, this._SafeStr_7220);
            _loc2_.addEventListener("complete", this.libraryComplete);
            _loc3_ = _loc4_.attribute("id").toString();
            _loc5_ = this._map.get(_loc3_);
            if (_loc5_ == null) {
                _loc5_ = [];
            }
            _loc5_.push(_loc2_);
            this._map.set(_loc3_, _loc5_);
        }
    }

    private libraryComplete = (param1: Event): void => {
        let _loc3_: any;
        let _loc6_: any;
        let _loc2_: string = null;
        let _loc11_: any[] = null;
        let _loc10_: boolean = false;
        let _loc5_: any[] = null;
        let _loc7_: EffectAssetDownloadLibrary = null;
        let _loc8_: number = 0;
        if (this.disposed) {
            return;
        }
        let _loc4_: any[] = [];
        let _loc9_: EffectAssetDownloadLibrary = asInstanceOf(param1.target, EffectAssetDownloadLibrary);
        this._SafeStr_2176.registerAnimation(_loc9_.animation);
        for (_loc2_ of this._SafeStr_4323?.keys() ?? []) {
            _loc10_ = true;
            _loc11_ = this._SafeStr_4323.get(_loc2_);
            for (_loc3_ of _loc11_ ?? []) {
                if (!_loc3_.isReady) {
                    _loc10_ = false;
                    break;
                }
            }
            if (_loc10_) {
                _loc4_.push(_loc2_);
                _loc5_ = this._listeners.get(_loc2_);
                for (_loc6_ of _loc5_ ?? []) {
                    if (_loc6_ != null && !_loc6_.disposed) {
                        _loc6_.avatarEffectReady(parseInt(_loc2_));
                    }
                }
                this._listeners.delete(_loc2_);
            }
        }
        for (_loc2_ of _loc4_ ?? []) {
            this._SafeStr_4323.delete(_loc2_);
        }
        while (_loc8_ < this._SafeStr_3597.length) {
            _loc7_ = this._SafeStr_3597[_loc8_];
            if (_loc7_.name == _loc9_.name) {
                this._SafeStr_3597.splice(_loc8_, 1);
            }
            _loc8_++;
        }
        if (_loc4_.length > 0) {
            this.dispatchEvent(new LibraryLoadedEvent("LIBRARY_LOADED", _loc9_.name));
        }
        this._downloadShiftTimer.start();
    };

    public isReady(param1: number): boolean {
        if (!this._SafeStr_5697 || !this._SafeStr_2176.renderManager.isReady) {
            return false;
        }
        let _loc2_: any[] = this.getLibsToDownload(param1);
        return _loc2_.length == 0;
    }

    public loadEffectData(param1: number, param2: IAvatarEffectListener): void {
        let _loc5_: any[] = null;
        if (!this._SafeStr_5697 || !this._SafeStr_2176.renderManager.isReady) {
            this._SafeStr_3005.push([param1, param2]);
            return;
        }
        let _loc4_: any[] = this.getLibsToDownload(param1);
        if (_loc4_.length > 0) {
            if (param2 && !param2.disposed) {
                _loc5_ = this._listeners.get(String(param1));
                if (_loc5_ == null) {
                    _loc5_ = [];
                }
                _loc5_.push(param2);
                this._listeners.set(String(param1), _loc5_);
            }
            this._SafeStr_4323.set(String(param1), _loc4_);
            for (const _loc3_ of _loc4_ ?? []) {
                this.addToQueue(_loc3_);
            }
        } else if (param2 != null && !param2.disposed) {
            param2.avatarEffectReady(param1);
            Logger.log("Effect ready to use: " + param1);
        }
    }

    private getLibsToDownload(param1: number): any[] {
        let _loc3_: any[] = [];
        if (!this._SafeStr_2176) {
            return _loc3_;
        }
        let _loc4_: any[] = this._map.get(String(param1));
        if (_loc4_ != null) {
            for (const _loc2_ of _loc4_ ?? []) {
                if (_loc2_ != null) {
                    if (!_loc2_.isReady) {
                        if (_loc3_.indexOf(_loc2_) == -1) {
                            _loc3_.push(_loc2_);
                        }
                    }
                }
            }
        }
        return _loc3_;
    }

    private processPending(): void {
        let _loc1_: EffectAssetDownloadLibrary = null;
        while (this._SafeStr_3837.length > 0 && this._SafeStr_3597.length < 2) {
            _loc1_ = this._SafeStr_3837.shift();
            _loc1_.startDownloading();
            this._SafeStr_3597.push(_loc1_);
        }
    }

    private addToQueue(param1: EffectAssetDownloadLibrary): void {
        if (!param1.isReady && this._SafeStr_3837.indexOf(param1) == -1 && this._SafeStr_3597.indexOf(param1) == -1) {
            this._SafeStr_3837.push(param1);
            this.processPending();
        }
    }

    private onNextDownloadTimeout = (param1: Event = null): void => {
        this.processPending();
    };

    private purgeInitDownloadBuffer = (param1: Event): void => {
        let _loc2_: any = null;
        for (_loc2_ of this._SafeStr_3005 ?? []) {
            this.loadEffectData(_loc2_[0] | 0, _loc2_[1]);
        }
        this._SafeStr_3005 = [];
    };

    public get map(): Map<any, any> {
        return this._map;
    }
}
