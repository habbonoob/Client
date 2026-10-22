import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboTrackingBootstrap } from '@/com/sulake/bootstrap/HabboTrackingBootstrap';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboTrackingLib_manifest_binAsset = embedBytes("tracking/HabboTrackingLib_manifest.bin");

export class HabboTrackingLib extends SimpleApplication {
    static { registerClassName(this, 'HabboTrackingLib'); }

    static #staticsReady = false;

    public static manifest = HabboTrackingLib_manifest_binAsset;

    public static get requiredClasses(): any[] {
        HabboTrackingLib.#initStatics();
        return HabboTrackingLib.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboTrackingLib.#initStatics();
        HabboTrackingLib.requiredClasses = value;
    }

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboTrackingLib.#staticsReady) return;
        HabboTrackingLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboTrackingLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboTrackingBootstrap, IIDHabboTracking]);
    }
}
