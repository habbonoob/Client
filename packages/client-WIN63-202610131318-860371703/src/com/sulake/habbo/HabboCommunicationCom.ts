import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboCommunicationManagerBootstrap } from '@/com/sulake/bootstrap/HabboCommunicationManagerBootstrap';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboCommunicationCom_manifest_binAsset = embedBytes("communication/HabboCommunicationCom_manifest.bin");

export class HabboCommunicationCom extends SimpleApplication {
    static { registerClassName(this, 'HabboCommunicationCom'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboCommunicationCom.#initStatics();
        return HabboCommunicationCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboCommunicationCom.#initStatics();
        HabboCommunicationCom.requiredClasses = value;
    }

    public static manifest = HabboCommunicationCom_manifest_binAsset;

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboCommunicationCom.#staticsReady) return;
        HabboCommunicationCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboCommunicationCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboCommunicationManagerBootstrap, IIDHabboCommunicationManager]);
    }
}
