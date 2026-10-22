import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboAvatarEditorManagerBootstrap } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager.group';
import { IIDHabboAvatarEditor } from '@/com/sulake/iid/IIDHabboAvatarEditor';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboAvatarEditorCom_manifest_binAsset = embedBytes("avatar/HabboAvatarEditorCom_manifest.bin");
const AvatarEditor_binAsset = embedBytes("avatar/AvatarEditor.bin");
const AvatarEditorFrame_binAsset = embedBytes("avatar/AvatarEditorFrame.bin");
const AvatarEditorContent_binAsset = embedBytes("avatar/AvatarEditorContent.bin");
const StripClubItemsInfo_binAsset = embedBytes("avatar/StripClubItemsInfo.bin");
const Outfit_binAsset = embedBytes("avatar/Outfit.bin");
const avatareditor_wardrobe_base_binAsset = embedBytes("avatar/avatareditor_wardrobe_base.bin");
const avatar_editor_effect_griditem_xml_binAsset = embedBytes("avatar/avatar_editor_effect_griditem_xml.bin");
const avatar_editor_name_change_binAsset = embedBytes("avatar/avatar_editor_name_change.bin");
const avatar_editor_name_change_item_binAsset = embedBytes("avatar/avatar_editor_name_change_item.bin");

export class HabboAvatarEditorCom extends SimpleApplication {
    static { registerClassName(this, 'HabboAvatarEditorCom'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboAvatarEditorCom.#initStatics();
        return HabboAvatarEditorCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboAvatarEditorCom.#initStatics();
        HabboAvatarEditorCom.requiredClasses = value;
    }

    public static manifest = HabboAvatarEditorCom_manifest_binAsset;

    public static AvatarEditor = AvatarEditor_binAsset;

    public static AvatarEditorFrame = AvatarEditorFrame_binAsset;

    public static AvatarEditorContent = AvatarEditorContent_binAsset;

    public static StripClubItemsInfo = StripClubItemsInfo_binAsset;

    public static Outfit = Outfit_binAsset;

    public static avatareditor_wardrobe_base = avatareditor_wardrobe_base_binAsset;

    public static avatar_editor_effect_griditem_xml = avatar_editor_effect_griditem_xml_binAsset;

    public static avatar_editor_name_change = avatar_editor_name_change_binAsset;

    public static avatar_editor_name_change_item = avatar_editor_name_change_item_binAsset;

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboAvatarEditorCom.#staticsReady) return;
        HabboAvatarEditorCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboAvatarEditorCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboAvatarEditorManagerBootstrap, IIDHabboAvatarEditor]);
    }
}
