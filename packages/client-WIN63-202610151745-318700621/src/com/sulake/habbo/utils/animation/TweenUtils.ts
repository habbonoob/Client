import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Juggler } from '@/com/sulake/habbo/utils/animation/Juggler';
import { Tween } from '@/com/sulake/habbo/utils/animation/Tween';

export class TweenUtils {
    static { registerClassName(this, 'com.sulake.habbo.utils.animation::TweenUtils'); }

    static #staticsReady = false;

    public static readonly FAST_ALPHA_TWEEN_TIME: number = 0.2;
    public static readonly STANDARD_ALPHA_TWEEN_TIME: number = 0.4;
    public static readonly SLOW_ALPHA_TWEEN_TIME_DOUBLE: number = 0.8;
    public static readonly REALLY_SLOW_ALPHA_TWEEN_TIME: number = 1.2;
    public static readonly STANDARD_ANCHOR_TWEEN_TIME: number = 0.4;

    public static get _SafeStr_4376(): Juggler {
        TweenUtils.#initStatics();
        return TweenUtils._SafeStr_4376;
    }
    public static set _SafeStr_4376(value: Juggler) {
        TweenUtils.#initStatics();
        TweenUtils._SafeStr_4376 = value;
    }

    constructor() {
    }

    public static alphaTweenVisible(param1: DisplayObject, param2: number, param3: number, param4: string = "linear"): Tween {
        param1.alpha = 0;
        let _loc5_: Tween = new Tween(param1, param3, param4);
        _loc5_.animate("alpha", 1);
        _loc5_.delay = param2;
        TweenUtils._SafeStr_4376.add(_loc5_);
        return _loc5_;
    }

    public static alphaTweenInvisible(param1: DisplayObject, param2: number, param3: number, param4: string = "linear"): Tween {
        param1.alpha = 1;
        let _loc5_: Tween = new Tween(param1, param3, param4);
        _loc5_.animate("alpha", 0);
        _loc5_.delay = param2;
        TweenUtils._SafeStr_4376.add(_loc5_);
        return _loc5_;
    }

    public static alphaTweenBlink(param1: DisplayObject, param2: number, param3: number): Tween {
        param1.alpha = 0;
        let _loc4_: Tween = new Tween(param1, param3, "easeOutBack");
        _loc4_.animate("alpha", 0.4);
        _loc4_.delay = param2;
        TweenUtils._SafeStr_4376.add(_loc4_);
        return _loc4_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TweenUtils.#staticsReady) return;
        TweenUtils.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TweenUtils, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_4376", null);
        set("_SafeStr_4376", new Juggler());
    }
}
