import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboProperty {
    static { registerClassName(this, 'com.sulake.habbo.configuration.enum::HabboProperty'); }

    public static readonly ENVIRONMENT_ID: string = "environment.id";
    public static readonly SSO_TOKEN: string = "sso.token";
    public static readonly USE_SSO: string = "use.sso";
    public static readonly CONNECTION_INFO_HOST: string = "connection.info.host";
    public static readonly CONNECTION_INFO_PORT: string = "connection.info.port";
    public static readonly URL_PREFIX: string = "url.prefix";
    public static readonly SITE_URL: string = "site.url";
    public static readonly CLIENT_URL: string = "flash.client.url";
    public static readonly CLIENT_ORIGIN: string = "flash.client.origin";
    public static readonly EXTERNAL_VARIABLES: string = "external.variables.txt";
    public static readonly CLIENT_STARTING: string = "client.starting";
    public static readonly CLIENT_STARTING_LOADING: string = "client.starting.revolving";
    public static readonly PROCESSLOG_ENABLED_KEY: string = "processlog.enabled";
    public static readonly NEW_USER_FLOW_ENABLED: string = "new.user.flow.enabled";
    public static readonly NEW_USER_ONBOARDING_HC_FLOW_ENABLED: string = "new.user.onboarding.hc.flow.enabled";
    public static readonly NEW_USER_ONBOARDING_SHOW_HC_ITEMS: string = "new.user.onboarding.show.hc.items";
    public static readonly NEW_USER_ONBOARDING_PAGE_TO_SHOW: string = "new.user.flow.page";
    public static readonly DYNAMIC_DOWNLOAD_URL: string = "flash.dynamic.download.url";
    public static readonly DYNAMIC_DOWNLOAD_TEMPLATE: string = "flash.dynamic.download.name.template";
    public static readonly DYNAMIC_DOWNLOAD_SAMPLES_TEMPLATE: string = "flash.dynamic.avatar.download.configuration";
    public static readonly DYNAMIC_AVATAR_DOWNLOAD_URL: string = "flash.dynamic.avatar.download.url";
    public static readonly POCKET_API: string = "pocket.api";
    public static readonly WEB_API: string = "web.api";
    public static readonly FACEBOOK_APPLICATION_ID: string = "facebook.application.id";
    public static readonly TERMS_OF_SERVICE_LINK: string = "web.terms_of_service.link";
    public static readonly DISABLE_CRYPTO: string = "disable.crypto";
    public static readonly LIVE_ENVIRONMENTS: string = "live.environment.list";
    public static readonly LOGOUT_URL: string = "logout.url";
    public static readonly LOGOUT_DISCONNECT_URL: string = "logout.disconnect.url";
    public static readonly CRASH_ON_CRIT_ERROR: string = "error_handling.crash_on_critical_error";
    public static readonly SHOW_ERROR_WARNING: string = "error_handling.show_error";
    public static readonly SHOW_ERROR_WARNING_INCLUDE_NONCRITICAL: string = "error_handling.show_error.include_non_critical";
    public static readonly SHOW_ERROR_STACKTRACE: string = "error_handling.show_stacktrace";
    public static readonly EXCLUDE_CRASHING_FOR_CATEGORIES: string = "error_handling.exclude_crashing";
    public static readonly EXCLUDE_WARNINGS_FOR_CATEGORIES: string = "error_handling.exclude_warnings";

    constructor() {
    }
}
