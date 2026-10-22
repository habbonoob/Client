import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { ModerationManagerBootstrap } from '@/com/sulake/bootstrap/ModerationManagerBootstrap';
import { IIDHabboModeration } from '@/com/sulake/iid/IIDHabboModeration';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboModerationCom_manifest_binAsset = embedBytes("moderation/HabboModerationCom_manifest.bin");
const evidence_frame_xml_binAsset = embedBytes("moderation/evidence_frame_xml.bin");
const issue_browser_xml_binAsset = embedBytes("moderation/issue_browser_xml.bin");
const modact_summary_xml_binAsset = embedBytes("moderation/modact_summary_xml.bin");
const new_moderation_tool_xml_binAsset = embedBytes("moderation/new_moderation_tool_xml.bin");
const send_msgs_xml_binAsset = embedBytes("moderation/send_msgs_xml.bin");
const start_panel_xml_binAsset = embedBytes("moderation/start_panel_xml.bin");
const user_info_xml_binAsset = embedBytes("moderation/user_info_xml.bin");
const user_info_frame_xml_binAsset = embedBytes("moderation/user_info_frame_xml.bin");
const issue_handler_xml_binAsset = embedBytes("moderation/issue_handler_xml.bin");
const roomtool_frame_xml_binAsset = embedBytes("moderation/roomtool_frame_xml.bin");
const roomvisits_frame_xml_binAsset = embedBytes("moderation/roomvisits_frame_xml.bin");
const userclassification_frame_xml_binAsset = embedBytes("moderation/userclassification_frame_xml.bin");
const room_icon_png_pngAsset = embedBitmap("moderation/room_icon_png.png");
const user_icon_png_pngAsset = embedBitmap("moderation/user_icon_png.png");

export class HabboModerationCom extends SimpleApplication {
    static { registerClassName(this, 'HabboModerationCom'); }

    static #staticsReady = false;

    public static manifest = HabboModerationCom_manifest_binAsset;

    public static get requiredClasses(): any[] {
        HabboModerationCom.#initStatics();
        return HabboModerationCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboModerationCom.#initStatics();
        HabboModerationCom.requiredClasses = value;
    }

    public static evidence_frame_xml = evidence_frame_xml_binAsset;

    public static issue_browser_xml = issue_browser_xml_binAsset;

    public static modact_summary_xml = modact_summary_xml_binAsset;

    public static new_moderation_tool_xml = new_moderation_tool_xml_binAsset;

    public static send_msgs_xml = send_msgs_xml_binAsset;

    public static start_panel_xml = start_panel_xml_binAsset;

    public static user_info_xml = user_info_xml_binAsset;

    public static user_info_frame_xml = user_info_frame_xml_binAsset;

    public static issue_handler_xml = issue_handler_xml_binAsset;

    public static roomtool_frame_xml = roomtool_frame_xml_binAsset;

    public static roomvisits_frame_xml = roomvisits_frame_xml_binAsset;

    public static userclassification_frame_xml = userclassification_frame_xml_binAsset;

    public static room_icon_png = room_icon_png_pngAsset;

    public static user_icon_png = user_icon_png_pngAsset;

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboModerationCom.#staticsReady) return;
        HabboModerationCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboModerationCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [ModerationManagerBootstrap, IIDHabboModeration]);
    }
}
