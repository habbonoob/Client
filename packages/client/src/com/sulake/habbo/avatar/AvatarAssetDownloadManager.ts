import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AvatarRenderManager } from '@/com/sulake/habbo/avatar/AvatarRenderManager';
import type { AvatarStructure } from '@/com/sulake/habbo/avatar/AvatarStructure';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';
import type { ISetType } from '@/com/sulake/habbo/avatar/structure/figure/ISetType';
import type { IFigureSetData } from '@/com/sulake/habbo/avatar/structure/IFigureSetData';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { AssetLoaderStruct, EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { AvatarAssetDownloadLibrary } from '@/com/sulake/habbo/avatar/AvatarAssetDownloadLibrary';
import { LibraryLoadedEvent } from '@/com/sulake/habbo/avatar/events/LibraryLoadedEvent';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class AvatarAssetDownloadManager extends EventDispatcherWrapper {
    static { registerClassName(this, 'com.sulake.habbo.avatar::AvatarAssetDownloadManager'); }

    static #staticsReady = false;

    private static get _log_AvatarAssetDownloadManager(): SimpleLogger {
        AvatarAssetDownloadManager.#initStatics();
        return AvatarAssetDownloadManager._log_AvatarAssetDownloadManager;
    }

    public static readonly LIBRARY_LOADED: string = "LIBRARY_LOADED";
    private static readonly LIB_BODY: string = "hh_human_body";
    private static readonly LIB_ITEMS: string = "hh_human_item";
    private static readonly LIB_AVATAR_EDITOR: string = "hh_avatar_editor";
    private readonly DOWNLOAD_TIMEOUT: number = 100;

    constructor(param1: AvatarRenderManager, param2: IAssetLibrary, param3: string, param4: string, param5: AvatarStructure, param6: string) {
        let _loc10_: XmlAsset = null;
        let _loc8_: XML = null;
        super();
        this._SafeStr_4045 = ["hh_human_body", "hh_human_item"];
        this._manager = param1;
        this._libraries = new Dictionary();
        this._SafeStr_4011 = new Dictionary();
        this._assets = param2;
        this._SafeStr_2176 = param5;
        this._incompleteFigures = new Dictionary();
        this._SafeStr_6569 = param4;
        this._SafeStr_4055 = param3;
        this._SafeStr_7220 = param6;
        this._listeners = new Dictionary();
        this._SafeStr_3005 = [];
        this._SafeStr_3837 = [];
        this._SafeStr_3597 = [];
        if (param4 && param4.indexOf("//rumba.sulake.com") > 0) {
            this._SafeStr_6260 = 16;
        }
        this._SafeStr_2176.renderManager.events.addEventListener("AVATAR_RENDER_READY", this.purgeInitDownloadBuffer);
        let _loc7_: URLRequest = new URLRequest(param3);
        let _loc9_: IAsset = this._assets.getAssetByName("figuremap");
        if (_loc9_ == null) {
            this._SafeStr_2761 = this._assets.loadAssetFromFile("figuremap", _loc7_, "text/xml");
            this.addMapLoaderEventListeners();
        } else {
            _loc10_ = asInstanceOf(this._assets.getAssetByName("figuremap"), XmlAsset);
            _loc8_ = (asInstanceOf(_loc10_.content, XML)).copy();
            this.loadFigureMapData(_loc8_);
        }
        this._downloadShiftTimer = new Timer(100, 1);
        this._downloadShiftTimer.addEventListener("timerComplete", this.onNextDownloadTimeout);
    }

    declare private _manager: AvatarRenderManager;

    declare private _libraries: Map<any, any>;

    declare private _SafeStr_4011: Map<any, any>;

    declare private _assets: IAssetLibrary;

    declare private _incompleteFigures: Map<any, any>;

    declare private _listeners: Map<any, any>;

    declare private _SafeStr_2176: AvatarStructure;

    declare private _SafeStr_6569: string;

    declare private _SafeStr_4055: string;

    declare private _SafeStr_5697: boolean;
    static { (this.prototype as any)._SafeStr_5697 = false; }

    private _SafeStr_4579: number = 3;

    declare private _SafeStr_2761: AssetLoaderStruct;

    declare private _downloadShiftTimer: Timer;

    declare private _SafeStr_3005: any[];

    declare private _SafeStr_3837: any[];

    declare private _SafeStr_3597: any[];

    private _SafeStr_6260: number = 6;

    declare private _SafeStr_7220: string;

    declare private _SafeStr_4045: any[];

    public override dispose(): void {
        super.dispose();
        this._SafeStr_4011 = null;
        this._assets = null;
        this._incompleteFigures = null;
        this._listeners = null;
        if (this._SafeStr_2176.renderManager) {
            this._SafeStr_2176.renderManager.events.removeEventListener("AVATAR_RENDER_READY", this.purgeInitDownloadBuffer);
        }
        this._SafeStr_2176 = null;
        this._SafeStr_3837 = null;
        this._SafeStr_3005 = null;
        if (this._downloadShiftTimer) {
            this._downloadShiftTimer.stop();
            this._downloadShiftTimer = null;
        }
        if (this._SafeStr_2761) {
            this.removeMapLoaderEventListeners();
            this._SafeStr_2761 = null;
        }
    }

    public loadMandatoryLibs(): void {
        let _loc2_: AvatarAssetDownloadLibrary = null;
        let _loc1_: any[] = this._SafeStr_4045.slice();
        for (const _loc3_ of _loc1_ ?? []) {
            _loc2_ = this._libraries.get(_loc3_);
            if (_loc2_) {
                _loc2_.isMandatory = true;
                this.addToQueue(_loc2_);
            } else {
                AvatarAssetDownloadManager._log_AvatarAssetDownloadManager.warn("Missing mandatory library: " + _loc3_);
            }
        }
        this._downloadShiftTimer.start();
    }

    public isReady(param1: IAvatarFigureContainer): boolean {
        if (!this._SafeStr_5697 || !this._SafeStr_2176.renderManager.isReady) {
            return false;
        }
        let _loc2_: any[] = this.getLibsToDownload(param1);
        return _loc2_.length == 0;
    }

    public loadFigureSetData(param1: IAvatarFigureContainer, param2: IAvatarImageListener): void {
        let _loc5_: any[] = null;
        if (!this._SafeStr_5697 || !this._SafeStr_2176.renderManager.isReady) {
            this._SafeStr_3005.push([param1, param2]);
            return;
        }
        let _loc6_: string = param1.getFigureString();
        let _loc4_: any[] = this.getLibsToDownload(param1);
        if (_loc4_.length > 0) {
            if (param2 && !param2.disposed) {
                _loc5_ = this._listeners.get(_loc6_);
                if (_loc5_ == null) {
                    _loc5_ = [];
                }
                _loc5_.push(param2);
                this._listeners.set(_loc6_, _loc5_);
            }
            this._incompleteFigures.set(_loc6_, _loc4_);
            for (const _loc3_ of _loc4_ ?? []) {
                this.addToQueue(_loc3_);
            }
            this._downloadShiftTimer.start();
        } else if (param2 != null && !param2.disposed) {
            param2.avatarImageReady(_loc6_);
        }
    }

    public isMissingMandatoryLibs(): boolean {
        return this._SafeStr_4045.length > 0;
    }

    public purge(): void {
        for (const _loc1_ of this._libraries?.values() ?? []) {
            if (_loc1_.isReady && !_loc1_.isMandatory) {
                _loc1_.purge();
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

    private loadFigureMapData(param1: XML): void {
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
        let _loc4_: any;
        let _loc2_: AvatarAssetDownloadLibrary = null;
        let _loc3_: string = null;
        let _loc6_: any[] = null;
        for (const _loc5_ of param1.child("lib") ?? []) {
            _loc2_ = new AvatarAssetDownloadLibrary(_loc5_.attribute("id").toString(), _loc5_.attribute("revision").toString(), this._SafeStr_6569, this._assets, this._SafeStr_7220);
            _loc2_.addEventListener("complete", this.libraryComplete);
            this._libraries.set(_loc2_.libraryName, _loc2_);
            for (_loc4_ of _loc5_.child("part") ?? []) {
                _loc3_ = _loc4_.attribute("type") + ":" + _loc4_.attribute("id");
                _loc6_ = this._SafeStr_4011.get(_loc3_);
                if (_loc6_ == null) {
                    _loc6_ = [];
                }
                _loc6_.push(_loc2_);
                this._SafeStr_4011.set(_loc3_, _loc6_);
            }
        }
    }

    private getLibsToDownload(param1: IAvatarFigureContainer): any[] {
        let _loc9_: any;
        let _loc3_: any;
        let _loc12_: ISetType = null;
        let _loc7_: number = 0;
        let _loc5_: IFigurePartSet = null;
        let _loc11_: string = null;
        let _loc4_: any[] = null;
        let _loc8_: any[] = [];
        if (!this._SafeStr_2176) {
            return _loc8_;
        }
        if (!param1) {
            return _loc8_;
        }
        let _loc2_: IFigureSetData = this._SafeStr_2176.figureData;
        if (!_loc2_) {
            return _loc8_;
        }
        let _loc10_: any[] = param1.getPartTypeIds();
        for (const _loc6_ of _loc10_ ?? []) {
            _loc12_ = _loc2_.getSetType(stringOrNull(_loc6_));
            if (_loc12_) {
                _loc7_ = param1.getPartSetId(stringOrNull(_loc6_));
                _loc5_ = _loc12_.getPartSet(_loc7_);
                if (_loc5_) {
                    for (_loc9_ of _loc5_.parts ?? []) {
                        _loc11_ = _loc9_.type + ":" + _loc9_.id;
                        _loc4_ = this._SafeStr_4011.get(_loc11_);
                        if (_loc4_ != null) {
                            for (_loc3_ of _loc4_ ?? []) {
                                if (_loc3_ != null) {
                                    if (!_loc3_.isReady) {
                                        if (_loc8_.indexOf(_loc3_) == -1) {
                                            _loc8_.push(_loc3_);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return _loc8_;
    }

    private processPending(): void {
        let _loc1_: AvatarAssetDownloadLibrary = null;
        while (this._SafeStr_3837.length > 0 && this._SafeStr_3597.length < this._SafeStr_6260) {
            _loc1_ = this._SafeStr_3837.shift();
            this._SafeStr_3597.push(_loc1_);
            _loc1_.startDownloading();
        }
    }

    private addToQueue(param1: AvatarAssetDownloadLibrary): void {
        if (!param1.isReady && this._SafeStr_3837.indexOf(param1) == -1 && this._SafeStr_3597.indexOf(param1) == -1) {
            this._SafeStr_3837.push(param1);
        }
    }

    private onConfigurationError = (param1: Event): void => {
        let _loc2_: string = null;
        let _loc3_: URLRequest = null;
        if (this.disposed) {
            return;
        }
        this._SafeStr_4579 = this._SafeStr_4579 - 1;
        if (this._SafeStr_4579 <= 0) {
            HabboWebTools.logEventLog("Figuremap download error " + this._SafeStr_4055);
        } else {
            if (this._SafeStr_4055.indexOf("?") > 0) {
                _loc2_ = this._SafeStr_4055 + "&retry=" + this._SafeStr_4579;
            } else {
                _loc2_ = this._SafeStr_4055 + "?retry=" + this._SafeStr_4579;
            }
            this.removeMapLoaderEventListeners();
            _loc3_ = new URLRequest(_loc2_);
            this._SafeStr_2761 = this._assets.loadAssetFromFile("figuremap", _loc3_, "text/xml");
            this.addMapLoaderEventListeners();
        }
    };

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
        this.loadFigureMapData(_loc2_);
    };

    private purgeInitDownloadBuffer = (param1: Event): void => {
        let _loc2_: any = null;
        for (_loc2_ of this._SafeStr_3005 ?? []) {
            this.loadFigureSetData(_loc2_[0], _loc2_[1]);
        }
        this._SafeStr_3005 = [];
    };

    private libraryComplete = (param1: Event): void => {
        let _loc3_: any;
        let _loc7_: any;
        let _loc10_: string = null;
        let _loc4_: any[] = null;
        let _loc12_: boolean = false;
        let _loc5_: any[] = null;
        let _loc8_: AvatarAssetDownloadLibrary = null;
        let _loc9_: number = 0;
        if (this.disposed) {
            return;
        }
        let _loc11_: any[] = [];
        for (_loc10_ of this._incompleteFigures?.keys() ?? []) {
            _loc12_ = true;
            _loc4_ = this._incompleteFigures.get(_loc10_);
            for (_loc3_ of _loc4_ ?? []) {
                if (!_loc3_.isReady) {
                    _loc12_ = false;
                    break;
                }
            }
            if (_loc12_) {
                _loc11_.push(_loc10_);
                _loc5_ = this._listeners.get(_loc10_);
                for (_loc7_ of _loc5_ ?? []) {
                    if (_loc7_ != null && !_loc7_.disposed) {
                        _loc7_.avatarImageReady(_loc10_);
                    }
                }
                this._listeners.delete(_loc10_);
            }
        }
        for (_loc10_ of _loc11_ ?? []) {
            this._incompleteFigures.delete(_loc10_);
        }
        let _loc6_: string = (asInstanceOf(param1.target, AvatarAssetDownloadLibrary)).libraryName;
        let _loc2_: number = this._SafeStr_4045.indexOf(_loc6_);
        if (_loc2_ != -1) {
            this._SafeStr_4045.splice(_loc2_, 1);
            if (this._SafeStr_4045.length == 0) {
                this._manager.onMandatoryLibrariesReady();
            }
        }
        _loc9_ = 0;
        while (_loc9_ < this._SafeStr_3597.length) {
            _loc8_ = this._SafeStr_3597[_loc9_];
            if (_loc8_.libraryName == _loc6_) {
                this._SafeStr_3597.splice(_loc9_, 1);
            }
            _loc9_++;
        }
        if (_loc11_.length > 0) {
            this.dispatchEvent(new LibraryLoadedEvent("LIBRARY_LOADED", _loc6_));
        }
        this._downloadShiftTimer.start();
    };

    private onNextDownloadTimeout = (param1: Event = null): void => {
        this.processPending();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (AvatarAssetDownloadManager.#staticsReady) return;
        AvatarAssetDownloadManager.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(AvatarAssetDownloadManager, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log_AvatarAssetDownloadManager", null);
        set("_log_AvatarAssetDownloadManager", new SimpleLogger("com.sulake.habbo.avatar.AvatarAssetDownloadManager"));
    }
}
