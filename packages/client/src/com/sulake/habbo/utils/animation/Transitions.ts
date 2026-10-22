import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class Transitions {
    static { registerClassName(this, 'com.sulake.habbo.utils.animation::Transitions'); }

    public static readonly LINEAR: string = "linear";
    public static readonly EASE_IN: string = "easeIn";
    public static readonly _SafeStr_8099: string = "easeOut";
    public static readonly _SafeStr_8601: string = "easeInOut";
    public static readonly EASE_OUT_IN: string = "easeOutIn";
    public static readonly EASE_IN_BACK: string = "easeInBack";
    public static readonly EASE_OUT_BACK: string = "easeOutBack";
    public static readonly EASE_IN_OUT_BACK: string = "easeInOutBack";
    public static readonly EASE_OUT_IN_BACK: string = "easeOutInBack";
    public static readonly _SafeStr_8570: string = "easeInElastic";
    public static readonly _SafeStr_8781: string = "easeOutElastic";
    public static readonly _SafeStr_8611: string = "easeInOutElastic";
    public static readonly _SafeStr_7879: string = "easeOutInElastic";
    public static readonly _SafeStr_8346: string = "easeInBounce";
    public static readonly _SafeStr_8642: string = "easeOutBounce";
    public static readonly _SafeStr_7706: string = "easeInOutBounce";
    public static readonly _SafeStr_8519: string = "easeOutInBounce";
    private static _SafeStr_4424: Map<any, any>;

    public static getTransition(param1: string): (...args: any[]) => any {
        if (Transitions._SafeStr_4424 == null) {
            Transitions.registerDefaults();
        }
        return Transitions._SafeStr_4424.get(param1);
    }

    public static register(param1: string, param2: (...args: any[]) => any): void {
        if (Transitions._SafeStr_4424 == null) {
            Transitions.registerDefaults();
        }
        Transitions._SafeStr_4424.set(param1, param2);
    }

    protected static linear(param1: number): number {
        return param1;
    }

    protected static easeIn(param1: number): number {
        return param1 * param1 * param1;
    }

    protected static easeOut(param1: number): number {
        let _loc2_: number = param1 - 1;
        return _loc2_ * _loc2_ * _loc2_ + 1;
    }

    protected static easeInOut(param1: number): number {
        return Transitions.easeCombined(Transitions.easeIn, Transitions.easeOut, param1);
    }

    protected static easeOutIn(param1: number): number {
        return Transitions.easeCombined(Transitions.easeOut, Transitions.easeIn, param1);
    }

    protected static easeInBack(param1: number): number {
        let _loc2_: number = 1.70158;
        return Math.pow(param1, 2) * ((_loc2_ + 1) * param1 - _loc2_);
    }

    protected static easeOutBack(param1: number): number {
        let _loc3_: number = param1 - 1;
        let _loc2_: number = 1.70158;
        return Math.pow(_loc3_, 2) * ((_loc2_ + 1) * _loc3_ + _loc2_) + 1;
    }

    protected static easeInOutBack(param1: number): number {
        return Transitions.easeCombined(Transitions.easeInBack, Transitions.easeOutBack, param1);
    }

    protected static easeOutInBack(param1: number): number {
        return Transitions.easeCombined(Transitions.easeOutBack, Transitions.easeInBack, param1);
    }

    protected static easeInElastic(param1: number): number {
        let _loc2_: number = NaN;
        let _loc3_: number = NaN;
        let _loc4_: number = NaN;
        if (param1 == 0 || param1 == 1) {
            return param1;
        }
        _loc2_ = 0.3;
        _loc3_ = _loc2_ / 4;
        _loc4_ = param1 - 1;
        return -1 * Math.pow(2, 10 * _loc4_) * Math.sin((_loc4_ - _loc3_) * (2 * 3.141592653589793) / _loc2_);
    }

    protected static easeOutElastic(param1: number): number {
        let _loc2_: number = NaN;
        let _loc3_: number = NaN;
        if (param1 == 0 || param1 == 1) {
            return param1;
        }
        _loc2_ = 0.3;
        _loc3_ = _loc2_ / 4;
        return Math.pow(2, -10 * param1) * Math.sin((param1 - _loc3_) * (2 * 3.141592653589793) / _loc2_) + 1;
    }

    protected static easeInOutElastic(param1: number): number {
        return Transitions.easeCombined(Transitions.easeInElastic, Transitions.easeOutElastic, param1);
    }

    protected static easeOutInElastic(param1: number): number {
        return Transitions.easeCombined(Transitions.easeOutElastic, Transitions.easeInElastic, param1);
    }

    protected static easeInBounce(param1: number): number {
        return 1 - Transitions.easeOutBounce(1 - param1);
    }

    protected static easeOutBounce(param1: number): number {
        let _loc4_: number = NaN;
        let _loc3_: number = 7.5625;
        let _loc2_: number = 2.75;
        if (param1 < 1 / _loc2_) {
            _loc4_ = _loc3_ * Math.pow(param1, 2);
        } else if (param1 < 2 / _loc2_) {
            param1 -= 1.5 / _loc2_;
            _loc4_ = _loc3_ * Math.pow(param1, 2) + 0.75;
        } else if (param1 < 2.5 / _loc2_) {
            param1 -= 2.25 / _loc2_;
            _loc4_ = _loc3_ * Math.pow(param1, 2) + 0.9375;
        } else {
            param1 -= 2.625 / _loc2_;
            _loc4_ = _loc3_ * Math.pow(param1, 2) + 0.984375;
        }
        return _loc4_;
    }

    protected static easeInOutBounce(param1: number): number {
        return Transitions.easeCombined(Transitions.easeInBounce, Transitions.easeOutBounce, param1);
    }

    protected static easeOutInBounce(param1: number): number {
        return Transitions.easeCombined(Transitions.easeOutBounce, Transitions.easeInBounce, param1);
    }

    protected static easeCombined(param1: (...args: any[]) => any, param2: (...args: any[]) => any, param3: number): number {
        if (param3 < 0.5) {
            return 0.5 * param1(param3 * 2);
        }
        return 0.5 * param2((param3 - 0.5) * 2) + 0.5;
    }

    private static registerDefaults(): void {
        Transitions._SafeStr_4424 = new Dictionary();
        Transitions.register("linear", Transitions.linear);
        Transitions.register("easeIn", Transitions.easeIn);
        Transitions.register("easeOut", Transitions.easeOut);
        Transitions.register("easeInOut", Transitions.easeInOut);
        Transitions.register("easeOutIn", Transitions.easeOutIn);
        Transitions.register("easeInBack", Transitions.easeInBack);
        Transitions.register("easeOutBack", Transitions.easeOutBack);
        Transitions.register("easeInOutBack", Transitions.easeInOutBack);
        Transitions.register("easeOutInBack", Transitions.easeOutInBack);
        Transitions.register("easeInElastic", Transitions.easeInElastic);
        Transitions.register("easeOutElastic", Transitions.easeOutElastic);
        Transitions.register("easeInOutElastic", Transitions.easeInOutElastic);
        Transitions.register("easeOutInElastic", Transitions.easeOutInElastic);
        Transitions.register("easeInBounce", Transitions.easeInBounce);
        Transitions.register("easeOutBounce", Transitions.easeOutBounce);
        Transitions.register("easeInOutBounce", Transitions.easeInOutBounce);
        Transitions.register("easeOutInBounce", Transitions.easeOutInBounce);
    }

    constructor() {
    }
}
