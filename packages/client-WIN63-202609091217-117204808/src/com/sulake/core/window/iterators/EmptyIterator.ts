import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import { Proxy } from '@habbo-pixi/runtime/utils/Proxy';

export class EmptyIterator extends Proxy implements IIterator {
    static { registerClassName(this, 'com.sulake.core.window.iterators::EmptyIterator'); }

    static #staticsReady = false;

    public static get INSTANCE(): EmptyIterator {
        EmptyIterator.#initStatics();
        return EmptyIterator.INSTANCE;
    }

    constructor() {
        super();
    }

    public get length(): number {
        return 0;
    }

    public indexOf(param1: any): number {
        return -1;
    }

    public override getProperty(param1: any): any {
        return null;
    }

    public override setProperty(param1: any, param2: any): void {
    }

    public override nextNameIndex(param1: number): number {
        return 0;
    }

    public override nextValue(param1: number): any {
        return null;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (EmptyIterator.#staticsReady) return;
        EmptyIterator.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(EmptyIterator, name, { value, writable: true, configurable: true, enumerable: true });
        set("INSTANCE", null);
        set("INSTANCE", new EmptyIterator());
    }
}
