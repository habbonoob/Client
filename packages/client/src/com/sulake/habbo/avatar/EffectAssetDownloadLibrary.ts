import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { LibraryLoaderEvent } from '@/com/sulake/core/utils/LibraryLoaderEvent';
import type { INamed } from '@/com/sulake/habbo/communication/messages/incoming/moderation/INamed';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetLibraryCollection, Core, EventDispatcherWrapper, LibraryLoader } from '@/com/sulake/core/runtime/Component.group';

export class EffectAssetDownloadLibrary extends EventDispatcherWrapper implements INamed {
    static { registerClassName(this, 'com.sulake.habbo.avatar::EffectAssetDownloadLibrary'); }

    private static STATE_IDLE: number = 0;
    private static STATE_DOWNLOADING: number = 1;
    private static STATE_READY: number = 2;

    constructor(param1: string, param2: string, param3: string, param4: IAssetLibrary, param5: string) {
        super();
        this._state = EffectAssetDownloadLibrary.STATE_IDLE;
        this._assets = param4;
        this._name = param1;
        this._revision = param2;
        this._downloadUrl = param3 + param5;
        this._downloadUrl = this._downloadUrl.replace("%libname%", this._name);
        this._downloadUrl = this._downloadUrl.replace("%revision%", this._revision);
        let _loc6_: AssetLibraryCollection = this._assets instanceof AssetLibraryCollection ? this._assets : null;
        let _loc7_: IAssetLibrary = _loc6_.getAssetLibraryByUrl(this._name + ".swf");
        if (_loc7_ != null) {
            this._state = EffectAssetDownloadLibrary.STATE_READY;
        }
    }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _revision: string;

    declare private _downloadUrl: string;

    declare private _assets: IAssetLibrary;

    declare private _animation: XML;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get isReady(): boolean {
        return this._state == EffectAssetDownloadLibrary.STATE_READY;
    }

    public get animation(): XML {
        return this._animation;
    }

    public override dispose(): void {
        super.dispose();
    }

    public startDownloading(): void {
        this._state = EffectAssetDownloadLibrary.STATE_DOWNLOADING;
        let _loc1_: URLRequest = new URLRequest(this._downloadUrl);
        let _loc2_: LibraryLoader = new LibraryLoader();
        this._assets.loadFromFile(_loc2_, true);
        _loc2_.addEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.onLoaderComplete);
        _loc2_.addEventListener("LIBRARY_LOADER_EVENT_ERROR", this.onLoaderError);
        _loc2_.load(_loc1_);
    }

    public toString(): string {
        let _loc1_: string = this._name;
        return _loc1_ + (this.isReady ? "[x]" : "[ ]");
    }

    private onLoaderError = (param1: LibraryLoaderEvent): void => {
        Core.error("Could not load effect asset library " + this._name + " from URL " + this._downloadUrl + " HTTP status " + param1.status + " bytes loaded " + param1.bytesLoaded + "/" + param1.bytesTotal, false, 2);
    };

    private onLoaderComplete = (param1: Event): void => {
        let _loc5_: ByteArray = null;
        let _loc3_: ByteArray = null;
        let _loc2_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
        _loc2_.removeEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.onLoaderComplete);
        _loc2_.removeEventListener("LIBRARY_LOADER_EVENT_ERROR", this.onLoaderError);
        let _loc4_: any = (_loc2_.resource).animation;
        if (_loc4_ instanceof XML) {
            this._animation = _loc4_ instanceof XML ? _loc4_ : null;
        } else if (typeof _loc4_ === "function") {
            _loc5_ = asInstanceOf(new (typeof _loc4_ === "function" ? _loc4_ : null)(), ByteArray);
            this._animation = new XML(_loc5_.readUTFBytes(_loc5_.length));
        } else if (_loc4_ instanceof ByteArray) {
            _loc3_ = _loc4_ instanceof ByteArray ? _loc4_ : null;
            this._animation = new XML(_loc3_.readUTFBytes(_loc3_.length));
        }
        this._state = EffectAssetDownloadLibrary.STATE_READY;
        this.dispatchEvent(new Event("complete"));
    };
}
