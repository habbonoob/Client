import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { RoomObjectVisualizationFactoryBootstrap } from '@/com/sulake/bootstrap/RoomObjectVisualizationFactoryBootstrap';
import { IIDRoomObjectVisualizationFactory } from '@/com/sulake/iid/IIDRoomObjectVisualizationFactory';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboRoomObjectVisualizationLib_manifest_binAsset = embedBytes("room/HabboRoomObjectVisualizationLib_manifest.bin");
const pet_experience_bubble_png_pngAsset = embedBitmap("shared/pet_experience_bubble_png.png");
const snowball_small_png_pngAsset = embedBitmap("room/snowball_small_png.png");
const snowball_small_shadow_png_pngAsset = embedBitmap("room/snowball_small_shadow_png.png");
const snowball_big_png_pngAsset = embedBitmap("room/snowball_big_png.png");
const snowball_splash_1_pngAsset = embedBitmap("room/snowball_splash_1.png");
const snowball_splash_2_pngAsset = embedBitmap("room/snowball_splash_2.png");
const snowball_splash_3_pngAsset = embedBitmap("room/snowball_splash_3.png");

export class HabboRoomObjectVisualizationLib extends SimpleApplication {
    static { registerClassName(this, 'HabboRoomObjectVisualizationLib'); }

    static #staticsReady = false;

    public static manifest = HabboRoomObjectVisualizationLib_manifest_binAsset;

    public static pet_experience_bubble_png = pet_experience_bubble_png_pngAsset;

    public static snowball_small_png = snowball_small_png_pngAsset;

    public static snowball_small_shadow_png = snowball_small_shadow_png_pngAsset;

    public static snowball_big_png = snowball_big_png_pngAsset;

    public static snowball_splash_1 = snowball_splash_1_pngAsset;

    public static snowball_splash_2 = snowball_splash_2_pngAsset;

    public static snowball_splash_3 = snowball_splash_3_pngAsset;

    public static get requiredClasses(): any[] {
        HabboRoomObjectVisualizationLib.#initStatics();
        return HabboRoomObjectVisualizationLib.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboRoomObjectVisualizationLib.#initStatics();
        HabboRoomObjectVisualizationLib.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboRoomObjectVisualizationLib.#staticsReady) return;
        HabboRoomObjectVisualizationLib.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboRoomObjectVisualizationLib, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [RoomObjectVisualizationFactoryBootstrap, IIDRoomObjectVisualizationFactory]);
    }
}
