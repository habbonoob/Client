import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { SessionDataManagerBootstrap } from '@/com/sulake/bootstrap/SessionDataManagerBootstrap';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboSessionDataManagerLib_manifest_binAsset = embedBytes("session/HabboSessionDataManagerLib_manifest.bin");
const loading_icon_pngAsset = embedBitmap("shared/loading_icon.png");

export class HabboSessionDataManagerLib extends SimpleApplication {
    static { registerClassName(this, 'HabboSessionDataManagerLib'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboSessionDataManagerLib.#initStatics();
        return HabboSessionDataManagerLib.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboSessionDataManagerLib.#initStatics();
        HabboSessionDataManagerLib.requiredClasses = value;
    }

    public static manifest = HabboSessionDataManagerLib_manifest_binAsset;

    public static loading_icon = loading_icon_pngAsset;

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboSessionDataManagerLib.#staticsReady) return;
        HabboSessionDataManagerLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboSessionDataManagerLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [SessionDataManagerBootstrap, IIDSessionDataManager]);
    }
}
