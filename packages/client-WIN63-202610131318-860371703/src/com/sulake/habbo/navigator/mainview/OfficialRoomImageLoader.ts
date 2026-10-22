import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Logger } from '@/com/sulake/habbo/Logger';

export class OfficialRoomImageLoader implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview::OfficialRoomImageLoader'); }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _picRef: string;

    declare private _SafeStr_2991: string;

    declare private _SafeStr_3037: IBitmapWrapperWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IHabboTransitionalNavigator, param2: string, param3: IBitmapWrapperWindow) {
        this._navigator = param1;
        this._picRef = param2;
        this._SafeStr_3037 = param3;
        let _loc4_: string = this._navigator.getProperty("image.library.url");
        this._SafeStr_2991 = _loc4_ + this._picRef;
        Logger.log("[OFFICIAL ROOM ICON IMAGE DOWNLOADER] : " + this._SafeStr_2991);
    }

    public startLoad(): void {
        let _loc1_: URLRequest = null;
        let _loc2_: AssetLoaderStruct = null;
        if (this._navigator.assets.hasAsset(this._picRef)) {
            this.setImage();
        } else {
            _loc1_ = new URLRequest(this._SafeStr_2991);
            _loc2_ = this._navigator.assets.loadAssetFromFile(this._picRef, _loc1_, "image/gif");
            _loc2_.addEventListener("AssetLoaderEventComplete", this.onImageReady);
            _loc2_.addEventListener("AssetLoaderEventError", this.onLoadError);
        }
    }

    private onImageReady = (param1: AssetLoaderEvent): void => {
        if (this._disposed) {
            return;
        }
        let _loc2_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc2_ == null) {
            Logger.log("Loading pic from url: " + this._SafeStr_2991 + " failed. loaderStruct == null");
            return;
        }
        this.setImage();
    };

    private setImage(): void {
        let _loc1_: BitmapData = null;
        if (this._navigator && !this._navigator.disposed && this._SafeStr_3037 && !this._SafeStr_3037.disposed) {
            _loc1_ = this._navigator.getButtonImage(this._picRef, "");
            if (_loc1_) {
                this._SafeStr_3037.disposesBitmap = false;
                this._SafeStr_3037.bitmap = _loc1_;
                this._SafeStr_3037.width = _loc1_.width;
                this._SafeStr_3037.height = _loc1_.height;
                this._SafeStr_3037.visible = true;
            } else {
                Logger.log("OfficialRoomImageLoader - Image not found: " + this._picRef);
            }
        }
        this.dispose();
    }

    private onLoadError = (param1: AssetLoaderEvent): void => {
        Logger.log("Error loading image: " + this._SafeStr_2991 + ", " + param1);
        this.dispose();
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._SafeStr_3037 = null;
        this._navigator = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
