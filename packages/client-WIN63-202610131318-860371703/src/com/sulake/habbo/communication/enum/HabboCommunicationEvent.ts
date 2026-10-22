import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboCommunicationEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum::HabboCommunicationEvent'); }

    public static readonly INIT: string = "HABBO_CONNECTION_EVENT_INIT";
    public static readonly ESTABLISHED: string = "HABBO_CONNECTION_EVENT_ESTABLISHED";
    public static readonly HANDSHAKING: string = "HABBO_CONNECTION_EVENT_HANDSHAKING";
    public static readonly _SafeStr_7535: string = "HABBO_CONNECTION_EVENT_HANDSHAKED";
    public static readonly _SafeStr_7493: string = "HABBO_CONNECTION_EVENT_HANDSHAKE_FAIL";
    public static readonly AUTHENTICATED: string = "HABBO_CONNECTION_EVENT_AUTHENTICATED";
    public static readonly REGISTER: string = "HABBO_CONNECTION_EVENT_REGISTER";
    public static readonly _SafeStr_7708: string = "HABBO_POCKET_SESSION_CREATED";

    constructor() {
    }
}
