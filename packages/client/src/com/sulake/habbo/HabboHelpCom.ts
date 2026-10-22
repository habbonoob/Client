import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboHelpBootstrap } from '@/com/sulake/bootstrap/HabboHelpBootstrap';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboHelpCom_manifest_binAsset = embedBytes("help/HabboHelpCom_manifest.bin");
const welcome_name_change_xml_binAsset = embedBytes("help/welcome_name_change_xml.bin");
const welcome_name_selection_xml_binAsset = embedBytes("help/welcome_name_selection_xml.bin");
const welcome_name_suggestion_item_xml_binAsset = embedBytes("help/welcome_name_suggestion_item_xml.bin");
const welcome_name_confirmation_xml_binAsset = embedBytes("help/welcome_name_confirmation_xml.bin");
const welcome_screen_xml_binAsset = embedBytes("help/welcome_screen_xml.bin");
const welcome_tour_popup_xml_binAsset = embedBytes("help/welcome_tour_popup_xml.bin");
const topics_flow_help_xml_binAsset = embedBytes("help/topics_flow_help_xml.bin");
const main_help_xml_binAsset = embedBytes("help/main_help_xml.bin");
const main_xml_binAsset = embedBytes("help/main_xml.bin");
const user_create_xml_binAsset = embedBytes("help/user_create_xml.bin");
const user_pending_xml_binAsset = embedBytes("help/user_pending_xml.bin");
const user_ongoing_xml_binAsset = embedBytes("help/user_ongoing_xml.bin");
const user_feedback_xml_binAsset = embedBytes("help/user_feedback_xml.bin");
const user_thanks_xml_binAsset = embedBytes("help/user_thanks_xml.bin");
const user_guide_disconnected_xml_binAsset = embedBytes("help/user_guide_disconnected_xml.bin");
const guide_tool_xml_binAsset = embedBytes("help/guide_tool_xml.bin");
const guide_accept_xml_binAsset = embedBytes("help/guide_accept_xml.bin");
const guide_ongoing_xml_binAsset = embedBytes("help/guide_ongoing_xml.bin");
const guide_closed_xml_binAsset = embedBytes("help/guide_closed_xml.bin");
const guardian_chat_review_accept_xml_binAsset = embedBytes("help/guardian_chat_review_accept_xml.bin");
const guardian_chat_review_results_xml_binAsset = embedBytes("help/guardian_chat_review_results_xml.bin");
const guardian_chat_review_vote_xml_binAsset = embedBytes("help/guardian_chat_review_vote_xml.bin");
const guardian_chat_review_wait_for_results_xml_binAsset = embedBytes("help/guardian_chat_review_wait_for_results_xml.bin");
const guardian_chat_review_wait_for_voters_xml_binAsset = embedBytes("help/guardian_chat_review_wait_for_voters_xml.bin");
const report_window_xml_binAsset = embedBytes("help/report_window_xml.bin");
const error_window_xml_binAsset = embedBytes("help/error_window_xml.bin");
const chat_msg_xml_binAsset = embedBytes("help/chat_msg_xml.bin");
const chat_msg_notification_xml_binAsset = embedBytes("help/chat_msg_notification_xml.bin");
const chat_msg_reminder_xml_binAsset = embedBytes("help/chat_msg_reminder_xml.bin");
const rejected_window_xml_binAsset = embedBytes("help/rejected_window_xml.bin");
const pending_bully_request_xml_binAsset = embedBytes("help/pending_bully_request_xml.bin");
const pending_guide_session_xml_binAsset = embedBytes("help/pending_guide_session_xml.bin");
const pending_instructions_request_xml_binAsset = embedBytes("help/pending_instructions_request_xml.bin");
const pending_tour_request_xml_binAsset = embedBytes("help/pending_tour_request_xml.bin");
const chat_review_reporter_feedback_xml_binAsset = embedBytes("help/chat_review_reporter_feedback_xml.bin");
const abusive_notice_xml_binAsset = embedBytes("help/abusive_notice_xml.bin");
const bully_report_xml_binAsset = embedBytes("help/bully_report_xml.bin");
const chat_report_xml_binAsset = embedBytes("help/chat_report_xml.bin");
const chat_report_item_xml_binAsset = embedBytes("help/chat_report_item_xml.bin");
const emergency_help_request_xml_binAsset = embedBytes("help/emergency_help_request_xml.bin");
const pending_request_xml_binAsset = embedBytes("help/pending_request_xml.bin");
const habbo_way_xml_binAsset = embedBytes("help/habbo_way_xml.bin");
const habbo_way_quiz_xml_binAsset = embedBytes("help/habbo_way_quiz_xml.bin");
const safety_booklet_xml_binAsset = embedBytes("help/safety_booklet_xml.bin");
const sanction_info_xml_binAsset = embedBytes("help/sanction_info_xml.bin");
const my_reports_xml_binAsset = embedBytes("help/my_reports_xml.bin");

export class HabboHelpCom extends SimpleApplication {
    static { registerClassName(this, 'HabboHelpCom'); }

    static #staticsReady = false;

    public static manifest = HabboHelpCom_manifest_binAsset;

    public static welcome_name_change_xml = welcome_name_change_xml_binAsset;

    public static welcome_name_selection_xml = welcome_name_selection_xml_binAsset;

    public static welcome_name_suggestion_item_xml = welcome_name_suggestion_item_xml_binAsset;

    public static welcome_name_confirmation_xml = welcome_name_confirmation_xml_binAsset;

    public static welcome_screen_xml = welcome_screen_xml_binAsset;

    public static welcome_tour_popup_xml = welcome_tour_popup_xml_binAsset;

    public static topics_flow_help_xml = topics_flow_help_xml_binAsset;

    public static main_help_xml = main_help_xml_binAsset;

    public static main_xml = main_xml_binAsset;

    public static user_create_xml = user_create_xml_binAsset;

    public static user_pending_xml = user_pending_xml_binAsset;

    public static user_ongoing_xml = user_ongoing_xml_binAsset;

    public static user_feedback_xml = user_feedback_xml_binAsset;

    public static user_thanks_xml = user_thanks_xml_binAsset;

    public static user_guide_disconnected_xml = user_guide_disconnected_xml_binAsset;

    public static guide_tool_xml = guide_tool_xml_binAsset;

    public static guide_accept_xml = guide_accept_xml_binAsset;

    public static guide_ongoing_xml = guide_ongoing_xml_binAsset;

    public static guide_closed_xml = guide_closed_xml_binAsset;

    public static guardian_chat_review_accept_xml = guardian_chat_review_accept_xml_binAsset;

    public static guardian_chat_review_results_xml = guardian_chat_review_results_xml_binAsset;

    public static guardian_chat_review_vote_xml = guardian_chat_review_vote_xml_binAsset;

    public static guardian_chat_review_wait_for_results_xml = guardian_chat_review_wait_for_results_xml_binAsset;

    public static guardian_chat_review_wait_for_voters_xml = guardian_chat_review_wait_for_voters_xml_binAsset;

    public static report_window_xml = report_window_xml_binAsset;

    public static error_window_xml = error_window_xml_binAsset;

    public static chat_msg_xml = chat_msg_xml_binAsset;

    public static chat_msg_notification_xml = chat_msg_notification_xml_binAsset;

    public static chat_msg_reminder_xml = chat_msg_reminder_xml_binAsset;

    public static rejected_window_xml = rejected_window_xml_binAsset;

    public static pending_bully_request_xml = pending_bully_request_xml_binAsset;

    public static pending_guide_session_xml = pending_guide_session_xml_binAsset;

    public static pending_instructions_request_xml = pending_instructions_request_xml_binAsset;

    public static pending_tour_request_xml = pending_tour_request_xml_binAsset;

    public static chat_review_reporter_feedback_xml = chat_review_reporter_feedback_xml_binAsset;

    public static abusive_notice_xml = abusive_notice_xml_binAsset;

    public static bully_report_xml = bully_report_xml_binAsset;

    public static chat_report_xml = chat_report_xml_binAsset;

    public static chat_report_item_xml = chat_report_item_xml_binAsset;

    public static emergency_help_request_xml = emergency_help_request_xml_binAsset;

    public static pending_request_xml = pending_request_xml_binAsset;

    public static habbo_way_xml = habbo_way_xml_binAsset;

    public static habbo_way_quiz_xml = habbo_way_quiz_xml_binAsset;

    public static safety_booklet_xml = safety_booklet_xml_binAsset;

    public static sanction_info_xml = sanction_info_xml_binAsset;

    public static my_reports_xml = my_reports_xml_binAsset;

    public static get requiredClasses(): any[] {
        HabboHelpCom.#initStatics();
        return HabboHelpCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboHelpCom.#initStatics();
        HabboHelpCom.requiredClasses = value;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboHelpCom.#staticsReady) return;
        HabboHelpCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboHelpCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboHelpBootstrap, IIDHabboHelp]);
    }
}
