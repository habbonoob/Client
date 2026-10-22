import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboWebApiError {
    static { registerClassName(this, 'com.sulake.habbo.communication::HabboWebApiError'); }

    public static readonly INVALID_CAPTCHA: string = "invalid-captcha";
    public static readonly ACCOUNT_ISSUE: string = "account_issue";
    public static readonly _SafeStr_7935: string = "login.blocked";
    public static readonly _SafeStr_8382: string = "login.user_banned";
    public static readonly _SafeStr_8246: string = "unauthorized-staff-login";
    public static readonly _SafeStr_8606: string = "pocket.auth.login_failed";
    public static readonly LOGIN_NO_AVATARS: string = "pocket.auth.no_avatars";
    public static readonly _SafeStr_7954: string = "pocket.auth.valid_email_required";
    public static readonly _SafeStr_8546: string = "pocket.auth.password_required";
    public static readonly _SafeStr_8358: string = "pocket.auth.facebook_disabled";
    public static readonly _SafeStr_8690: string = "pocket.auth.facebook_not_connected";
    public static readonly _SafeStr_7973: string = "pocket.auth.access_token_required";
    public static readonly REGISTRATION_CAPTCHA_EMPTY: string = "registration.captcha_is_empty";
    public static readonly REGISTRATION_CAPTCHA_INVALID: string = "registration.invalid_captcha";
    public static readonly REGISTRATION_DISABLED: string = "registration.error.registration_disabled";
    public static readonly REGISTRATION_PASSWORD: string = "registration_password";
    public static readonly REGISTRATION_BIRTHDAY_FORMAT: string = "registration.birthdate_format";
    public static readonly REGISTRATION_INVALID_BIRTHDAY: string = "registration.invalid_birthdate";
    public static readonly REGISTRATION_INVALID_PASSWORD: string = "registration.invalid_password";
    public static readonly REGISTRATION_INVALID_EMAIL: string = "registration.invalid_email";
    public static readonly REGISTRATION_AGE_LIMIT: string = "registration.age_limit";
    public static readonly REGISTRATION_EMAIL: string = "registration_email";
    public static readonly REGISTRATION_EMAIL_IN_USE: string = "registration_email_in_use";
    public static readonly REGISTRATION_EMAIL_UNAUTHORIZED: string = "registration_email_unauthorized";
    public static readonly REGISTRATION_PARENT_EMAIL: string = "registration_parent_email";
    public static readonly REGISTRATION_ERROR_SPAM: string = "registration_error.spam";
    public static readonly REGISTRATION_ERROR_AGE_BAN: string = "registration.error.age_ban";
    public static readonly REGISTRATION_ERROR_IDENTITY_CREATION_FAILED: string = "registration.error.identity_creation_failed";

    constructor() {
    }
}
