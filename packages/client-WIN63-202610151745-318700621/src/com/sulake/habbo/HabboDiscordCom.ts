import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboDiscordManagerBootstrap } from '@/com/sulake/bootstrap/HabboDiscordManagerBootstrap';
import { IIDHabboDiscordManager } from '@/com/sulake/iid/IIDHabboDiscordManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const discord_settings_xml_binAsset = embedBytes("discord/discord_settings_xml.bin");
const HabboDiscordCom_manifest_binAsset = embedBytes("discord/HabboDiscordCom_manifest.bin");

export class HabboDiscordCom extends SimpleApplication {
    static { registerClassName(this, 'HabboDiscordCom'); }

    static #staticsReady = false;

    public static discord_settings_xml = discord_settings_xml_binAsset;

    public static manifest = HabboDiscordCom_manifest_binAsset;

    public static get requiredClasses(): any[] {
        HabboDiscordCom.#initStatics();
        return HabboDiscordCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboDiscordCom.#initStatics();
        HabboDiscordCom.requiredClasses = value;
    }

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboDiscordCom.#staticsReady) return;
        HabboDiscordCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboDiscordCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboDiscordManagerBootstrap, IIDHabboDiscordManager]);
    }
}
