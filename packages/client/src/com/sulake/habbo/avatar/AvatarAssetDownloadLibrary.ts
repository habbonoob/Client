import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { LibraryLoaderEvent } from '@/com/sulake/core/utils/LibraryLoaderEvent';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { AssetLibraryCollection, Core, EventDispatcherWrapper, LibraryLoader } from '@/com/sulake/core/runtime/Component.group';

export class AvatarAssetDownloadLibrary extends EventDispatcherWrapper {
    static { registerClassName(this, 'com.sulake.habbo.avatar::AvatarAssetDownloadLibrary'); }

    private static STATE_IDLE: number = 0;
    private static STATE_DOWNLOADING: number = 1;
    private static STATE_READY: number = 2;

    constructor(param1: string, param2: string, param3: string, param4: IAssetLibrary, param5: string) {
        super();
        this._state = AvatarAssetDownloadLibrary.STATE_IDLE;
        this._assets = param4;
        this._libraryName = param1;
        this._revision = param2;
        this._downloadUrl = param3 + param5;
        this._downloadUrl = this._downloadUrl.replace("%libname%", this._libraryName);
        this._downloadUrl = this._downloadUrl.replace("%revision%", this._revision);
        let _loc6_: AssetLibraryCollection = this._assets instanceof AssetLibraryCollection ? this._assets : null;
        let _loc7_: IAssetLibrary = _loc6_.getAssetLibraryByUrl(this._libraryName + ".swf");
        if (_loc7_ != null) {
            this._state = AvatarAssetDownloadLibrary.STATE_READY;
        }
    }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _revision: string;

    declare private _downloadUrl: string;

    declare private _assets: IAssetLibrary;

    declare private _isMandatory: boolean;
    static { (this.prototype as any)._isMandatory = false; }

    declare private _libraryName: string;

    public get libraryName(): string {
        return this._libraryName;
    }

    public get isReady(): boolean {
        return this._state == AvatarAssetDownloadLibrary.STATE_READY;
    }

    public get isMandatory(): boolean {
        return this._isMandatory;
    }

    public set isMandatory(param1: boolean) {
        this._isMandatory = param1;
    }

    public override dispose(): void {
        super.dispose();
    }

    public startDownloading(): void {
        this._state = AvatarAssetDownloadLibrary.STATE_DOWNLOADING;
        let _loc1_: URLRequest = new URLRequest(this._downloadUrl);
        let _loc2_: LibraryLoader = new LibraryLoader();
        this._assets.loadFromFile(_loc2_, true);
        _loc2_.addEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.onLoaderComplete);
        _loc2_.addEventListener("LIBRARY_LOADER_EVENT_ERROR", this.onLoaderError);
        _loc2_.load(_loc1_);
    }

    public purge(): void {
        let _loc1_: AssetLibraryCollection = this._assets instanceof AssetLibraryCollection ? this._assets : null;
        if (!_loc1_) {
            return;
        }
        let _loc2_: IAssetLibrary = _loc1_.getAssetLibraryByUrl(this._downloadUrl);
        if (_loc2_) {
            _loc1_.removeAssetLibrary(_loc2_);
            _loc2_.dispose();
            this._state = AvatarAssetDownloadLibrary.STATE_IDLE;
        }
    }

    public toString(): string {
        let _loc1_: string = this._libraryName;
        return _loc1_ + (this.isReady ? "[x]" : "[ ]");
    }

    private onLoaderError = (param1: LibraryLoaderEvent): void => {
        this._state = AvatarAssetDownloadLibrary.STATE_READY;
        let _loc2_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
        _loc2_.removeEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.onLoaderComplete);
        _loc2_.removeEventListener("LIBRARY_LOADER_EVENT_ERROR", this.onLoaderError);
        Core.error("Could not load avatar asset library " + this._libraryName + " from URL " + this._downloadUrl + " HTTP status " + param1.status + " bytes loaded " + param1.bytesLoaded + "/" + param1.bytesTotal, false, 2);
        this.dispatchEvent(new Event("complete"));
    };

    private onLoaderComplete = (param1: Event): void => {
        let _loc2_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
        _loc2_.removeEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.onLoaderComplete);
        _loc2_.removeEventListener("LIBRARY_LOADER_EVENT_ERROR", this.onLoaderError);
        this._state = AvatarAssetDownloadLibrary.STATE_READY;
        this.dispatchEvent(new Event("complete"));
    };
}
