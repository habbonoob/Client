import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboNewNavigatorBootstrap } from '@/com/sulake/bootstrap/HabboNewNavigatorBootstrap';
import { IIDHabboNewNavigator } from '@/com/sulake/iid/IIDHabboNewNavigator';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboNewNavigatorCom_manifest_binAsset = embedBytes("navigator/HabboNewNavigatorCom_manifest.bin");
const navigator_frame_2_xml_binAsset = embedBytes("navigator/navigator_frame_2_xml.bin");
const room_info_popup_bubble_xml_binAsset = embedBytes("navigator/room_info_popup_bubble_xml.bin");
const property_xml_binAsset = embedBytes("navigator/property_xml.bin");
const tag_xml_binAsset = embedBytes("navigator/tag_xml.bin");

export class HabboNewNavigatorCom extends SimpleApplication {
    static { registerClassName(this, 'HabboNewNavigatorCom'); }

    static #staticsReady = false;

    public static manifest = HabboNewNavigatorCom_manifest_binAsset;

    public static navigator_frame_2_xml = navigator_frame_2_xml_binAsset;

    public static room_info_popup_bubble_xml = room_info_popup_bubble_xml_binAsset;

    public static property_xml = property_xml_binAsset;

    public static tag_xml = tag_xml_binAsset;

    public static get requiredClasses(): any[] {
        HabboNewNavigatorCom.#initStatics();
        return HabboNewNavigatorCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboNewNavigatorCom.#initStatics();
        HabboNewNavigatorCom.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboNewNavigatorCom.#staticsReady) return;
        HabboNewNavigatorCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboNewNavigatorCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboNewNavigatorBootstrap, IIDHabboNewNavigator]);
    }
}
