import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class ErrorReportStorage {
    static { registerClassName(this, 'com.sulake.core.utils::ErrorReportStorage'); }

    static #staticsReady = false;

    private static get _SafeStr_3396(): UtilsMap {
        ErrorReportStorage.#initStatics();
        return ErrorReportStorage._SafeStr_3396;
    }
    private static set _SafeStr_3396(value: UtilsMap) {
        ErrorReportStorage.#initStatics();
        ErrorReportStorage._SafeStr_3396 = value;
    }

    private static get _SafeStr_3884(): UtilsMap {
        ErrorReportStorage.#initStatics();
        return ErrorReportStorage._SafeStr_3884;
    }
    private static set _SafeStr_3884(value: UtilsMap) {
        ErrorReportStorage.#initStatics();
        ErrorReportStorage._SafeStr_3884 = value;
    }

    constructor() {
    }

    public static getDebugData(): string {
        let _loc2_: number = 0;
        let _loc1_: string = "";
        _loc2_ = 0;
        while (_loc2_ < ErrorReportStorage._SafeStr_3884.length) {
            if (_loc2_ == 0) {
                _loc1_ = stringOrNull(ErrorReportStorage._SafeStr_3884.getWithIndex(_loc2_));
            } else {
                _loc1_ = _loc1_ + " ** " + ErrorReportStorage._SafeStr_3884.getWithIndex(_loc2_);
            }
            _loc2_++;
        }
        if (_loc1_.length > 400) {
            _loc1_ = _loc1_.substr(_loc1_.length - 400);
        }
        return _loc1_;
    }

    public static addDebugData(param1: string, param2: string): void {
        ErrorReportStorage._SafeStr_3884.remove(param1);
        ErrorReportStorage._SafeStr_3884.add(param1, param2);
    }

    public static setParameter(param1: string, param2: string): void {
        ErrorReportStorage._SafeStr_3396[param1] = param2;
    }

    public static getParameter(param1: string): string {
        return stringOrNull(ErrorReportStorage._SafeStr_3396[param1]);
    }

    public static getParameterNames(): any[] {
        return ErrorReportStorage._SafeStr_3396.getKeys();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ErrorReportStorage.#staticsReady) return;
        ErrorReportStorage.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ErrorReportStorage, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_3396", null);
        set("_SafeStr_3884", null);
        set("_SafeStr_3396", new UtilsMap());
        set("_SafeStr_3884", new UtilsMap());
    }
}
