import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class Resources {
    static { registerClassName(this, 'com.sulake.core.utils::Resources'); }

    static #staticsReady = false;

    private static get _resources(): UtilsMap {
        Resources.#initStatics();
        return Resources._resources;
    }
    private static set _resources(value: UtilsMap) {
        Resources.#initStatics();
        Resources._resources = value;
    }

    public static _SafeStr_2119(param1: string): any {
        return Resources._resources[param1];
    }

    public static assign(param1: string, param2: any): any {
        return Resources._resources[param1] = param2;
    }

    public static remove(param1: string): any {
        return Resources._resources.remove(param1);
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Resources.#staticsReady) return;
        Resources.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Resources, name, { value, writable: true, configurable: true, enumerable: true });
        set("_resources", null);
        set("_resources", new UtilsMap());
    }
}
