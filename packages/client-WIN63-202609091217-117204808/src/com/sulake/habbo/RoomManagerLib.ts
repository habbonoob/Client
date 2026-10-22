import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { RoomManagerBootstrap } from '@/com/sulake/bootstrap/RoomManagerBootstrap';
import { IIDRoomManager } from '@/com/sulake/iid/IIDRoomManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const RoomManagerLib_manifest_binAsset = embedBytes("room/RoomManagerLib_manifest.bin");

export class RoomManagerLib extends SimpleApplication {
    static { registerClassName(this, 'RoomManagerLib'); }

    static #staticsReady = false;

    public static manifest = RoomManagerLib_manifest_binAsset;

    public static get requiredClasses(): any[] {
        RoomManagerLib.#initStatics();
        return RoomManagerLib.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        RoomManagerLib.#initStatics();
        RoomManagerLib.requiredClasses = value;
    }

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomManagerLib.#staticsReady) return;
        RoomManagerLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomManagerLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [RoomManagerBootstrap, IIDRoomManager]);
    }
}
