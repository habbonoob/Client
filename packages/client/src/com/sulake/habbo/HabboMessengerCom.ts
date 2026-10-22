import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboMessengerBootstrap } from '@/com/sulake/bootstrap/HabboMessengerBootstrap';
import { IIDHabboMessenger } from '@/com/sulake/iid/IIDHabboMessenger';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboMessengerCom_manifest_binAsset = embedBytes("messenger/HabboMessengerCom_manifest.bin");
const close_png_pngAsset = embedBitmap("messenger/close_png.png");
const convo_bg_png_pngAsset = embedBitmap("messenger/convo_bg_png.png");
const HabboMessengerCom_follow_friend_png_pngAsset = embedBitmap("messenger/HabboMessengerCom_follow_friend_png.png");
const HabboMessengerCom_minimail_png_pngAsset = embedBitmap("shared/HabboMessengerCom_minimail_png.png");
const next_png_pngAsset = embedBitmap("messenger/next_png.png");
const prev_png_pngAsset = embedBitmap("messenger/prev_png.png");
const resize_png_pngAsset = embedBitmap("messenger/resize_png.png");
const tab_bg_hilite_png_pngAsset = embedBitmap("messenger/tab_bg_hilite_png.png");
const tab_bg_next_png_pngAsset = embedBitmap("messenger/tab_bg_next_png.png");
const tab_bg_sel_png_pngAsset = embedBitmap("messenger/tab_bg_sel_png.png");
const tab_bg_unsel_png_pngAsset = embedBitmap("messenger/tab_bg_unsel_png.png");
const HabboMessengerCom_main_window_xml_binAsset = embedBytes("messenger/HabboMessengerCom_main_window_xml.bin");
const msg_entry_xml_binAsset = embedBytes("messenger/msg_entry_xml.bin");
const tab_entry_xml_binAsset = embedBytes("messenger/tab_entry_xml.bin");
const messenger_xml_binAsset = embedBytes("messenger/messenger_xml.bin");

export class HabboMessengerCom extends SimpleApplication {
    static { registerClassName(this, 'HabboMessengerCom'); }

    static #staticsReady = false;

    public static manifest = HabboMessengerCom_manifest_binAsset;

    public static close_png = close_png_pngAsset;

    public static convo_bg_png = convo_bg_png_pngAsset;

    public static follow_friend_png = HabboMessengerCom_follow_friend_png_pngAsset;

    public static minimail_png = HabboMessengerCom_minimail_png_pngAsset;

    public static next_png = next_png_pngAsset;

    public static prev_png = prev_png_pngAsset;

    public static resize_png = resize_png_pngAsset;

    public static tab_bg_hilite_png = tab_bg_hilite_png_pngAsset;

    public static tab_bg_next_png = tab_bg_next_png_pngAsset;

    public static tab_bg_sel_png = tab_bg_sel_png_pngAsset;

    public static tab_bg_unsel_png = tab_bg_unsel_png_pngAsset;

    public static main_window_xml = HabboMessengerCom_main_window_xml_binAsset;

    public static msg_entry_xml = msg_entry_xml_binAsset;

    public static tab_entry_xml = tab_entry_xml_binAsset;

    public static messenger_xml = messenger_xml_binAsset;

    public static get requiredClasses(): any[] {
        HabboMessengerCom.#initStatics();
        return HabboMessengerCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboMessengerCom.#initStatics();
        HabboMessengerCom.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboMessengerCom.#staticsReady) return;
        HabboMessengerCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboMessengerCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboMessengerBootstrap, IIDHabboMessenger]);
    }
}
