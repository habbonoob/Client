import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class RewardBadgeElementHandler implements IElementHandler {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::RewardBadgeElementHandler'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        RewardBadgeElementHandler.#initStatics();
        return RewardBadgeElementHandler._log;
    }

    public initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        let _loc8_: string = stringOrNull(param3[2]);
        let _loc5_: IWindowContainer = castGuarded(param2, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc5_.findChildByName("badge_desc").caption = "";
        let _loc6_: IStaticBitmapWrapperWindow = castGuarded(_loc5_.findChildByName("badge_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        let _loc7_: string = "${image.library.url}album1584/" + param3[1] + ".png";
        RewardBadgeElementHandler._log.info("IMAGE: " + _loc7_);
        _loc6_.assetUri = _loc7_;
    }

    public refresh(): void {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RewardBadgeElementHandler.#staticsReady) return;
        RewardBadgeElementHandler.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RewardBadgeElementHandler, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendbar.landingview.widget.elements.RewardBadgeElementHandler"));
    }

    get [IElementHandler](): true {
        return true;
    }
}
