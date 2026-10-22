import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboLoginTrackingStep {
    static { registerClassName(this, 'com.sulake.habbo.tracking::HabboLoginTrackingStep'); }

    public static readonly CONNECTION_INIT: string = "client.init.socket.init";
    public static readonly CONNECTION_ESTABLISHED: string = "client.init.socket.ok";
    public static readonly HANDSHAKING: string = "client.init.handshake.start";
    public static readonly _SafeStr_7535: string = "client.init.handshake.ok";
    public static readonly _SafeStr_7493: string = "client.init.handshake.fail";
    public static readonly AUTHENTICATED: string = "client.init.auth.ok";
    public static readonly ROOM_ENTER: string = "client.init.room.enter";
    public static readonly HOTELVIEW_LOAD_START: string = "client.init.hotelview.start";
    public static readonly HOTELVIEW_LOAD_OK: string = "client.init.hotelview.ok";
    public static readonly HOTELVIEW_LOAD_FAILED: string = "client.init.hotelview.fail";

    constructor() {
    }
}
