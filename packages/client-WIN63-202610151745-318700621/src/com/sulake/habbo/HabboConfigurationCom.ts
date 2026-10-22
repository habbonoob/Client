import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboConfigurationManagerBootstrap } from '@/com/sulake/bootstrap/HabboConfigurationManagerBootstrap';
import { HabboConfigurationManager } from '@/com/sulake/habbo/configuration/HabboConfigurationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboConfigurationCom_manifest_binAsset = embedBytes("configuration/HabboConfigurationCom_manifest.bin");
const common_configuration_binAsset = embedBytes("configuration/common_configuration.bin");
const localization_configuration_binAsset = embedBytes("configuration/localization_configuration.bin");

export class HabboConfigurationCom extends SimpleApplication {
    static { registerClassName(this, 'HabboConfigurationCom'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboConfigurationCom.#initStatics();
        return HabboConfigurationCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboConfigurationCom.#initStatics();
        HabboConfigurationCom.requiredClasses = value;
    }

    public static manifest = HabboConfigurationCom_manifest_binAsset;

    public static common_configuration = common_configuration_binAsset;

    public static localization_configuration = localization_configuration_binAsset;

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboConfigurationCom.#staticsReady) return;
        HabboConfigurationCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboConfigurationCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboConfigurationManagerBootstrap, IIDHabboConfigurationManager, HabboConfigurationManager]);
    }
}
