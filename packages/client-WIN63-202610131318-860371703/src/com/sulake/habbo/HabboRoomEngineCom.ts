import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { RoomEngineBootstrap } from '@/com/sulake/bootstrap/RoomEngineBootstrap';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboRoomEngineCom_manifest_binAsset = embedBytes("room/HabboRoomEngineCom_manifest.bin");

export class HabboRoomEngineCom extends SimpleApplication {
    static { registerClassName(this, 'HabboRoomEngineCom'); }

    static #staticsReady = false;

    public static manifest = HabboRoomEngineCom_manifest_binAsset;

    public static get requiredClasses(): any[] {
        HabboRoomEngineCom.#initStatics();
        return HabboRoomEngineCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboRoomEngineCom.#initStatics();
        HabboRoomEngineCom.requiredClasses = value;
    }

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboRoomEngineCom.#staticsReady) return;
        HabboRoomEngineCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboRoomEngineCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [RoomEngineBootstrap, IIDRoomEngine]);
    }
}
