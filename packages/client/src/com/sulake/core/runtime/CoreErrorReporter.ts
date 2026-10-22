import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreErrorLogger } from '@/com/sulake/core/runtime/ICoreErrorLogger';
import type { ICoreErrorReporter } from '@/com/sulake/core/runtime/ICoreErrorReporter';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class CoreErrorReporter implements ICoreErrorReporter {
    static { registerClassName(this, 'com.sulake.core.runtime::CoreErrorReporter'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        CoreErrorReporter.#initStatics();
        return CoreErrorReporter._log;
    }

    public set errorLogger(param1: ICoreErrorLogger) {
    }

    public logError(param1: string, param2: boolean, param3: number = -1, param4: Error = null): void {
        CoreErrorReporter._log.error(param1, param3, param4);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (CoreErrorReporter.#staticsReady) return;
        CoreErrorReporter.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(CoreErrorReporter, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.core.runtime.CoreErrorReporter"));
    }
}
