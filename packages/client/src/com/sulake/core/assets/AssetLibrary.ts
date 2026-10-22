import { asGuarded, asInstanceOf, castTo, isClass, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLoader } from '@/com/sulake/core/assets/loaders/IAssetLoader';
import type { LibraryLoaderEvent } from '@/com/sulake/core/utils/LibraryLoaderEvent';
import type { FZip } from '@/deng/fzip/FZip';
import type { FZipFile } from '@/deng/fzip/FZipFile';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { File } from '@habbo-pixi/runtime/filesystem/File';
import { FileStream } from '@habbo-pixi/runtime/filesystem/FileStream';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { System } from '@habbo-pixi/runtime/system/System';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { DisplayAsset } from '@/com/sulake/core/assets/DisplayAsset';
import { isIAsset } from '@/com/sulake/core/assets/IAsset';
import { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import { isIAssetLoader } from '@/com/sulake/core/assets/loaders/IAssetLoader';
import { SoundAsset } from '@/com/sulake/core/assets/SoundAsset';
import { TextAsset } from '@/com/sulake/core/assets/TextAsset';
import { TypeFaceAsset } from '@/com/sulake/core/assets/TypeFaceAsset';
import { UnknownAsset } from '@/com/sulake/core/assets/UnknownAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { AssetLoaderStruct, BinaryFileLoader, BitmapFileLoader, CachedAssetLoader, Core, EventDispatcherWrapper, LazyAssetProcessor, LibraryLoader, SoundFileLoader, TextFileLoader, ZipFileLoader } from '@/com/sulake/core/runtime/Component.group';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class AssetLibrary extends EventDispatcherWrapper implements IAssetLibrary {
    static { registerClassName(this, 'com.sulake.core.assets::AssetLibrary'); }

    static #staticsReady = false;

    private static get _log_AssetLibrary(): SimpleLogger {
        AssetLibrary.#initStatics();
        return AssetLibrary._log_AssetLibrary;
    }

    public static readonly ASSET_LIBRARY_READY: string = "AssetLibraryReady";
    public static readonly ASSET_LIBRARY_LOADED: string = "AssetLibraryLoaded";
    public static readonly ASSET_LIBRARY_UNLOADED: string = "AssetLibraryUnloaded";
    public static readonly ASSET_LIBRARY_LOAD_ERROR: string = "AssetLibraryLoadError";
    private static readonly NAME: string = "name";
    private static readonly ASSET: string = "asset";
    private static readonly PARAM: string = "param";
    private static readonly TYPE: string = "mimeType";
    private static readonly LIB: string = "library";
    private static readonly REF: string = "ref";
    private static readonly CACHE_MAGIC: number = 1212302145;
    private static readonly CACHE_VERSION: number = 1;
    private static readonly USE_LAZY_ASSET_PROCESSOR: boolean = false;
    private static _sharedListOfTypesByMime: Map<any, any>;
    private static _SafeStr_6169: boolean = false;
    private static _SafeStr_5551: string = "";
    private static _SafeStr_7097: boolean = false;

    private static get _SafeStr_6321(): LazyAssetProcessor {
        AssetLibrary.#initStatics();
        return AssetLibrary._SafeStr_6321;
    }
    private static set _SafeStr_6321(value: LazyAssetProcessor) {
        AssetLibrary.#initStatics();
        AssetLibrary._SafeStr_6321 = value;
    }

    private static _numAssetLibraryInstances: number = 0;

    public static get numAssetLibraryInstances(): number {
        return AssetLibrary._numAssetLibraryInstances;
    }

    private static _assetLibraryRefArray: any[] = [];

    public static get assetLibraryRefArray(): any[] {
        return AssetLibrary._assetLibraryRefArray;
    }

    public static setCacheNamespace(param1: string): void {
        AssetLibrary._SafeStr_5551 = param1 != null ? param1 : "";
    }

    public static enableGamedataCache(): void {
        AssetLibrary._SafeStr_7097 = true;
        let _loc1_: File = File.applicationStorageDirectory.resolvePath("habbo_cache");
        AssetLibrary.debug("[AssetLibrary] Game data cache enabled, directory: " + _loc1_.nativePath);
        AssetLibrary.cleanupCacheTempFiles(_loc1_);
    }

    public static setDebugLogsEnabled(param1: boolean): void {
        AssetLibrary._SafeStr_6169 = param1;
    }

    private static debug(param1: string): void {
        if (param1.indexOf("[AssetLibrary] ") == 0) {
            param1 = param1.substring(15);
        }
        if (param1.indexOf("Failed") == 0 || param1.indexOf("Cannot") == 0 || param1.indexOf("Cache cleanup error") == 0 || param1.indexOf("Cache delete error") == 0 || param1.indexOf("Cache read error") == 0 || param1.indexOf("Cache write error") == 0) {
            AssetLibrary._log_AssetLibrary.warn(param1);
        } else {
            AssetLibrary._log_AssetLibrary.info(param1);
        }
        if (AssetLibrary._SafeStr_6169) {
            Core.debug(param1);
        }
    }

    private static cleanupCacheTempFiles(param1: File): void {
        let _loc3_: any[] = null;
        try {
            if (!param1.exists) {
                return;
            }
            _loc3_ = param1.getDirectoryListing();
            for (const _loc2_ of _loc3_ ?? []) {
                if (_loc2_.isDirectory) {
                    AssetLibrary.cleanupCacheTempFiles(_loc2_);
                } else if (_loc2_.name.indexOf(".tmp") == _loc2_.name.length - 4) {
                    _loc2_.deleteFile();
                }
            }
        } catch (e) {
            AssetLibrary.debug("[AssetLibrary] Cache cleanup error: " + e.message);
        }
    }

    private static fetchLibraryContents(param1: AssetLibrary, param2: XML, param3: any, param4: FZip = null): boolean {
        let _loc5_: any = null;
        let _loc14_: string = null;
        let _loc9_: string = null;
        let _loc7_: any = null;
        let _loc16_: IAsset = null;
        let _loc13_: XMLList = null;
        let _loc10_: XMLList = null;
        let _loc8_: string = null;
        let _loc11_: FZipFile = null;
        if (param3 == null && param4 == null) {
            throw new Error("Library " + param1._SafeStr_2883 + " doesn\'t contain valid resource class!");
        }
        let _loc6_: XMLList = param2.child("library");
        if (_loc6_ == null) {
            throw new Error("Provided manifest doesn\'t contain library node!");
        }
        let _loc15_: any = null;
        let _loc12_: any = null;
        _loc10_ = _loc6_.item(0).child("assets");
        if (_loc10_ != null) {
            _loc10_ = _loc10_.child("asset");
            for (_loc5_ of _loc10_ ?? []) {
                _loc14_ = _loc5_.attribute("name").toString();
                _loc9_ = _loc5_.attribute("mimeType").toString();
                if (_loc9_ == _loc12_) {
                    _loc7_ = _loc15_;
                } else {
                    _loc7_ = param1.getAssetTypeDeclarationByMimeType(_loc9_);
                    _loc12_ = _loc9_;
                    _loc15_ = _loc7_;
                }
                if (_loc7_ != null) {
                    _loc16_ = asGuarded(new _loc7_.assetClass(_loc7_), isIAsset);
                    if (param4 != null && param4.getFileCount() > 0) {
                        _loc8_ = ".png";
                        if (_loc16_ instanceof BitmapDataAsset) {
                            _loc8_ = ".png";
                        }
                        if (_loc16_ instanceof XmlAsset) {
                            _loc8_ = ".xml";
                        }
                        _loc11_ = param4.getFileByName(_loc14_ + _loc8_);
                        if (_loc11_) {
                            _loc16_.setUnknownContent(_loc11_.content);
                        }
                    } else {
                        _loc16_.setUnknownContent(param3[_loc14_]);
                    }
                    _loc13_ = _loc5_.child("param");
                    if (_loc13_.length()) {
                        _loc16_.setParamsDesc(_loc13_);
                    }
                    param1.setAsset(_loc14_, _loc16_);
                } else {
                    AssetLibrary.debug("Failed to extract asset " + _loc14_ + " from Library " + param1._SafeStr_2883 + "!");
                }
            }
        }
        _loc10_ = _loc6_.item(0).child("aliases");
        if (_loc10_ != null) {
            _loc10_ = _loc10_.child("asset");
            for (_loc5_ of _loc10_ ?? []) {
                _loc14_ = _loc5_.attribute("name").toString();
                _loc9_ = _loc5_.attribute("mimeType").toString();
                if (_loc9_ == _loc12_) {
                    _loc7_ = _loc15_;
                } else {
                    _loc7_ = param1.getAssetTypeDeclarationByMimeType(_loc9_);
                    _loc12_ = _loc9_;
                    _loc15_ = _loc7_;
                }
                if (_loc7_ != null) {
                    _loc16_ = asGuarded(new _loc7_.assetClass(_loc7_), isIAsset);
                    _loc16_.setUnknownContent(param1.getAssetByName(_loc5_.attribute("ref").toString()).content);
                    _loc13_ = _loc5_.child("param");
                    if (_loc13_.length()) {
                        _loc16_.setParamsDesc(_loc13_);
                    }
                    param1.setAsset(_loc14_, _loc16_);
                } else {
                    AssetLibrary.debug("Failed to extract asset alias " + _loc14_ + " from Library " + param1._SafeStr_2883 + "!");
                }
            }
        }
        return true;
    }

    constructor(param1: string, param2: XML = null) {
        super();
        this._name = param1;
        this._manifest = param2;
        this._numAssets = 0;
        this._assetNameArray = [];
        if (AssetLibrary._sharedListOfTypesByMime == null) {
            AssetLibrary._sharedListOfTypesByMime = new Dictionary();
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("application/octet-stream", UnknownAsset, BinaryFileLoader));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("application/x-shockwave-flash", DisplayAsset, BitmapFileLoader, "swf"));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("application/x-font-truetype", TypeFaceAsset, BinaryFileLoader, "ttf", "otf"));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("application/zip", UnknownAsset, ZipFileLoader, "zip"));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("text/xml", XmlAsset, TextFileLoader, "xml"));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("text/html", XmlAsset, TextFileLoader, "htm", "html"));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("text/plain", TextAsset, TextFileLoader, "txt"));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("image/jpeg", BitmapDataAsset, BitmapFileLoader, "jpg", "jpeg"));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("image/gif", BitmapDataAsset, BitmapFileLoader, "gif"));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("image/png", BitmapDataAsset, BitmapFileLoader, "png"));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("image/tiff", BitmapDataAsset, BitmapFileLoader, "tif", "tiff"));
            this.registerAssetTypeDeclaration(new AssetTypeDeclaration("sound/mp3", SoundAsset, SoundFileLoader, "mp3"));
        }
        AssetLibrary._numAssetLibraryInstances = AssetLibrary._numAssetLibraryInstances + 1 >>> 0;
        this._localListOfTypesByMime = new Dictionary();
        this._SafeStr_2890 = new Dictionary();
        this._loadedClasses = new Dictionary();
        this._SafeStr_2351 = new Dictionary();
        AssetLibrary._assetLibraryRefArray.push(this);
    }

    declare private _SafeStr_2883: string;

    declare private _manifest: XML;

    declare private _isReady: boolean;
    static { (this.prototype as any)._isReady = false; }

    declare private _numAssets: number;
    static { (this.prototype as any)._numAssets = 0; }

    declare private _loader: LibraryLoader;

    declare private _resource: any;

    declare private _loadedClasses: Map<any, any>;

    declare private _SafeStr_2351: Map<any, any>;

    private _SafeStr_3674: boolean = true;

    declare private _SafeStr_2890: Map<any, any>;

    declare private _assetNameArray: any[];

    declare private _localListOfTypesByMime: Map<any, any>;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get url(): string {
        return this._SafeStr_2883;
    }

    public get isReady(): boolean {
        return this._isReady;
    }

    public get manifest(): XML {
        return this._manifest ? this._manifest : (this._manifest = new XML());
    }

    public get numAssets(): number {
        return this._numAssets;
    }

    public get nameArray(): any[] {
        return this._assetNameArray;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this.unload();
            super.dispose();
            AssetLibrary._assetLibraryRefArray.splice(AssetLibrary._assetLibraryRefArray.indexOf(this), 1);
            AssetLibrary._numAssetLibraryInstances = AssetLibrary._numAssetLibraryInstances - 1 >>> 0;
            this._SafeStr_2890 = null;
            this._loadedClasses = null;
            this._SafeStr_2351 = null;
            this._assetNameArray = null;
            System.disposeXML(this._manifest);
            this._manifest = null;
            this._numAssets = 0;
            this._isReady = false;
            this._name = null;
        }
    }

    public loadFromFile(param1: LibraryLoader, param2: boolean = true): void {
        if (this._SafeStr_2883 == param1.url && this._isReady) {
            if (!this._SafeStr_3674 && param2) {
                AssetLibrary.fetchLibraryContents(this, this._manifest, this._resource);
            }
            this._SafeStr_3674 = param2;
            this.dispatchEvent(new Event("AssetLibraryReady"));
        } else {
            if (this._loader == null || this._loader.disposed) {
                this._loader = param1;
                this._loader.addEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.libraryLoadedHandler);
                this._loader.addEventListener("LIBRARY_LOADER_EVENT_ERROR", this.loadErrorHandler);
            }
            this._SafeStr_3674 = param2;
            this._SafeStr_2883 = this._loader.url;
        }
    }

    public loadFromResource(param1: XML, param2: any): boolean {
        return AssetLibrary.fetchLibraryContents(this, param1, param2);
    }

    public unload(): void {
        let _loc2_: string = null;
        let _loc1_: AssetLoaderStruct = null;
        let _loc3_: IAsset = null;
        for (_loc2_ of this._SafeStr_2890?.keys() ?? []) {
            _loc1_ = this._SafeStr_2890.get(_loc2_);
            _loc1_.assetLoader.dispose();
            this._SafeStr_2890.delete(_loc2_);
        }
        for (_loc2_ of this._SafeStr_2351?.keys() ?? []) {
            _loc3_ = this._SafeStr_2351.get(_loc2_);
            _loc3_.dispose();
            this._SafeStr_2351.delete(_loc2_);
        }
        for (_loc2_ of this._loadedClasses?.keys() ?? []) {
            this._loadedClasses.delete(_loc2_);
        }
        if (this._loader != null) {
            this._loader.dispose();
            this._loader = null;
        }
        this._numAssets = 0;
        this._isReady = false;
        this._SafeStr_2883 = null;
        this.dispatchEvent(new Event("AssetLibraryUnloaded"));
    }

    public getClass(param1: string): any {
        let _loc2_: any = this._loadedClasses.get(param1);
        if (_loc2_ != null) {
            return _loc2_;
        }
        if (this._loader != null) {
            if (this._loader.hasDefinition(param1)) {
                _loc2_ = asGuarded(this._loader.getDefinition(param1), isClass);
                if (_loc2_ != null) {
                    this._loadedClasses.set(param1, _loc2_);
                    return _loc2_;
                }
            }
        }
        return null;
    }

    public loadAssetFromFile(param1: string, param2: URLRequest, param3: string = null, param4: number = -1): AssetLoaderStruct {
        let struct: AssetLoaderStruct;
        let decl: AssetTypeDeclaration;
        let cachedBytes: ByteArray;
        let cachedContent: any;
        let cachedLoader: IAssetLoader;
        let timer: Timer;
        let loader: IAssetLoader;
        let assetName: string = param1;
        let url: URLRequest = param2;
        let mimeType: string = param3;
        let id: number = param4;
        if (this.getAssetByName(assetName) != null) {
            throw new Error("Asset with name " + assetName + " already exists!");
        }
        struct = this._SafeStr_2890.get(url.url);
        if (struct != null) {
            if (struct.assetName == assetName) {
                return struct;
            }
        }
        if (mimeType == null) {
            decl = this.solveAssetTypeDeclarationFromUrl(url.url);
            if (decl == null) {
                throw new Error("Couldn\'t solve asset type for file " + url.url + "!");
            }
        } else {
            decl = this.getAssetTypeDeclarationByMimeType(mimeType, true);
            if (decl == null) {
                throw new Error("Asset type declaration for mime type " + mimeType + "not found!");
            }
        }
        cachedBytes = this.readCachedAssetData(url.url, decl.mimeType);
        if (cachedBytes != null) {
            AssetLibrary.debug("[AssetLibrary] Cache hit: " + url.url);
            cachedContent = this.buildCachedContent(decl.mimeType, cachedBytes);
            cachedLoader = new CachedAssetLoader(url.url, decl.mimeType, cachedContent, cachedBytes, id);
            cachedLoader.addEventListener("AssetLoaderEventComplete", this.assetLoadEventHandler);
            cachedLoader.addEventListener("AssetLoaderEventError", this.assetLoadEventHandler);
            cachedLoader.addEventListener("AssetLoaderEventUnload", this.assetLoadEventHandler);
            cachedLoader.addEventListener("AssetLoaderEventProgress", this.assetLoadEventHandler);
            cachedLoader.addEventListener("AssetLoaderEventStatus", this.assetLoadEventHandler);
            cachedLoader.addEventListener("AssetLoaderEventOpen", this.assetLoadEventHandler);
            struct = new AssetLoaderStruct(assetName, cachedLoader);
            this._SafeStr_2890.set(url.url, struct);
            timer = new Timer(10, 1);
            timer.addEventListener("timer", (param1: TimerEvent): void => {
                    cachedLoader.dispatchEvent(new AssetLoaderEvent("AssetLoaderEventComplete", 200));
                });
            timer.start();
            return struct;
        }
        if (this.shouldCacheAssetUrl(url.url)) {
            AssetLibrary.debug("[AssetLibrary] Cache miss: " + url.url);
        }
        loader = new decl.loaderClass(decl.mimeType, url, id);
        if (loader == null) {
            throw new Error("Invalid file loader class defined for mime type " + mimeType + "!");
        }
        loader.addEventListener("AssetLoaderEventComplete", this.assetLoadEventHandler);
        loader.addEventListener("AssetLoaderEventError", this.assetLoadEventHandler);
        loader.addEventListener("AssetLoaderEventUnload", this.assetLoadEventHandler);
        loader.addEventListener("AssetLoaderEventProgress", this.assetLoadEventHandler);
        loader.addEventListener("AssetLoaderEventStatus", this.assetLoadEventHandler);
        loader.addEventListener("AssetLoaderEventOpen", this.assetLoadEventHandler);
        struct = new AssetLoaderStruct(assetName, loader);
        this._SafeStr_2890.set(url.url, struct);
        return struct;
    }

    public getAssetByName(param1: string): IAsset {
        let _loc2_: IAsset = this._SafeStr_2351.get(param1);
        if (_loc2_ != null) {
            return _loc2_;
        }
        if (this._SafeStr_3674) {
            return null;
        }
        _loc2_ = this.fetchAssetFromResource(param1);
        if (_loc2_ == null) {
        }
        return _loc2_;
    }

    public getAssetByIndex(param1: number): IAsset {
        return param1 < this._assetNameArray.length ? this.getAssetByName(stringOrNull(this._assetNameArray[param1])) : null;
    }

    public getAssetByContent(param1: any): IAsset {
        let _loc3_: IAsset = null;
        let _loc2_: string = null;
        for (_loc2_ of this._SafeStr_2351?.keys() ?? []) {
            _loc3_ = this._SafeStr_2351.get(_loc2_);
            if (_loc3_.content === param1) {
                return _loc3_;
            }
        }
        return null;
    }

    public getAssetIndex(param1: IAsset): number {
        let _loc2_: string = null;
        for (_loc2_ of this._SafeStr_2351?.keys() ?? []) {
            if (this._SafeStr_2351.get(_loc2_) == param1) {
                return this._assetNameArray.indexOf(_loc2_);
            }
        }
        return -1;
    }

    public hasAsset(param1: string): boolean {
        return this._SafeStr_2351.get(param1) != null || (this._resource != null ? this._resource[param1] != null : false);
    }

    public setAsset(param1: string, param2: IAsset, param3: boolean = true): boolean {
        let _loc4_: any = this._SafeStr_2351.get(param1) == null;
        if ((param3 || _loc4_) && param2) {
            if (_loc4_) {
                this._numAssets = this._numAssets + 1 >>> 0;
                this._assetNameArray.push(param1);
            }
            this._SafeStr_2351.set(param1, param2);
            return true;
        }
        return false;
    }

    public createAsset(param1: string, param2: AssetTypeDeclaration): IAsset {
        if (this.hasAsset(param1) || !param2) {
            return null;
        }
        let _loc3_: IAsset = new param2.assetClass(param2);
        if (!this.setAsset(param1, _loc3_)) {
            _loc3_.dispose();
            _loc3_ = null;
        }
        return _loc3_;
    }

    public removeAsset(param1: IAsset): IAsset {
        let _loc2_: string = null;
        if (param1) {
            for (_loc2_ of this._SafeStr_2351?.keys() ?? []) {
                if (this._SafeStr_2351.get(_loc2_) == param1) {
                    this._assetNameArray.splice(this._assetNameArray.indexOf(_loc2_), 1);
                    this._SafeStr_2351.delete(_loc2_);
                    this._numAssets = this._numAssets - 1 >>> 0;
                    return param1;
                }
            }
        }
        return null;
    }

    public registerAssetTypeDeclaration(param1: AssetTypeDeclaration, param2: boolean = true): boolean {
        if (param2) {
            if (AssetLibrary._sharedListOfTypesByMime.has(param1.mimeType)) {
                throw new Error("Asset type " + param1.mimeType + " already registered!");
            }
            AssetLibrary._sharedListOfTypesByMime.set(param1.mimeType, param1);
        } else {
            if (this._localListOfTypesByMime.has(param1.mimeType)) {
                throw new Error("Asset type " + param1.mimeType + " already registered!");
            }
            this._localListOfTypesByMime.set(param1.mimeType, param1);
        }
        return true;
    }

    public getAssetTypeDeclarationByMimeType(param1: string, param2: boolean = true): AssetTypeDeclaration {
        let _loc3_: AssetTypeDeclaration = null;
        if (param2) {
            _loc3_ = castTo(AssetLibrary._sharedListOfTypesByMime.get(param1), AssetTypeDeclaration);
            if (_loc3_ != null) {
                return _loc3_;
            }
        }
        return castTo(this._localListOfTypesByMime.get(param1), AssetTypeDeclaration);
    }

    public getAssetTypeDeclarationByClass(param1: any, param2: boolean = true): AssetTypeDeclaration {
        let _loc4_: string = null;
        let _loc3_: AssetTypeDeclaration = null;
        if (param2) {
            for (_loc4_ of AssetLibrary._sharedListOfTypesByMime?.keys() ?? []) {
                _loc3_ = castTo(AssetLibrary._sharedListOfTypesByMime.get(_loc4_), AssetTypeDeclaration);
                if (_loc3_ != null) {
                    if (_loc3_.assetClass == param1) {
                        return _loc3_;
                    }
                }
            }
        }
        for (_loc4_ of this._localListOfTypesByMime?.keys() ?? []) {
            _loc3_ = castTo(this._localListOfTypesByMime.get(_loc4_), AssetTypeDeclaration);
            if (_loc3_ != null) {
                if (_loc3_.assetClass == param1) {
                    return _loc3_;
                }
            }
        }
        return null;
    }

    public getAssetTypeDeclarationByFileName(param1: string, param2: boolean = true): AssetTypeDeclaration {
        let _loc5_: string = null;
        let _loc4_: AssetTypeDeclaration = null;
        let _loc3_: string = param1.substr(param1.lastIndexOf(".") + 1, param1.length);
        if (_loc3_.indexOf("?")) {
            _loc3_ = _loc3_.substr(0, _loc3_.indexOf("?") - 1);
        }
        if (param2) {
            for (_loc5_ of AssetLibrary._sharedListOfTypesByMime?.keys() ?? []) {
                _loc4_ = castTo(AssetLibrary._sharedListOfTypesByMime.get(_loc5_), AssetTypeDeclaration);
                if (_loc4_ != null) {
                    if (_loc4_.fileTypes.indexOf(_loc3_)) {
                        return _loc4_;
                    }
                }
            }
        }
        for (_loc5_ of this._localListOfTypesByMime?.keys() ?? []) {
            _loc4_ = castTo(this._localListOfTypesByMime.get(_loc5_), AssetTypeDeclaration);
            if (_loc4_ != null) {
                if (_loc4_.fileTypes.indexOf(_loc3_)) {
                    return _loc4_;
                }
            }
        }
        return null;
    }

    public toString(): string {
        return getQualifiedClassName(this) + ": " + this._name;
    }

    private readCachedAssetData(param1: string, param2: string): ByteArray {
        let _loc12_: any;
        let _loc3_: File = null;
        let _loc5_: FileStream = null;
        let _loc4_: ByteArray = null;
        let _loc6_: ByteArray = null;
        if (!this.shouldCacheAssetUrl(param1)) {
            return null;
        }
        try {
            _loc3_ = this.getCacheFile(param1);
            if (!_loc3_.exists) {
                AssetLibrary.debug("[AssetLibrary] Cache read miss: " + _loc3_.nativePath);
                return null;
            }
            _loc5_ = new FileStream();
            _loc4_ = new ByteArray();
            _loc5_.open(_loc3_, "read");
            _loc5_.readBytes(_loc4_, 0, _loc5_.bytesAvailable);
            _loc5_.close();
            _loc4_.position = 0;
            _loc6_ = this.parseCachedPayload(_loc4_, param2);
            if (_loc6_ == null || _loc6_.length == 0) {
                this.deleteCacheFile(_loc3_);
                return null;
            }
            if (param2 == "text/xml" && !this.isValidXmlPayload(_loc6_)) {
                this.deleteCacheFile(_loc3_);
                return null;
            }
            AssetLibrary.debug("[AssetLibrary] Cache read hit: " + _loc3_.nativePath + " (" + _loc6_.length + " bytes)");
            _loc6_.position = 0;
            return _loc6_;
        } catch (e) {
            AssetLibrary.debug("[AssetLibrary] Cache read error: " + e.message);
            _loc12_ = null;
        }
        return _loc12_;
    }

    private writeCachedAssetData(param1: string, param2: string, param3: any, param4: ByteArray): void {
        let _loc5_: File = null;
        let _loc7_: File = null;
        let _loc6_: FileStream = null;
        let _loc8_: ByteArray = null;
        if (!this.shouldCacheAssetUrl(param1)) {
            return;
        }
        try {
            _loc5_ = this.getCacheFile(param1);
            if (!_loc5_.parent.exists) {
                _loc5_.parent.createDirectory();
            }
            _loc7_ = _loc5_.parent.resolvePath(_loc5_.name + ".tmp");
            _loc6_ = new FileStream();
            _loc6_.open(_loc7_, "write");
            _loc8_ = this.buildCacheFileBytes(param2, param3, param4);
            _loc6_.writeBytes(_loc8_);
            _loc6_.close();
            _loc7_.moveTo(_loc5_, true);
            AssetLibrary.debug("[AssetLibrary] Cache write: " + _loc5_.nativePath + " (" + _loc5_.size + " bytes)");
        } catch (e) {
            AssetLibrary.debug("[AssetLibrary] Cache write error: " + e.message);
        }
    }

    private buildCachedContent(param1: string, param2: ByteArray): any {
        if (param1 && param1.indexOf("text/") == 0) {
            param2.position = 0;
            return param2.readUTFBytes(param2.length);
        }
        param2.position = 0;
        return param2;
    }

    private buildCacheFileBytes(param1: string, param2: any, param3: ByteArray): ByteArray {
        let _loc6_: string = null;
        let _loc4_: ByteArray = new ByteArray();
        if (param3 != null && param3.length > 0) {
            param3.position = 0;
            _loc4_.writeBytes(param3);
        } else if (param2 instanceof ByteArray) {
            _loc4_.writeBytes(castTo(param2, ByteArray));
        } else {
            _loc6_ = "";
            if (param2 instanceof XML) {
                _loc6_ = XML.from(param2).toString();
            } else if (typeof param2 === "string") {
                _loc6_ = String(param2);
            }
            _loc4_.writeUTFBytes(_loc6_);
        }
        let _loc5_: string = param1 != null ? param1 : "";
        let _loc8_: ByteArray = new ByteArray();
        _loc8_.writeUTFBytes(_loc5_);
        let _loc7_: ByteArray = new ByteArray();
        _loc7_.writeUnsignedInt(1212302145);
        _loc7_.writeShort(1);
        _loc7_.writeShort(_loc8_.length | 0);
        _loc7_.writeBytes(_loc8_);
        _loc7_.writeUnsignedInt(_loc4_.length);
        _loc7_.writeBytes(_loc4_);
        _loc7_.position = 0;
        return _loc7_;
    }

    private parseCachedPayload(param1: ByteArray, param2: string): ByteArray {
        if (param1.length < 12) {
            return param1;
        }
        param1.position = 0;
        let _loc3_: number = param1.readUnsignedInt();
        if (_loc3_ != 1212302145) {
            param1.position = 0;
            return param1;
        }
        let _loc7_: number = param1.readUnsignedShort();
        if (_loc7_ != 1) {
            return null;
        }
        if (param1.bytesAvailable < 2) {
            return null;
        }
        let _loc4_: number = param1.readUnsignedShort();
        if (param1.bytesAvailable < _loc4_ + 4) {
            return null;
        }
        let _loc8_: string = _loc4_ > 0 ? param1.readUTFBytes(_loc4_) : "";
        if (param2 != null && _loc8_ != "" && _loc8_ != param2) {
            return null;
        }
        let _loc6_: number = param1.readUnsignedInt();
        if (param1.bytesAvailable < _loc6_) {
            return null;
        }
        let _loc5_: ByteArray = new ByteArray();
        if (_loc6_ > 0) {
            param1.readBytes(_loc5_, 0, _loc6_);
        }
        _loc5_.position = 0;
        return _loc5_;
    }

    private isValidXmlPayload(param1: ByteArray): boolean {
        let _loc5_: boolean = false;
        let _loc2_: string = null;
        try {
            param1.position = 0;
            _loc2_ = param1.readUTFBytes(param1.length);
            new XML(_loc2_);
            param1.position = 0;
            return true;
        } catch (e) {
            _loc5_ = false;
        }
        return _loc5_;
    }

    private deleteCacheFile(param1: File): void {
        try {
            if (param1.exists) {
                param1.deleteFile();
            }
        } catch (e) {
            AssetLibrary.debug("[AssetLibrary] Cache delete error: " + e.message);
        }
    }

    private shouldCacheAssetUrl(param1: string): boolean {
        if (!AssetLibrary._SafeStr_7097) {
            return false;
        }
        if (!this.hasHashedSuffix(param1)) {
            return false;
        }
        return param1.indexOf("/gamedata/figuredata/") > -1 || param1.indexOf("/gamedata/furnidata_xml/") > -1 || param1.indexOf("/gamedata/productdata_xml/") > -1 || param1.indexOf("/gamedata/external_variables/") > -1 || param1.indexOf("/gamedata/external_flash_texts/") > -1;
    }

    private hasHashedSuffix(param1: string): boolean {
        let _loc4_: number = param1.indexOf("?");
        let _loc5_: string = _loc4_ > -1 ? param1.substring(0, _loc4_) : param1;
        let _loc2_: number = _loc5_.lastIndexOf("/");
        if (_loc2_ < 0 || _loc2_ == _loc5_.length - 1) {
            return false;
        }
        let _loc3_: string = _loc5_.substring(_loc2_ + 1);
        if (_loc3_ == "1") {
            return false;
        }
        return /^[0-9a-f]{32,}$/i.test(_loc3_);
    }

    private getCacheFile(param1: string): File {
        let _loc2_: File = File.applicationStorageDirectory.resolvePath("habbo_cache");
        let _loc4_: string = this.cacheDirNameForUrl(param1);
        if (_loc4_ != "") {
            _loc2_ = _loc2_.resolvePath(_loc4_);
        }
        let _loc3_: string = this.cacheKeyForUrl(param1);
        return _loc2_.resolvePath(_loc3_);
    }

    private cacheDirNameForUrl(param1: string): string {
        if (AssetLibrary._SafeStr_5551 != "") {
            return AssetLibrary._SafeStr_5551.replace(/[^a-zA-Z0-9._-]/g, "_");
        }
        let _loc2_: string = this.extractUrlHost(param1);
        if (_loc2_ == "") {
            return "";
        }
        return _loc2_.replace(/[^a-zA-Z0-9._-]/g, "_");
    }

    private extractUrlHost(param1: string): string {
        let _loc2_: number = param1.indexOf("://");
        if (_loc2_ < 0) {
            return "";
        }
        let _loc3_: number = _loc2_ + 3;
        let _loc4_: number = param1.indexOf("/", _loc3_);
        if (_loc4_ < 0) {
            _loc4_ = param1.length;
        }
        return param1.substring(_loc3_, _loc4_);
    }

    private cacheKeyForUrl(param1: string): string {
        let _loc2_: number = param1.lastIndexOf("/");
        let _loc4_: string = _loc2_ >= 0 ? param1.substr(_loc2_ + 1) : param1;
        let _loc3_: string = _loc4_.replace(/[^a-zA-Z0-9._-]/g, "_");
        if (_loc3_.length == 0) {
            _loc3_ = this.simpleHash(param1);
        }
        return _loc3_;
    }

    private simpleHash(param1: string): string {
        let _loc2_: number = 0;
        let _loc3_: any = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.length) {
            _loc3_ = (_loc3_ << 5) - _loc3_ + param1.charCodeAt(_loc2_);
            _loc3_ |= 0;
            _loc2_++;
        }
        return (_loc3_ >>> 0).toString(16);
    }

    private solveAssetTypeDeclarationFromUrl(param1: string): AssetTypeDeclaration {
        let _loc4_: number = 0;
        let _loc2_: AssetTypeDeclaration = null;
        let _loc5_: any[] = null;
        let _loc3_: string = null;
        _loc4_ = param1.indexOf("?", 0);
        if (_loc4_ > 0) {
            param1 = param1.slice(0, _loc4_);
        }
        _loc4_ = param1.lastIndexOf(".");
        if (_loc4_ == -1) {
            return null;
        }
        param1 = param1.slice(_loc4_ + 1, param1.length);
        for (_loc3_ of this._localListOfTypesByMime?.keys() ?? []) {
            _loc2_ = this._localListOfTypesByMime.get(_loc3_);
            _loc5_ = _loc2_.fileTypes;
            if (_loc5_ != null) {
                if (_loc5_.indexOf(param1, 0) > -1) {
                    return _loc2_;
                }
            }
        }
        for (_loc3_ of AssetLibrary._sharedListOfTypesByMime?.keys() ?? []) {
            _loc2_ = AssetLibrary._sharedListOfTypesByMime.get(_loc3_);
            _loc5_ = _loc2_.fileTypes;
            if (_loc5_ != null) {
                if (_loc5_.indexOf(param1, 0) > -1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }

    private fetchAssetFromResource(param1: string): IAsset {
        let _loc3_: AssetTypeDeclaration = null;
        let _loc4_: XMLList = null;
        let _loc2_: XML = null;
        let _loc6_: any = 0;
        if (!this._resource) {
            return null;
        }
        let _loc7_: XMLList = this._manifest.child("library");
        if (_loc7_ == null) {
            throw new Error("Provided manifest doesn\'t contain library node!");
        }
        if (_loc7_.length() == 0) {
            return null;
        }
        _loc7_ = _loc7_.item(0).child("assets");
        if (_loc7_ != null) {
            _loc7_ = _loc7_.child("asset");
            if (_loc7_ != null) {
                let _loc8_: IAsset = null;
                let _loc5_: number = _loc7_.length();
                _loc6_ = 0;
                while (_loc6_ < _loc5_) {
                    _loc2_ = _loc7_.getProperty(_loc6_);
                    if (_loc2_.attribute("name") && _loc2_.attribute("name").toString() == param1) {
                        _loc3_ = this.getAssetTypeDeclarationByMimeType(_loc2_.attribute("mimeType").toString());
                        if (_loc3_ == null) {
                            throw new Error("Failed to extract asset " + param1 + " from Library " + this._SafeStr_2883 + "!");
                        }
                        _loc8_ = asGuarded(new _loc3_.assetClass(_loc3_), isIAsset);
                        _loc8_.setUnknownContent(this._resource[param1]);
                        _loc4_ = _loc2_.child("param");
                        if (_loc4_ && _loc4_.length()) {
                            _loc8_.setParamsDesc(_loc4_);
                        }
                        this.setAsset(param1, _loc8_);
                        return _loc8_;
                    }
                    _loc6_++;
                }
            }
        }
        return null;
    }

    private assetLoadEventHandler = (param1: AssetLoaderEvent): void => {
        let _loc5_: string = null;
        let _loc3_: AssetTypeDeclaration = null;
        let _loc6_: IAsset = null;
        let _loc7_: boolean = false;
        let _loc4_: IAssetLoader = asGuarded(param1.target, isIAssetLoader);
        if (_loc4_ == null) {
            throw new Error("Failed to downcast object to asset loader!");
        }
        let _loc2_: AssetLoaderStruct = this._SafeStr_2890.get(_loc4_.url);
        if (_loc2_ == null) {
            throw new Error("Asset loader structure was lost! " + (_loc4_ ? _loc4_.url : ""));
        }
        switch (param1.type) {
            case "AssetLoaderEventComplete":
                _loc5_ = _loc4_.mimeType;
                _loc3_ = this.getAssetTypeDeclarationByMimeType(_loc5_);
                _loc7_ = true;
                if (_loc3_ != null) {
                    _loc6_ = new _loc3_.assetClass(_loc3_, _loc4_.url);
                    try {
                        AssetLibrary.debug("[AssetLibrary] Loaded: \"" + _loc4_.url + "\" (asset: " + _loc2_.assetName + ")");
                        _loc6_.setUnknownContent(_loc4_.content);
                    } catch (error) {
                        _loc6_.dispose();
                        AssetLibrary.debug("Failed to build asset from loaded file \"" + _loc4_.url + "\" type: " + _loc5_ + " error: " + error.name + " / " + error.message);
                        param1 = new AssetLoaderEvent("AssetLoaderEventError", param1.status);
                        break;
                    }
                    if (this._SafeStr_2351.get(_loc2_.assetName) == null) {
                        this._numAssets = this._numAssets + 1 >>> 0;
                        this._assetNameArray.push(_loc2_.assetName);
                    }
                    this._SafeStr_2351.set(_loc2_.assetName, _loc6_);
                    this.writeCachedAssetData(_loc4_.url, _loc5_, _loc4_.content, _loc4_.bytes);
                    break;
                }
                AssetLibrary.debug("Failed to resolve asset type declaration: \"" + _loc4_.url + "\" type: " + _loc5_);
                param1 = new AssetLoaderEvent("AssetLoaderEventError", param1.status);
                break;
            case "AssetLoaderEventError":
                _loc7_ = true;
                AssetLibrary.debug("Failed to download file \"" + _loc4_.url + "\" error: " + _loc4_.errorCode);
        }
        _loc2_.dispatchEvent(new AssetLoaderEvent(param1.type, param1.status));
        if (_loc7_) {
            if (!this._disposed && _loc4_) {
                this._SafeStr_2890.delete(_loc4_.url);
            }
            if (_loc2_) {
                _loc2_.dispose();
            }
        }
    };

    private libraryLoadedHandler = (param1: LibraryLoaderEvent): void => {
        let _loc2_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
        if (_loc2_.manifest == null) {
            throw new Error("loader.manifest was null, which would have caused error 1009 anyway. See HL-22347.");
        }
        this._manifest = _loc2_.manifest.copy();
        this._resource = _loc2_.resource;
        this._SafeStr_2883 = _loc2_.url;
        if (this._SafeStr_3674) {
            AssetLibrary.fetchLibraryContents(this, this._manifest, this._resource);
        }
        this._isReady = true;
        this.dispatchEvent(new Event("AssetLibraryLoaded"));
        this.dispatchEvent(new Event("AssetLibraryReady"));
        if (this._SafeStr_3674) {
            this._loader.removeEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.libraryLoadedHandler);
            this._loader.removeEventListener("LIBRARY_LOADER_EVENT_ERROR", this.loadErrorHandler);
            this._loader.addEventListener("LIBRARY_LOADER_FINALIZE", this.finalizeLoaderEventHandler);
            this._loader = null;
            this._resource = null;
        }
    };

    private finalizeLoaderEventHandler = (param1: Event): void => {
        let _loc2_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
        if (_loc2_ && !_loc2_.disposed) {
            if (!_loc2_.hasEventListener("LIBRARY_LOADER_EVENT_COMPLETE")) {
                _loc2_.removeEventListener("LIBRARY_LOADER_FINALIZE", this.finalizeLoaderEventHandler);
                _loc2_.dispose();
            }
        }
    };

    private onLoadProgress(param1: ProgressEvent): void {
        this.dispatchEvent(param1.clone());
    }

    private loadErrorHandler = (param1: LibraryLoaderEvent): void => {
        this._isReady = false;
        let _loc3_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
        let _loc2_: string = _loc3_ ? _loc3_.name : "unknown";
        AssetLibrary.debug("Cannot load the specified file: " + _loc2_ + " " + param1.status);
        this.dispatchEvent(new Event("AssetLibraryLoadError"));
        this._loader = null;
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (AssetLibrary.#staticsReady) return;
        AssetLibrary.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(AssetLibrary, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log_AssetLibrary", null);
        set("_SafeStr_6321", null);
        set("_log_AssetLibrary", new SimpleLogger("com.sulake.core.assets.AssetLibrary"));
        set("_SafeStr_6321", new LazyAssetProcessor());
    }

    get [IAssetLibrary](): true {
        return true;
    }
}
