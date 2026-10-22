import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Logger } from '@/com/sulake/habbo/Logger';

export class CameraFxPreloader {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.camera::CameraFxPreloader'); }

    private static ASSETS: Map<any, any>;
    private static instance: CameraFxPreloader;
    private static _urls: any[];
    private static _baseUrl: string;

    declare private _loader: Loader;

    private _SafeStr_6886: boolean = false;

    constructor() {
        this._loader = new Loader();
        this._loader.contentLoaderInfo.addEventListener("complete", this.assetLoaded);
        this._loader.contentLoaderInfo.addEventListener("ioError", this.loadFailed);
        this.loadNextImage();
    }

    public static init(param1: string, param2: any[]): void {
        if (!CameraFxPreloader.instance) {
            CameraFxPreloader.ASSETS = new Dictionary();
            CameraFxPreloader._baseUrl = param1;
            CameraFxPreloader._urls = param2;
            CameraFxPreloader.instance = new CameraFxPreloader();
        }
    }

    public static preloadFinished(): boolean {
        return CameraFxPreloader.instance != null ? CameraFxPreloader.instance._SafeStr_6886 : false;
    }

    public static getImage(param1: string): BitmapData {
        return CameraFxPreloader.ASSETS != null ? CameraFxPreloader.ASSETS.get(param1) : null;
    }

    private loadNextImage(): void {
        let _loc1_: string = null;
        if (CameraFxPreloader._urls.length > 0) {
            _loc1_ = CameraFxPreloader._baseUrl + "Habbo-Stories/" + CameraFxPreloader._urls[0] + ".png";
            this._loader.load(new URLRequest(_loc1_));
        } else {
            this._SafeStr_6886 = true;
        }
    }

    private assetLoaded = (param1: Event): void => {
        CameraFxPreloader.ASSETS.set(CameraFxPreloader._urls.shift(), castTo(this._loader.content, Bitmap).bitmapData.clone());
        this.loadNextImage();
    };

    private loadFailed = (param1: Event): void => {
        Logger.log("Camera Fx preloading failed for " + this._loader.contentLoaderInfo.loaderURL);
        CameraFxPreloader._urls.shift();
        this.loadNextImage();
    };
}
