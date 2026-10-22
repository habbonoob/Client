import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { RoomObjectFactoryBootstrap } from '@/com/sulake/bootstrap/RoomObjectFactoryBootstrap';
import { IIDRoomObjectFactory } from '@/com/sulake/iid/IIDRoomObjectFactory';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboRoomObjectLogicLib_manifest_binAsset = embedBytes("room/HabboRoomObjectLogicLib_manifest.bin");

export class HabboRoomObjectLogicLib extends SimpleApplication {
    static { registerClassName(this, 'HabboRoomObjectLogicLib'); }

    static #staticsReady = false;

    public static manifest = HabboRoomObjectLogicLib_manifest_binAsset;

    public static get requiredClasses(): any[] {
        HabboRoomObjectLogicLib.#initStatics();
        return HabboRoomObjectLogicLib.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboRoomObjectLogicLib.#initStatics();
        HabboRoomObjectLogicLib.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboRoomObjectLogicLib.#staticsReady) return;
        HabboRoomObjectLogicLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboRoomObjectLogicLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [RoomObjectFactoryBootstrap, IIDRoomObjectFactory]);
    }
}
