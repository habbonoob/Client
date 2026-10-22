import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class LoginStep {
    static { registerClassName(this, 'LoginStep'); }

    public static readonly GZIP_ENVIRONMENT: string = "client.gzip.environment";
    public static readonly CLIENT_START: string = "client.init.start";
    public static readonly SWF_ERROR: string = "client.init.swf.error";
    public static readonly SWF_LOADED: string = "client.init.swf.loaded";
    public static readonly CORE_INIT: string = "client.init.core.init";
    public static readonly LOCALIZATION_LOADED: string = "client.init.localization.loaded";
    public static readonly CONFIG_LOADED: string = "client.init.config.loaded";
    public static readonly CORE_RUNNING: string = "client.init.core.running";
    public static readonly ROOM_ENGINE_READY: string = "client.init.room.ready";
    public static readonly CORE_ERROR: string = "client.init.core.fail";
}
