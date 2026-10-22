import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderStruct } from '@/com/sulake/core/assets/AssetLoaderStruct';
import type { AssetTypeDeclaration } from '@/com/sulake/core/assets/AssetTypeDeclaration';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { LibraryLoaderEvent } from '@/com/sulake/core/utils/LibraryLoaderEvent';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ApplicationDomain } from '@habbo-pixi/runtime/system/ApplicationDomain';
import { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { IAssetLibrary, isIAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import { AssetLibrary, EventDispatcherWrapper, LibraryLoader } from '@/com/sulake/core/runtime/Component.group';

export class AssetLibraryCollection extends EventDispatcherWrapper implements IAssetLibrary {
    static { registerClassName(this, 'com.sulake.core.assets::AssetLibraryCollection'); }

    declare protected _assetLibraries: IAssetLibrary[];

    declare protected _SafeStr_3255: any[];

    declare protected _loaderContext: LoaderContext;

    declare protected _SafeStr_3467: AssetLibrary;

    declare protected _manifest: XML;

    declare protected _name: string;

    private _counter: number = 0;

    constructor(param1: string) {
        super();
        this._name = param1;
        this._manifest = null;
        this._assetLibraries = [];
        this._SafeStr_3255 = [];
        this._loaderContext = new LoaderContext(false, ApplicationDomain.currentDomain, null);
    }

    public get url(): string {
        return "";
    }

    public get name(): string {
        return this._name;
    }

    public get isReady(): boolean {
        return this._SafeStr_3255.length == 0;
    }

    public get numAssets(): number {
        return this.getNumAssets();
    }

    public get nameArray(): any[] {
        return this.getAssetNameArray();
    }

    public get manifest(): XML {
        return this._manifest ? this._manifest : (this._manifest = new XML());
    }

    public get loaderContext(): LoaderContext {
        return this._loaderContext;
    }

    public set loaderContext(param1: LoaderContext) {
        this._loaderContext = param1;
    }

    private get binLibrary(): IAssetLibrary {
        if (!this._SafeStr_3467) {
            this._SafeStr_3467 = new AssetLibrary("bin");
            this._assetLibraries.splice(0, 0, this._SafeStr_3467);
        }
        return this._SafeStr_3467;
    }

    public loadFromFile(param1: LibraryLoader, param2: boolean = false): void {
        if (this.loaderContext == null) {
            this.loaderContext = this._loaderContext;
        }
        let _loc3_: IAssetLibrary = new AssetLibrary("lib-" + this._counter++);
        this._SafeStr_3255.push(_loc3_);
        _loc3_.loadFromFile(param1, param2);
        param1.addEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.loadEventHandler);
        param1.addEventListener("LIBRARY_LOADER_EVENT_ERROR", this.loadEventHandler);
        param1.addEventListener("LIBRARY_LOADER_EVENT_PROGRESS", this.loadEventHandler);
    }

    public loadFromResource(param1: XML, param2: any): boolean {
        return this.binLibrary.loadFromResource(param1, param2);
    }

    public unload(): void {
        while (this._SafeStr_3255.length > 0) {
            (asGuarded(this._SafeStr_3255.pop(), isIAssetLibrary)).dispose();
        }
        while (this._assetLibraries.length > 0) {
            (asGuarded(this._assetLibraries.pop(), isIAssetLibrary)).dispose();
        }
    }

    public override dispose(): void {
        let _loc2_: any = 0;
        let _loc1_: IAssetLibrary = null;
        let _loc3_: any = 0;
        if (!this.disposed) {
            super.dispose();
            _loc2_ = this._assetLibraries.length;
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                _loc1_ = this._assetLibraries.pop();
                _loc1_.dispose();
                _loc3_++;
            }
            this._SafeStr_3467 = null;
        }
    }

    private loadEventHandler = (param1: LibraryLoaderEvent): void => {
        let _loc3_: LibraryLoader = null;
        let _loc2_: IAssetLibrary = null;
        let _loc4_: any = 0;
        if (param1.type == "LIBRARY_LOADER_EVENT_COMPLETE") {
            _loc3_ = asInstanceOf(param1.target, LibraryLoader);
            _loc4_ = 0;
            while (_loc4_ < this._SafeStr_3255.length) {
                _loc2_ = asGuarded(this._SafeStr_3255[_loc4_], isIAssetLibrary);
                if (_loc2_.url == _loc3_.url) {
                    this._SafeStr_3255.splice(_loc4_, 1);
                    break;
                }
                _loc4_++;
            }
            this._assetLibraries.push(_loc2_);
            _loc3_.removeEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.loadEventHandler);
            _loc3_.removeEventListener("LIBRARY_LOADER_EVENT_ERROR", this.loadEventHandler);
            _loc3_.removeEventListener("LIBRARY_LOADER_EVENT_PROGRESS", this.loadEventHandler);
            if (this._SafeStr_3255.length == 0) {
                this.dispatchEvent(new Event("AssetLibraryLoaded"));
            }
        }
    };

    public hasAssetLibrary(param1: string): boolean {
        for (const _loc2_ of this._assetLibraries ?? []) {
            if (_loc2_.name == param1) {
                return true;
            }
        }
        return false;
    }

    public getAssetLibraryByName(param1: string): IAssetLibrary {
        for (const _loc2_ of this._assetLibraries ?? []) {
            if (_loc2_.name == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getAssetLibraryByUrl(param1: string): IAssetLibrary {
        for (const _loc2_ of this._assetLibraries ?? []) {
            if (_loc2_.url == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getAssetLibraryByPartialUrl(param1: string): IAssetLibrary {
        for (const _loc2_ of this._assetLibraries ?? []) {
            if (_loc2_.url && _loc2_.url.indexOf(param1) !== -1) {
                return _loc2_;
            }
        }
        return null;
    }

    public addAssetLibrary(param1: IAssetLibrary): void {
        if (this._assetLibraries.indexOf(param1) == -1) {
            this._assetLibraries.push(param1);
        }
    }

    public removeAssetLibrary(param1: IAssetLibrary): void {
        let _loc2_: number = this._assetLibraries.indexOf(param1);
        if (_loc2_ >= 0) {
            this._assetLibraries.splice(_loc2_, 1);
        }
    }

    public addOrReplaceAssetLibrary(param1: IAssetLibrary): void {
        let _loc3_: number = 0;
        let _loc2_: IAssetLibrary = null;
        _loc3_ = 0;
        while (_loc3_ < this._assetLibraries.length) {
            _loc2_ = this._assetLibraries[_loc3_];
            if (_loc2_.name == param1.name) {
                this._assetLibraries[_loc3_] = param1;
                return;
            }
            _loc3_++;
        }
        this._assetLibraries.push(param1);
    }

    public loadAssetFromFile(param1: string, param2: URLRequest, param3: string = null, param4: number = -1): AssetLoaderStruct {
        return this.binLibrary.loadAssetFromFile(param1, param2, param3, param4);
    }

    public getAssetByName(param1: string): IAsset {
        let _loc3_: IAsset = null;
        for (const _loc2_ of this._assetLibraries ?? []) {
            _loc3_ = _loc2_.getAssetByName(param1);
            if (_loc3_ != null) {
                return _loc3_;
            }
        }
        return null;
    }

    public getAssetsByName(param1: string): any[] {
        let _loc4_: IAsset = null;
        let _loc2_: any[] = [];
        for (const _loc3_ of this._assetLibraries ?? []) {
            _loc4_ = _loc3_.getAssetByName(param1);
            if (_loc4_ != null) {
                _loc2_.push(_loc4_);
            }
        }
        return _loc2_;
    }

    public getAssetByContent(param1: any): IAsset {
        let _loc3_: IAsset = null;
        for (const _loc2_ of this._assetLibraries ?? []) {
            _loc3_ = _loc2_.getAssetByContent(param1);
            if (_loc3_ != null) {
                return _loc3_;
            }
        }
        return null;
    }

    public getAssetByIndex(param1: number): IAsset {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        for (const _loc4_ of this._assetLibraries ?? []) {
            _loc2_ += _loc4_.numAssets;
            if (_loc2_ <= param1) {
                return _loc4_.getAssetByIndex(param1 - _loc3_ >>> 0);
            }
            _loc3_ = _loc2_;
        }
        return null;
    }

    public getAssetIndex(param1: IAsset): number {
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        for (const _loc3_ of this._assetLibraries ?? []) {
            _loc4_ = _loc3_.getAssetIndex(param1);
            if (_loc4_ != -1) {
                return _loc2_ + _loc4_;
            }
            _loc2_ += _loc3_.numAssets;
        }
        return -1;
    }

    public hasAsset(param1: string): boolean {
        for (const _loc2_ of this._assetLibraries ?? []) {
            if (_loc2_.hasAsset(param1)) {
                return true;
            }
        }
        return false;
    }

    public setAsset(param1: string, param2: IAsset, param3: boolean = true): boolean {
        return this.binLibrary.setAsset(param1, param2, param3);
    }

    public createAsset(param1: string, param2: AssetTypeDeclaration): IAsset {
        return this.binLibrary.createAsset(param1, param2);
    }

    public removeAsset(param1: IAsset): IAsset {
        for (const _loc2_ of this._assetLibraries ?? []) {
            if (_loc2_.removeAsset(param1) == param1) {
                return param1;
            }
        }
        return null;
    }

    public registerAssetTypeDeclaration(param1: AssetTypeDeclaration, param2: boolean = true): boolean {
        return this.binLibrary.registerAssetTypeDeclaration(param1, param2);
    }

    public getAssetTypeDeclarationByMimeType(param1: string, param2: boolean = true): AssetTypeDeclaration {
        let _loc3_: AssetTypeDeclaration = null;
        if (param2) {
            return this.binLibrary.getAssetTypeDeclarationByMimeType(param1, true);
        }
        for (const _loc4_ of this._assetLibraries ?? []) {
            _loc3_ = _loc4_.getAssetTypeDeclarationByMimeType(param1, false);
            if (_loc3_ != null) {
                return _loc3_;
            }
        }
        return null;
    }

    public getAssetTypeDeclarationByClass(param1: any, param2: boolean = true): AssetTypeDeclaration {
        let _loc3_: AssetTypeDeclaration = null;
        if (param2) {
            return this.binLibrary.getAssetTypeDeclarationByClass(param1, true);
        }
        for (const _loc4_ of this._assetLibraries ?? []) {
            _loc3_ = _loc4_.getAssetTypeDeclarationByClass(param1, false);
            if (_loc3_ != null) {
                return _loc3_;
            }
        }
        return null;
    }

    public getAssetTypeDeclarationByFileName(param1: string, param2: boolean = true): AssetTypeDeclaration {
        let _loc3_: AssetTypeDeclaration = null;
        if (param2) {
            return this.binLibrary.getAssetTypeDeclarationByFileName(param1, true);
        }
        for (const _loc4_ of this._assetLibraries ?? []) {
            _loc3_ = _loc4_.getAssetTypeDeclarationByFileName(param1, false);
            if (_loc3_ != null) {
                return _loc3_;
            }
        }
        return null;
    }

    private getNumAssets(): number {
        let _loc1_: number = 0;
        for (const _loc2_ of this._assetLibraries ?? []) {
            _loc1_ += _loc2_.numAssets;
        }
        return _loc1_;
    }

    private getAssetNameArray(): any[] {
        let _loc2_: any[] = [];
        for (const _loc1_ of this._assetLibraries ?? []) {
            _loc2_ = _loc2_.concat(_loc1_.nameArray);
        }
        return _loc2_;
    }

    public getManifests(): any[] {
        let _loc2_: any[] = [];
        for (const _loc1_ of this._assetLibraries ?? []) {
            _loc2_.push(_loc1_.manifest);
        }
        return _loc2_;
    }

    private buildManifest(): XML {
        let _loc3_: XML = new XML(`<manifest><library></library></manifest>`);
        let _loc1_: XMLList = _loc3_.child("library");
        if (this._SafeStr_3467) {
            this.applyManifestNodes(_loc1_, this._SafeStr_3467);
        }
        for (const _loc2_ of this._assetLibraries ?? []) {
            this.applyManifestNodes(_loc1_, _loc2_);
        }
        return _loc3_;
    }

    private applyManifestNodes(param1: XMLList, param2: IAssetLibrary): void {
        let _loc7_: any;
        let _loc3_: XML = null;
        let _loc4_: XMLList = null;
        let _loc5_: XMLList = param2.manifest.child("library").children();
        for (const _loc6_ of _loc5_ ?? []) {
            _loc3_ = param1.child(_loc6_.name()).item(0);
            if (!_loc3_) {
                param1.appendChild(new XML("<" + _loc6_.name() + "/>"));
                _loc3_ = param1.child(_loc6_.name()).item(0);
            }
            _loc4_ = _loc6_.children();
            for (_loc7_ of _loc4_ ?? []) {
                _loc3_.appendChild(_loc7_);
            }
        }
    }

    get [IAssetLibrary](): true {
        return true;
    }
}
