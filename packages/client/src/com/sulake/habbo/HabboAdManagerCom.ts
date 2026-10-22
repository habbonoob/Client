import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { AdManagerBootstrap } from '@/com/sulake/bootstrap/AdManagerBootstrap';
import { IIDHabboAdManager } from '@/com/sulake/iid/IIDHabboAdManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboAdManagerCom_manifest_binAsset = embedBytes("advertisement/HabboAdManagerCom_manifest.bin");

export class HabboAdManagerCom extends SimpleApplication {
    static { registerClassName(this, 'HabboAdManagerCom'); }

    static #staticsReady = false;

    public static manifest = HabboAdManagerCom_manifest_binAsset;

    public static get requiredClasses(): any[] {
        HabboAdManagerCom.#initStatics();
        return HabboAdManagerCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboAdManagerCom.#initStatics();
        HabboAdManagerCom.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboAdManagerCom.#staticsReady) return;
        HabboAdManagerCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboAdManagerCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [AdManagerBootstrap, IIDHabboAdManager]);
    }
}
