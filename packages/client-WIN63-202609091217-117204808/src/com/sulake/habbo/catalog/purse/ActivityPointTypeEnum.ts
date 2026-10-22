import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class ActivityPointTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.catalog.purse::ActivityPointTypeEnum'); }

    static #staticsReady = false;

    public static readonly DUCKET: number = 0;
    public static readonly _SafeStr_8022: number = 3;
    public static readonly _SafeStr_7970: number = 5;
    public static readonly CREDITS: number = 7;
    public static readonly SEASONAL_1: number = 101;
    public static readonly SEASONAL_2: number = 102;
    public static readonly SEASONAL_3: number = 103;
    public static readonly SEASONAL_4: number = 104;
    public static readonly SEASONAL_5: number = 105;
    public static readonly NO_OP_1: number = 1;
    public static readonly NO_OP_2: number = 2;
    public static readonly NO_OP_4: number = 4;
    public static readonly SILVER: number = 1000;
    public static readonly EMERALD: number = 1001;

    private static get _SafeStr_5849(): UtilsMap {
        ActivityPointTypeEnum.#initStatics();
        return ActivityPointTypeEnum._SafeStr_5849;
    }

    constructor() {
    }

    private static createSeasonalCurrencyIconMap(): UtilsMap {
        let _loc1_: UtilsMap = new UtilsMap();
        _loc1_.add("snowflakes", [27, 27]);
        _loc1_.add("horseshoes", [31, 30]);
        _loc1_.add("nuts", [39, 38]);
        _loc1_.add("stars", [45, 44]);
        _loc1_.add("clouds", [46, 47]);
        _loc1_.add("plain_pumpkins", [49, 50]);
        _loc1_.add("seashells", [55, 55]);
        _loc1_.add("flowers", [59, 58]);
        _loc1_.add("candy", [61, 60]);
        _loc1_.add("popsicles", [63, 62]);
        _loc1_.add("golden_fishes", [65, 64]);
        _loc1_.add("balloons", [67, 66]);
        _loc1_.add("pumpkins", [69, 68]);
        _loc1_.add("easter_eggs", [73, 72]);
        _loc1_.add("truffles", [75, 74]);
        _loc1_.add("blue_balloons", [77, 76]);
        _loc1_.add("mushrooms", [79, 78]);
        _loc1_.add("acorn", [81, 80]);
        _loc1_.add("coconuts", [83, 82]);
        _loc1_.add("cards", [85, 84]);
        _loc1_.add("letter", [87, 86]);
        return _loc1_;
    }

    public static values(): any[] {
        return [0, 101, 102, 103, 104, 105, 1, 2, 4];
    }

    public static getIconStyleFor(param1: number, param2: ICoreConfiguration, param3: boolean, param4: boolean = false): number {
        let _loc5_: string = null;
        let _loc6_: any[] = null;
        if (param1 == -1 || param1 == 7) {
            return param3 ? 34 : 35;
        }
        if (param1 == 0) {
            return param3 ? 32 : 33;
        }
        if (param1 == 3) {
            return param3 ? 36 : 37;
        }
        if (param1 == 5) {
            if (param2.getBoolean("diamonds.enabled")) {
                return param3 ? 41 : 42;
            }
            return param3 ? 53 : 54;
        }
        if (param1 == 1000) {
            return param3 ? 56 : 57;
        }
        if (param1 == 1001) {
            return param3 ? 70 : 71;
        }
        if (ActivityPointTypeEnum.isSeasonal(param1)) {
            _loc5_ = param2.getProperty("seasonalcurrency.id." + param1);
            if (ActivityPointTypeEnum._SafeStr_5849.hasKey(_loc5_)) {
                _loc6_ = ActivityPointTypeEnum._SafeStr_5849.getValue(_loc5_);
                return Number(param3 ? _loc6_[1] : _loc6_[0]) | 0;
            }
        }
        let _loc7_: string = "currencyiconstyle." + (param3 ? "big" : "small") + "." + param1 + (param4 ? ".combo" : "");
        return param2.getInteger(_loc7_, 0);
    }

    public static isVisible(param1: number): boolean {
        if ([1, 2, 4].indexOf(param1) != 1) {
            return false;
        }
        return true;
    }

    public static isSeasonal(param1: number): boolean {
        return param1 >= 101 && param1 <= 105;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ActivityPointTypeEnum.#staticsReady) return;
        ActivityPointTypeEnum.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ActivityPointTypeEnum, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_5849", null);
        set("_SafeStr_5849", ActivityPointTypeEnum.createSeasonalCurrencyIconMap());
    }
}
