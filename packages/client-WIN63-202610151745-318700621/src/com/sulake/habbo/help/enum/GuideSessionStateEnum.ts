import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class GuideSessionStateEnum {
    static { registerClassName(this, 'com.sulake.habbo.help.enum::GuideSessionStateEnum'); }

    public static readonly CLOSED: string = "";
    public static readonly ERROR: string = "error_window";
    public static readonly REJECTED: string = "rejected_window";
    public static readonly USER_CREATE: string = "user_create";
    public static readonly USER_PENDING: string = "user_pending";
    public static readonly USER_ONGOING: string = "user_ongoing";
    public static readonly USER_FEEDBACK: string = "user_feedback";
    public static readonly USER_THANKS: string = "user_thanks";
    public static readonly USER_GUIDE_DISCONNECTED: string = "user_guide_disconnected";
    public static readonly GUIDE_TOOL: string = "guide_tool";
    public static readonly GUIDE_ACCEPT: string = "guide_accept";
    public static readonly GUIDE_ONGOING: string = "guide_ongoing";
    public static readonly GUIDE_CLOSED: string = "guide_closed";
    public static readonly GUARDIAN_CHAT_REVIEW_ACCEPT: string = "guardian_chat_review_accept";
    public static readonly GUARDIAN_CHAT_REVIEW_WAIT_FOR_VOTERS: string = "guardian_chat_review_wait_for_voters";
    public static readonly GUARDIAN_CHAT_REVIEW_VOTE: string = "guardian_chat_review_vote";
    public static readonly GUARDIAN_CHAT_REVIEW_WAIT_FOR_RESULTS: string = "guardian_chat_review_wait_for_results";
    public static readonly GUARDIAN_CHAT_REVIEW_RESULTS: string = "guardian_chat_review_results";

    constructor() {
    }
}
