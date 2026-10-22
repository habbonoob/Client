import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import { PNGEncoderOptions } from '@habbo-pixi/runtime/display/PNGEncoderOptions';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { IAssetLoader } from '@/com/sulake/core/assets/loaders/IAssetLoader';
import { AssetLoader } from '@/com/sulake/core/runtime/Component.group';

export class BitmapFileLoader extends AssetLoader implements IAssetLoader {
    static { registerClassName(this, 'com.sulake.core.assets.loaders::BitmapFileLoader'); }

    constructor(param1: string, param2: URLRequest = null, param3: number = -1) {
        super();
        this._SafeStr_2991 = param2 != null ? param2.url : null;
        this._type = param1;
        this._loader = new Loader();
        this._loaderContext = new LoaderContext();
        this._loaderContext.checkPolicyFile = false;
        this._loader.contentLoaderInfo.addEventListener("complete", this.completeEventHandler);
        this._loader.contentLoaderInfo.addEventListener("unload", this.loadEventHandler);
        this._loader.contentLoaderInfo.addEventListener("httpStatus", this.loadEventHandler);
        this._loader.contentLoaderInfo.addEventListener("progress", this.loadEventHandler);
        this._loader.contentLoaderInfo.addEventListener("ioError", this.loadEventHandler);
        this._loader.contentLoaderInfo.addEventListener("securityError", this.loadEventHandler);
        this._id = param3;
        if (param2 != null && param2.url != null) {
            this._loader.load(param2, this._loaderContext);
        }
    }

    declare protected _SafeStr_2991: string;

    declare protected _type: string;

    declare protected _loader: Loader;

    declare protected _loaderContext: LoaderContext;

    private _id: number = -1;

    public get url(): string {
        return this._SafeStr_2991;
    }

    public get content(): any {
        return this._loader ? this._loader.content : null;
    }

    public get bytes(): ByteArray {
        let _loc2_: Bitmap = asInstanceOf(this.content, Bitmap);
        if (_loc2_ == null) {
            return null;
        }
        let _loc1_: BitmapData = _loc2_.bitmapData;
        return _loc1_.encode(_loc1_.rect, new PNGEncoderOptions());
    }

    public get mimeType(): string {
        return this._type;
    }

    public get bytesLoaded(): number {
        return (this._loader ? this._loader.contentLoaderInfo.bytesLoaded : 0) >>> 0;
    }

    public get bytesTotal(): number {
        return (this._loader ? this._loader.contentLoaderInfo.bytesTotal : 0) >>> 0;
    }

    public get loaderContext(): LoaderContext {
        return this._loaderContext;
    }

    public get id(): number {
        return this._id;
    }

    protected override retry(): boolean {
        if (!this._disposed) {
            if (++this._retries <= this._SafeStr_7201) {
                try {
                    this._loader.close();
                    this._loader.unload();
                } catch (e) {
                }
                this._loader.load(new URLRequest(this._SafeStr_2991 + (this._SafeStr_2991.indexOf("?") == -1 ? "?" : "&") + "retry=" + this._retries), this._loaderContext);
                return true;
            }
        }
        return false;
    }

    public override dispose(): void {
        if (!this._disposed) {
            super.dispose();
            this._loader.contentLoaderInfo.removeEventListener("complete", this.completeEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("unload", this.loadEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("httpStatus", this.loadEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("progress", this.loadEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("ioError", this.loadEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("securityError", this.loadEventHandler);
            try {
                this._loader.close();
            } catch (e) {
            }
            this._loader.unload();
            this._loader = null;
            this._type = null;
            this._SafeStr_2991 = null;
        }
    }

    public load(param1: URLRequest): void {
        this._SafeStr_2991 = param1.url;
        this._retries = 0;
        this._loader.load(param1, this._loaderContext);
    }

    private completeEventHandler = (param1: Event): void => {
        this.loadEventHandler(param1);
    };

    get [IAssetLoader](): true {
        return true;
    }
}
