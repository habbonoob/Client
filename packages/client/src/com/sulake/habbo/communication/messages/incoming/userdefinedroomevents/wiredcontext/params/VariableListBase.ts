import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableListBase {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::VariableListBase'); }

    static #staticsReady = false;

    public static get _SafeStr_4649(): VariableListBase {
        VariableListBase.#initStatics();
        return VariableListBase._SafeStr_4649;
    }
    public static set _SafeStr_4649(value: VariableListBase) {
        VariableListBase.#initStatics();
        VariableListBase._SafeStr_4649 = value;
    }

    public get variables(): any[] {
        return [];
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (VariableListBase.#staticsReady) return;
        VariableListBase.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(VariableListBase, name, { value, writable: true, configurable: true, enumerable: true });
        set("_SafeStr_4649", null);
        set("_SafeStr_4649", new VariableListBase());
    }
}
