import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Loader } from '@habbo-pixi/runtime/display/Loader';
import type { ErrorEvent } from '@habbo-pixi/runtime/events/ErrorEvent';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { SimpleLogger } from '@/debug/SimpleLogger';
import { ImageLoaderEvent } from '@/login/ImageLoaderEvent';

export class ImageLoader extends EventDispatcher {
    static { registerClassName(this, 'login::ImageLoader'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ImageLoader.#initStatics();
        return ImageLoader._log;
    }

    declare private _loader: Loader;

    declare private _SafeStr_2991: string;

    constructor(param1: Loader, param2: string) {
        super();
        this._loader = param1;
        this._SafeStr_2991 = param2;
        let _loc3_: URLRequest = new URLRequest(param2);
        param1.load(_loc3_);
        param1.contentLoaderInfo.addEventListener("complete", this.avatarImageLoadCompleteHandler);
        param1.contentLoaderInfo.addEventListener("error", this.onImageError);
        param1.contentLoaderInfo.addEventListener("ioError", this.onImageError);
        param1.contentLoaderInfo.addEventListener("securityError", this.onImageError);
    }

    public static CreateLoader(param1: Loader, param2: string, param3: (...args: any[]) => any): ImageLoader {
        let _loc4_: ImageLoader = new ImageLoader(param1, param2);
        _loc4_.addEventListener("complete", param3);
        return _loc4_;
    }

    private avatarImageLoadCompleteHandler = (param1: Event): void => {
        ImageLoader._log.info("Loaded image " + this._SafeStr_2991);
        this.dispatchEvent(new ImageLoaderEvent("complete", this._loader, this._SafeStr_2991));
    };

    private onImageError = (param1: ErrorEvent): void => {
        ImageLoader._log.warn("Failed to load image " + param1.text);
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ImageLoader.#staticsReady) return;
        ImageLoader.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ImageLoader, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("login.ImageLoader"));
    }
}
