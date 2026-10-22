import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICaptchaListener } from '@/com/sulake/habbo/communication/login/ICaptchaListener';
import type { ICaptchaView } from '@/com/sulake/habbo/communication/login/ICaptchaView';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { LocationChangeEvent } from '@habbo-pixi/runtime/events/LocationChangeEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { StageWebView } from '@habbo-pixi/runtime/media/StageWebView';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class WebCaptchaView extends Sprite implements ICaptchaView {
    static { registerClassName(this, 'login::WebCaptchaView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        WebCaptchaView.#initStatics();
        return WebCaptchaView._log;
    }

    private static _SafeStr_3201: StageWebView;
    private static readonly CAPTCHA_ENDPOINT: string = "/api/public/captcha";
    private static readonly TOKEN_KEY: string = "token=";

    declare private _controller: ICaptchaListener;

    constructor(param1: ICaptchaListener) {
        super();
        this._controller = param1;
        this.addEventListener("addedToStage", this.onAddedToStage);
    }

    private static resolveToken(param1: string): string {
        let _loc2_: number = param1 != null ? param1.indexOf("token=") : -1;
        if (_loc2_ < 0) {
            return null;
        }
        return param1.substr(_loc2_ + "token=".length);
    }

    private onAddedToStage = (param1: Event): void => {
        let _loc2_: string = this._controller.getProperty(HabboProperty.WEB_API) + "/api/public/captcha";
        WebCaptchaView._log.info("Initialize url: " + _loc2_);
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        if (WebCaptchaView._SafeStr_3201 == null) {
            WebCaptchaView._SafeStr_3201 = new StageWebView(true);
            WebCaptchaView._SafeStr_3201.stage = this.stage;
            WebCaptchaView._SafeStr_3201.viewPort = new Rectangle(0, 100, this.stage.width, this.stage.height - 100);
            WebCaptchaView._SafeStr_3201.loadURL(_loc2_);
            WebCaptchaView._SafeStr_3201.addEventListener("locationChange", this.onLocationChange);
        }
    };

    public dispose(): void {
        this._controller = null;
        if (WebCaptchaView._SafeStr_3201) {
            WebCaptchaView._SafeStr_3201.removeEventListener("locationChange", this.onLocationChange);
            WebCaptchaView._SafeStr_3201.dispose();
        }
    }

    private onLocationChange = (param1: LocationChangeEvent): void => {
        let _loc2_: string = WebCaptchaView.resolveToken(param1.location);
        if (_loc2_ != null) {
            this._controller.handleCaptchaResult(_loc2_);
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (WebCaptchaView.#staticsReady) return;
        WebCaptchaView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(WebCaptchaView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("login.WebCaptchaView"));
    }
}
