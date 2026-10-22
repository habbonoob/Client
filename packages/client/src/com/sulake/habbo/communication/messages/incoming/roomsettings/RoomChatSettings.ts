import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class RoomChatSettings {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::RoomChatSettings'); }

    public static readonly _SafeStr_8202: number = 0;
    public static readonly _SafeStr_8492: number = 1;
    public static readonly _SafeStr_8115: number = 0;
    public static readonly _SafeStr_8178: number = 1;
    public static readonly _SafeStr_8693: number = 2;
    public static readonly _SafeStr_7615: number = 0;
    public static readonly _SafeStr_8727: number = 1;
    public static readonly _SafeStr_8596: number = 2;
    public static readonly _SafeStr_7863: number = 0;
    public static readonly _SafeStr_8582: number = 1;
    public static readonly _SafeStr_8735: number = 2;

    constructor(param1: IMessageDataWrapper) {
        this._mode = param1.readInteger();
        this._bubbleWidth = param1.readInteger();
        this._scrollSpeed = param1.readInteger();
        this._fullHearRange = param1.readInteger();
        this._floodSensitivity = param1.readInteger();
    }

    private _bubbleWidth: number = 1;
    private _scrollSpeed: number = 1;
    private _floodSensitivity: number = 1;
    private _fullHearRange: number = 14;
    private _mode: number = 0;

    public get mode(): number {
        return this._mode;
    }

    public get bubbleWidth(): number {
        return this._bubbleWidth;
    }

    public get scrollSpeed(): number {
        return this._scrollSpeed;
    }

    public get fullHearRange(): number {
        return this._fullHearRange;
    }

    public get floodSensitivity(): number {
        return this._floodSensitivity;
    }
}
