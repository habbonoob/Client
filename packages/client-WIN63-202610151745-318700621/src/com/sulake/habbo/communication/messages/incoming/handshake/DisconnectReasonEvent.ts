import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { registerTypeDescriptions } from '@habbo-pixi/runtime/utils/describeType';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { describeType, type TypeDescription } from '@habbo-pixi/runtime/utils/describeType';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { DisconnectReasonParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/DisconnectReasonParser';

export class DisconnectReasonEvent extends MessageEvent implements IMessageEvent {
    static {
        registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::DisconnectReasonEvent');
        registerTypeDescriptions({"com.sulake.habbo.communication.messages.incoming.handshake::DisconnectReasonEvent":{"ext":"com.sulake.core.communication.messages::MessageEvent","impls":["com.sulake.core.communication.messages::IMessageEvent"],"statics":[["c","_SafeStr_8614","int"],["c","_SafeStr_8461","int"],["c","_SafeStr_8129","int"],["c","_SafeStr_7513","int"],["c","_SafeStr_8154","int"],["c","_SafeStr_8524","int"],["c","_SafeStr_8077","int"],["c","_SafeStr_7805","int"],["c","_SafeStr_7635","int"],["c","_SafeStr_8042","int"],["c","_SafeStr_8704","int"],["c","_SafeStr_8106","int"],["c","_SafeStr_7885","int"],["c","_SafeStr_8119","int"],["c","_SafeStr_8268","int"],["c","_SafeStr_8528","int"],["c","_SafeStr_8075","int"],["c","_SafeStr_8653","int"],["c","_SafeStr_8250","int"],["c","_SafeStr_7728","int"],["c","_SafeStr_7637","int"],["c","_SafeStr_7663","int"],["c","_SafeStr_8147","int"],["c","_SafeStr_8644","int"],["c","_SafeStr_8372","int"],["c","_SafeStr_8545","int"],["c","_SafeStr_8082","int"],["c","_SafeStr_8423","int"],["c","_SafeStr_7860","int"],["c","_SafeStr_7922","int"],["c","_SafeStr_8413","int"],["c","_SafeStr_8511","int"],["c","_SafeStr_8608","int"],["c","_SafeStr_7984","int"],["c","_SafeStr_8556","int"],["c","_SafeStr_8773","int"],["c","_SafeStr_7843","int"],["c","_SafeStr_7784","int"],["c","_SafeStr_7649","int"],["c","_SafeStr_8647","int"],["c","_SafeStr_7677","int"],["c","_SafeStr_7990","int"],["c","_SafeStr_7581","int"],["c","SOCKET_WRITE_EXCEPTION_1","int"],["c","SOCKET_WRITE_EXCEPTION_2","int"],["c","SOCKET_WRITE_EXCEPTION_3","int"],["c","_SafeStr_8123","int"],["c","_SafeStr_7967","int"],["c","_SafeStr_8211","int"],["c","_SafeStr_7774","int"],["c","_SafeStr_8636","int"],["c","_SafeStr_8412","int"],["c","_SafeStr_8060","int"],["m","resolveDisconnectedReasonLocalizationKey","String",[],[["int",false]]]],"instance":[["r","reason","int"],["r","reasonString","String"],["m","getReasonName","String",[],[]]]}});
    }

    public static readonly _SafeStr_8614: number = -1;
    public static readonly _SafeStr_8461: number = -2;
    public static readonly _SafeStr_8129: number = -3;
    public static readonly _SafeStr_7513: number = 0;
    public static readonly _SafeStr_8154: number = 1;
    public static readonly _SafeStr_8524: number = 2;
    public static readonly _SafeStr_8077: number = 3;
    public static readonly _SafeStr_7805: number = 4;
    public static readonly _SafeStr_7635: number = 5;
    public static readonly _SafeStr_8042: number = 10;
    public static readonly _SafeStr_8704: number = 11;
    public static readonly _SafeStr_8106: number = 12;
    public static readonly _SafeStr_7885: number = 13;
    public static readonly _SafeStr_8119: number = 16;
    public static readonly _SafeStr_8268: number = 17;
    public static readonly _SafeStr_8528: number = 18;
    public static readonly _SafeStr_8075: number = 19;
    public static readonly _SafeStr_8653: number = 20;
    public static readonly _SafeStr_8250: number = 22;
    public static readonly _SafeStr_7728: number = 23;
    public static readonly _SafeStr_7637: number = 24;
    public static readonly _SafeStr_7663: number = 25;
    public static readonly _SafeStr_8147: number = 26;
    public static readonly _SafeStr_8644: number = 27;
    public static readonly _SafeStr_8372: number = 28;
    public static readonly _SafeStr_8545: number = 29;
    public static readonly _SafeStr_8082: number = 100;
    public static readonly _SafeStr_8423: number = 101;
    public static readonly _SafeStr_7860: number = 102;
    public static readonly _SafeStr_7922: number = 103;
    public static readonly _SafeStr_8413: number = 104;
    public static readonly _SafeStr_8511: number = 105;
    public static readonly _SafeStr_8608: number = 106;
    public static readonly _SafeStr_7984: number = 107;
    public static readonly _SafeStr_8556: number = 108;
    public static readonly _SafeStr_8773: number = 109;
    public static readonly _SafeStr_7843: number = 110;
    public static readonly _SafeStr_7784: number = 111;
    public static readonly _SafeStr_7649: number = 112;
    public static readonly _SafeStr_8647: number = 113;
    public static readonly _SafeStr_7677: number = 114;
    public static readonly _SafeStr_7990: number = 115;
    public static readonly _SafeStr_7581: number = 116;
    public static readonly SOCKET_WRITE_EXCEPTION_1: number = 117;
    public static readonly SOCKET_WRITE_EXCEPTION_2: number = 118;
    public static readonly SOCKET_WRITE_EXCEPTION_3: number = 119;
    public static readonly _SafeStr_8123: number = 120;
    public static readonly _SafeStr_7967: number = 121;
    public static readonly _SafeStr_8211: number = 122;
    public static readonly _SafeStr_7774: number = 123;
    public static readonly _SafeStr_8636: number = 124;
    public static readonly _SafeStr_8412: number = 125;
    public static readonly _SafeStr_8060: number = 126;
    private static _SafeStr_4824: Map<any, any>;

    constructor(param1: (...args: any[]) => any) {
        super(param1, DisconnectReasonParser);
    }

    public static resolveDisconnectedReasonLocalizationKey(param1: number): string {
        switch (param1) {
            case -2:
                return "${disconnected.maintenance}";
            case 0:
                return "${disconnected.logged_out}";
            case 1:
                return "${disconnected.just_banned}";
            case 10:
                return "${disconnected.still_banned}";
            case 2:
            case 13:
            case 11:
            case 18:
                return "${disconnected.concurrent_login}";
            case 12:
            case 19:
                return "${disconnected.hotel_closed}";
            case 20:
                return "${disconnected.incorrect_password}";
            case 112:
                return "${disconnected.idle}";
            case 122:
                return "${disconnected.incompatible_client_version}";
            case 4:
            case 5:
            case 16:
            case 17:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 123:
            case 124:
            case 125:
            case 126:
                break;
            default:
                return "${disconnected.generic}";
        }
        return "${disconnected.generic}";
    }

    public get reason(): number {
        return (this._parser instanceof DisconnectReasonParser ? this._parser : null).reason;
    }

    public get reasonString(): string {
        switch (this.reason) {
            case 1:
            case 10:
                break;
            case 2:
                return "concurrentlogin";
            case 20:
                return "incorrectpassword";
            default:
                return "logout";
        }
        return "banned";
    }

    public getReasonName(): string {
        let _loc2_: TypeDescription = null;
        let _loc3_: string = null;
        let _loc4_: string = null;
        if (DisconnectReasonEvent._SafeStr_4824 == null) {
            DisconnectReasonEvent._SafeStr_4824 = new Dictionary();
            _loc2_ = describeType(DisconnectReasonEvent);
            for (const _loc1_ of _loc2_.constants) {
                _loc3_ = _loc1_.name;
                _loc4_ = stringOrNull((DisconnectReasonEvent as unknown as Record<string, unknown>)[_loc1_.name]);
                DisconnectReasonEvent._SafeStr_4824.set(_loc4_, _loc3_);
            }
        }
        // the keys are the constants' string forms (AS3 treats dictionary keys 1 and "1" as one)
        let name: string = stringOrNull(DisconnectReasonEvent._SafeStr_4824.get(String(this.reason)));
        // a placeholder stands for the obfuscator's own short name, which disconnected() does not show (it shows the reason's text)
        return name != null && /^_Safe(Str|Cls|Pkg)_\d+$/.test(name) ? null : name;
    }
}
