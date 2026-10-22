import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { GenericWidget } from '@/com/sulake/habbo/friendbar/landingview/widget/GenericWidget';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { ConcurrentUsersGoalProgressMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/ConcurrentUsersGoalProgressMessageEvent';
import { IElementHandler } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IElementHandler';
import { IFloatingElement } from '@/com/sulake/habbo/friendbar/landingview/interfaces/elements/IFloatingElement';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ConcurrentUsersMeterElementHandler implements IElementHandler, IFloatingElement {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget.elements::ConcurrentUsersMeterElementHandler'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ConcurrentUsersMeterElementHandler.#initStatics();
        return ConcurrentUsersMeterElementHandler._log;
    }

    constructor() {
    }

    declare private _image: IStaticBitmapWrapperWindow;

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _userCount: number;
    static { (this.prototype as any)._userCount = 0; }

    declare private _userCountGoal: number;
    static { (this.prototype as any)._userCountGoal = 0; }

    public initialize(param1: HabboLandingView, param2: IWindow, param3: any[], param4: GenericWidget): void {
        this._image = castGuarded(param2, isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        let _loc5_: string = stringOrNull(param3[1]);
        this._image.assetUri = _loc5_;
        this._image.x = param3.length > 2 ? param3[2] | 0 : 0;
        this._image.y = param3.length > 3 ? param3[3] | 0 : 0;
        ConcurrentUsersMeterElementHandler._log.info("Init Concurrent users meter: " + _loc5_);
        param1.communicationManager.addHabboConnectionMessageEvent(new ConcurrentUsersGoalProgressMessageEvent(this.onConcurrentUsersGoalProgress));
    }

    public refresh(): void {
    }

    public isFloating(param1: boolean): boolean {
        return true;
    }

    private onConcurrentUsersGoalProgress = (param1: ConcurrentUsersGoalProgressMessageEvent): void => {
        this._state = param1.getParser().state;
        this._userCount = param1.getParser().userCount;
        this._userCountGoal = param1.getParser().userCountGoal;
        let _loc3_: number = this._userCount / this._userCountGoal * 100 | 0;
        _loc3_ = Math.max(20, Math.min(100, _loc3_)) | 0;
        _loc3_ = Math.floor(_loc3_ / 10) * 10 | 0;
        let _loc2_: string = "challenge_meter_" + _loc3_;
        this._image.assetUri = "${image.library.url}reception/" + _loc2_ + ".png";
        ConcurrentUsersMeterElementHandler._log.info("Updating meter: " + _loc2_);
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ConcurrentUsersMeterElementHandler.#staticsReady) return;
        ConcurrentUsersMeterElementHandler.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ConcurrentUsersMeterElementHandler, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.friendbar.landingview.widget.elements.ConcurrentUsersMeterElementHandler"));
    }

    get [IElementHandler](): true {
        return true;
    }

    get [IFloatingElement](): true {
        return true;
    }
}
