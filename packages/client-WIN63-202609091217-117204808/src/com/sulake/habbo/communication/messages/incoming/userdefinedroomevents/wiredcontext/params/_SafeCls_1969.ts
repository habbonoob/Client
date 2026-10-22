import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_1969 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::_SafeCls_1969'); }

    static #staticsReady = false;

    public static get _SafeStr_4649(): _SafeCls_1969 {
        _SafeCls_1969.#initStatics();
        return _SafeCls_1969._SafeStr_4649;
    }
    public static set _SafeStr_4649(value: _SafeCls_1969) {
        _SafeCls_1969.#initStatics();
        _SafeCls_1969._SafeStr_4649 = value;
    }

    constructor() {
    }

    public get variables(): any[] {
        return [];
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (_SafeCls_1969.#staticsReady) return;
        _SafeCls_1969.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(_SafeCls_1969, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_4649", null);
        set("_SafeStr_4649", new _SafeCls_1969());
    }
}
