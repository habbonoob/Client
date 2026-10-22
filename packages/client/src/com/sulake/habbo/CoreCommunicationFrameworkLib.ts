import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { CoreCommunicationManagerBootstrap } from '@/com/sulake/bootstrap/CoreCommunicationManagerBootstrap';
import { IIDCoreCommunicationManager } from '@/com/sulake/iid/IIDCoreCommunicationManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const CoreCommunicationFrameworkLib_manifest_binAsset = embedBytes("communication/CoreCommunicationFrameworkLib_manifest.bin");

export class CoreCommunicationFrameworkLib extends SimpleApplication {
    static { registerClassName(this, 'CoreCommunicationFrameworkLib'); }

    static #staticsReady = false;

    public static manifest = CoreCommunicationFrameworkLib_manifest_binAsset;

    public static get requiredClasses(): any[] {
        CoreCommunicationFrameworkLib.#initStatics();
        return CoreCommunicationFrameworkLib.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        CoreCommunicationFrameworkLib.#initStatics();
        CoreCommunicationFrameworkLib.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (CoreCommunicationFrameworkLib.#staticsReady) return;
        CoreCommunicationFrameworkLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(CoreCommunicationFrameworkLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [CoreCommunicationManagerBootstrap, IIDCoreCommunicationManager]);
    }
}
