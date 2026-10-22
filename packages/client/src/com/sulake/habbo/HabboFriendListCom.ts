import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboFriendListBootstrap } from '@/com/sulake/bootstrap/HabboFriendListBootstrap';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboFriendListCom_manifest_binAsset = embedBytes("friendlist/HabboFriendListCom_manifest.bin");
const arrow_down_black_png_pngAsset = embedBitmap("friendlist/arrow_down_black_png.png");
const arrow_down_white_png_pngAsset = embedBitmap("shared/arrow_down_white_png.png");
const arrow_right_black_png_pngAsset = embedBitmap("friendlist/arrow_right_black_png.png");
const arrow_right_white_png_pngAsset = embedBitmap("shared/arrow_right_white_png.png");
const ask_for_friend_png_pngAsset = embedBitmap("friendlist/ask_for_friend_png.png");
const HabboFriendListCom_follow_friend_png_pngAsset = embedBitmap("friendlist/HabboFriendListCom_follow_friend_png.png");
const hdr_hilite_png_pngAsset = embedBitmap("friendlist/hdr_hilite_png.png");
const hdr_friends_png_pngAsset = embedBitmap("friendlist/hdr_friends_png.png");
const hdr_search_png_pngAsset = embedBitmap("friendlist/hdr_search_png.png");
const HabboFriendListCom_minimail_png_pngAsset = embedBitmap("friendlist/HabboFriendListCom_minimail_png.png");
const offline_png_pngAsset = embedBitmap("friendlist/offline_png.png");
const open_edit_ctgs_png_pngAsset = embedBitmap("friendlist/open_edit_ctgs_png.png");
const open_homepage_png_pngAsset = embedBitmap("friendlist/open_homepage_png.png");
const open_inbox_png_pngAsset = embedBitmap("friendlist/open_inbox_png.png");
const HabboMessengerCom_minimail_png_pngAsset = embedBitmap("shared/HabboMessengerCom_minimail_png.png");
const opened_to_web_png_pngAsset = embedBitmap("friendlist/opened_to_web_png.png");
const popup_arrow_left_png_pngAsset = embedBitmap("shared/popup_arrow_left_png.png");
const popup_arrow_right_png_pngAsset = embedBitmap("shared/popup_arrow_right_png.png");
const remove_friend_png_pngAsset = embedBitmap("friendlist/remove_friend_png.png");
const room_invite_png_pngAsset = embedBitmap("friendlist/room_invite_png.png");
const start_chat_png_pngAsset = embedBitmap("friendlist/start_chat_png.png");
const search_png_pngAsset = embedBitmap("friendlist/search_png.png");
const avatar_popup_xml_binAsset = embedBytes("friendlist/avatar_popup_xml.bin");
const friend_entry_xml_binAsset = embedBytes("friendlist/friend_entry_xml.bin");
const friend_remove_confirm_xml_binAsset = embedBytes("friendlist/friend_remove_confirm_xml.bin");
const friend_request_entry_xml_binAsset = embedBytes("friendlist/friend_request_entry_xml.bin");
const friend_requests_footer_xml_binAsset = embedBytes("friendlist/friend_requests_footer_xml.bin");
const friends_footer_xml_binAsset = embedBytes("friendlist/friends_footer_xml.bin");
const opened_to_web_popup_xml_binAsset = embedBytes("friendlist/opened_to_web_popup_xml.bin");
const pagelink_xml_binAsset = embedBytes("friendlist/pagelink_xml.bin");
const HabboFriendListCom_main_window_xml_binAsset = embedBytes("friendlist/HabboFriendListCom_main_window_xml.bin");
const room_invite_confirm_xml_binAsset = embedBytes("friendlist/room_invite_confirm_xml.bin");
const search_entry_xml_binAsset = embedBytes("friendlist/search_entry_xml.bin");
const search_footer_xml_binAsset = embedBytes("friendlist/search_footer_xml.bin");
const HabboFriendListCom_simple_alert_xml_binAsset = embedBytes("friendlist/HabboFriendListCom_simple_alert_xml.bin");
const tab_content_xml_binAsset = embedBytes("friendlist/tab_content_xml.bin");
const relationship_chooser_xml_binAsset = embedBytes("friendlist/relationship_chooser_xml.bin");

export class HabboFriendListCom extends SimpleApplication {
    static { registerClassName(this, 'HabboFriendListCom'); }

    static #staticsReady = false;

    public static manifest = HabboFriendListCom_manifest_binAsset;

    public static arrow_down_black_png = arrow_down_black_png_pngAsset;

    public static arrow_down_white_png = arrow_down_white_png_pngAsset;

    public static arrow_right_black_png = arrow_right_black_png_pngAsset;

    public static arrow_right_white_png = arrow_right_white_png_pngAsset;

    public static ask_for_friend_png = ask_for_friend_png_pngAsset;

    public static follow_friend_png = HabboFriendListCom_follow_friend_png_pngAsset;

    public static hdr_friend_requests_png = hdr_hilite_png_pngAsset;

    public static hdr_friends_png = hdr_friends_png_pngAsset;

    public static hdr_hilite_png = hdr_hilite_png_pngAsset;

    public static hdr_search_png = hdr_search_png_pngAsset;

    public static minimail_png = HabboFriendListCom_minimail_png_pngAsset;

    public static offline_png = offline_png_pngAsset;

    public static open_edit_ctgs_png = open_edit_ctgs_png_pngAsset;

    public static open_homepage_png = open_homepage_png_pngAsset;

    public static open_inbox_png = open_inbox_png_pngAsset;

    public static open_minimail_png = HabboMessengerCom_minimail_png_pngAsset;

    public static opened_to_web_png = opened_to_web_png_pngAsset;

    public static popup_arrow_left_png = popup_arrow_left_png_pngAsset;

    public static popup_arrow_right_png = popup_arrow_right_png_pngAsset;

    public static remove_friend_png = remove_friend_png_pngAsset;

    public static room_invite_png = room_invite_png_pngAsset;

    public static start_chat_png = start_chat_png_pngAsset;

    public static search_png = search_png_pngAsset;

    public static avatar_popup_xml = avatar_popup_xml_binAsset;

    public static friend_entry_xml = friend_entry_xml_binAsset;

    public static friend_remove_confirm_xml = friend_remove_confirm_xml_binAsset;

    public static friend_request_entry_xml = friend_request_entry_xml_binAsset;

    public static friend_requests_footer_xml = friend_requests_footer_xml_binAsset;

    public static friends_footer_xml = friends_footer_xml_binAsset;

    public static opened_to_web_popup_xml = opened_to_web_popup_xml_binAsset;

    public static pagelink_xml = pagelink_xml_binAsset;

    public static main_window_xml = HabboFriendListCom_main_window_xml_binAsset;

    public static room_invite_confirm_xml = room_invite_confirm_xml_binAsset;

    public static search_entry_xml = search_entry_xml_binAsset;

    public static search_footer_xml = search_footer_xml_binAsset;

    public static simple_alert_xml = HabboFriendListCom_simple_alert_xml_binAsset;

    public static tab_content_xml = tab_content_xml_binAsset;

    public static relationship_chooser_xml = relationship_chooser_xml_binAsset;

    public static get requiredClasses(): any[] {
        HabboFriendListCom.#initStatics();
        return HabboFriendListCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboFriendListCom.#initStatics();
        HabboFriendListCom.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboFriendListCom.#staticsReady) return;
        HabboFriendListCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboFriendListCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboFriendListBootstrap, IIDHabboFriendList]);
    }
}
