import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { RoomSessionManagerBootstrap } from '@/com/sulake/bootstrap/RoomSessionManagerBootstrap';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboRoomSessionManagerLib_manifest_binAsset = embedBytes("session/HabboRoomSessionManagerLib_manifest.bin");

export class HabboRoomSessionManagerLib extends SimpleApplication {
    static { registerClassName(this, 'HabboRoomSessionManagerLib'); }

    static #staticsReady = false;

    public static manifest = HabboRoomSessionManagerLib_manifest_binAsset;

    public static get requiredClasses(): any[] {
        HabboRoomSessionManagerLib.#initStatics();
        return HabboRoomSessionManagerLib.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboRoomSessionManagerLib.#initStatics();
        HabboRoomSessionManagerLib.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboRoomSessionManagerLib.#staticsReady) return;
        HabboRoomSessionManagerLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboRoomSessionManagerLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [RoomSessionManagerBootstrap, IIDHabboRoomSessionManager]);
    }
}
