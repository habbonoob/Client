import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { RoomRendererFactoryBootstrap } from '@/com/sulake/bootstrap/RoomRendererFactoryBootstrap';
import { IIDRoomRendererFactory } from '@/com/sulake/iid/IIDRoomRendererFactory';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const RoomSpriteRendererLib_manifest_binAsset = embedBytes("room/RoomSpriteRendererLib_manifest.bin");

export class RoomSpriteRendererLib extends SimpleApplication {
    static { registerClassName(this, 'RoomSpriteRendererLib'); }

    static #staticsReady = false;

    public static manifest = RoomSpriteRendererLib_manifest_binAsset;

    public static get requiredClasses(): any[] {
        RoomSpriteRendererLib.#initStatics();
        return RoomSpriteRendererLib.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        RoomSpriteRendererLib.#initStatics();
        RoomSpriteRendererLib.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomSpriteRendererLib.#staticsReady) return;
        RoomSpriteRendererLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomSpriteRendererLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [RoomRendererFactoryBootstrap, IIDRoomRendererFactory]);
    }
}
