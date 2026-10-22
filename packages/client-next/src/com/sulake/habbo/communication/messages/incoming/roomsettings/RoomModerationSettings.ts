import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class RoomModerationSettings {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::RoomModerationSettings'); }

    public static readonly _SafeStr_8017: number = 0;
    public static readonly _SafeStr_8469: number = 1;
    public static readonly _SafeStr_8539: number = 2;
    public static readonly _SafeStr_8240: number = 4;
    public static readonly _SafeStr_8350: number = 5;

    declare private _whoCanMute: number;
    static { (this.prototype as any)._whoCanMute = 0; }

    declare private _whoCanKick: number;
    static { (this.prototype as any)._whoCanKick = 0; }

    declare private _whoCanBan: number;
    static { (this.prototype as any)._whoCanBan = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._whoCanMute = param1.readInteger();
        this._whoCanKick = param1.readInteger();
        this._whoCanBan = param1.readInteger();
    }

    public get whoCanMute(): number {
        return this._whoCanMute;
    }

    public get whoCanKick(): number {
        return this._whoCanKick;
    }

    public get whoCanBan(): number {
        return this._whoCanBan;
    }
}
