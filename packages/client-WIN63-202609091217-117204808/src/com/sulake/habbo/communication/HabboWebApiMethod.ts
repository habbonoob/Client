import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboWebApiMethod {
    static { registerClassName(this, 'com.sulake.habbo.communication::HabboWebApiMethod'); }

    public static readonly FORCE_EMAIL_CHANGE: string = "/api/force/email-change";
    public static readonly FORCE_PASSWORD_CHANGE: string = "/api/force/password-change";
    public static readonly FORCE_TOS_ACCEPT: string = "/api/force/tos-accept";
    public static readonly _SafeStr_7964: string = "/api/public/authentication/facebook";
    public static readonly _SafeStr_8479: string = "/api/public/authentication/rpx";
    public static readonly SAVE_USER: string = "/api/user/preferences/save";
    public static readonly AUTHENTICATE_USER: string = "/api/public/authentication/user";
    public static readonly SAVE_VISIBILITY: string = "/api/user/preferences/save/visibility";
    public static readonly CHANGE_PASSWORD: string = "/api/public/forgotPassword/changePassword";
    public static readonly CAMPAIGN_MESSAGES: string = "/api/user/campaign_messages";
    public static readonly GROUPS: string = "/api/public/groups/:id";
    public static readonly SELECT_AVATAR: string = "/api/user/avatars/select";
    public static readonly CAMPAIGN_MESSAGES_ALL: string = "/api/user/campaign_messages/all";
    public static readonly MEMBERS: string = "/api/public/groups/:id/members";
    public static readonly ACTIVATE: string = "/api/public/registration/activate";
    public static readonly CAMPAIGN_MESSAGES_SEEN: string = "/api/user/campaign_messages/seen";
    public static readonly POPULAR_ROOMS: string = "/api/public/rooms/popular";
    public static readonly _SafeStr_8705: string = "/api/user/discussions";
    public static readonly PROFILE: string = "/api/user/profile";
    public static readonly CREDIT_BALANCE: string = "/api/user/credit_balance";
    public static readonly _SafeStr_7522: string = "/api/public/lists/hotlooks";
    public static readonly ROOM: string = "/api/public/rooms/:roomId";
    public static readonly AVATARS: string = "/api/user/avatars";
    public static readonly FRIEND_REQUESTS_SENT: string = "/api/user/friendrequests/sent";
    public static readonly LOG_CRASH: string = "/api/log/crash";
    public static readonly FRIEND_REQUESTS_RECEIVED: string = "/api/user/friendrequests/received";
    public static readonly _SafeStr_8263: string = "/api/log/loginstep";
    public static readonly SAVE_LOOKS: string = "/api/user/look/save";
    public static readonly CLIENT_URL: string = "/api/client/clienturl";
    public static readonly _SafeStr_8503: string = "/api/public/info/hello";
    public static readonly CHANGE_EMAIL: string = "/api/user/email/change";
    public static readonly NAME_CHECK: string = "/api/newuser/name/check";
    public static readonly _SafeStr_8264: string = "/api/log/error";
    public static readonly CREATE_AVATAR: string = "/api/user/avatars";
    public static readonly SELECT_USER: string = "/api/newuser/name/select";
    public static readonly SSO_TOKEN: string = "/api/ssotoken";
    public static readonly SELECT_ROOM: string = "/api/newuser/room/select";
    public static readonly SAFETY_LOCK_STATUS: string = "/api/safetylock/featureStatus";
    public static readonly LOGIN: string = "/api/public/authentication/login";
    public static readonly SAFETY_LOCK_DISABLE: string = "/api/safetylock/disable";
    public static readonly REGISTER: string = "/api/public/registration/new";
    public static readonly SAFETY_LOCK_SAVE: string = "/api/safetylock/save";
    public static readonly RESET_TRUSTED_LOGINS: string = "/api/safetylock/resetTrustedLogins";
    public static readonly SAFETY_LOCK_QUESTIONS: string = "/api/safetylock/questions";
    public static readonly _SafeStr_7513: string = "/api/public/authentication/logout";
    public static readonly FORGOT_PASSWORD: string = "/api/public/forgotPassword/send";
    public static readonly SAFETY_LOCK_UNLOCK: string = "/api/safetylock/unlock";
    public static readonly PREFERENCES: string = "/api/user/preferences";
    public static readonly COMMON_FRIENDS: string = "/api/user/:id/common_friends";
    public static readonly PING: string = "/api/user/ping";
    public static readonly _SafeStr_7526: string = "/api/user/self";
    public static readonly IAP_VALIDATE_ITUNES_RECEIPT: string = "/shopapi/iap/itunes/validate";
    public static readonly IAP_VALIDATE_PLAYSTORE_RECEIPT: string = "/shopapi/iap/playstore/validate";
    public static readonly _SafeStr_8580: string = "/api/pushwoosh/devicetoken";

    constructor() {
    }
}
