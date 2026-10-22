import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomChatSettings {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::RoomChatSettings'); }

    public static readonly _SafeStr_8202: number = 0;
    public static readonly _SafeStr_8492: number = 1;
    public static readonly _SafeStr_8115: number = 0;
    public static readonly _SafeStr_8178: number = 1;
    public static readonly _SafeStr_8693: number = 2;
    public static readonly _SafeStr_14136: number = -1;
    public static readonly _SafeStr_7615: number = 0;
    public static readonly _SafeStr_8727: number = 1;
    public static readonly _SafeStr_8596: number = 2;
    public static readonly _SafeStr_7863: number = 0;
    public static readonly _SafeStr_8582: number = 1;
    public static readonly _SafeStr_8735: number = 2;
    private _mode: number = 0;
    private _bubbleWidth: number = 1;
    private _scrollSpeed: number = 1;
    private _SafeStr_14137: number = 1;

    constructor(param1: number = 0, param2: number = 1, param3: number = 1, param4: number = 1) {
        this._mode = param1;
        this._bubbleWidth = param2;
        this._scrollSpeed = param3;
        this._SafeStr_14137 = param4;
    }

    public static fromFloodSensitivity(param1: number): RoomChatSettings {
        return new RoomChatSettings(0, 1, 1, param1);
    }

    public get mode(): number {
        return this._mode;
    }

    public get bubbleWidth(): number {
        return this._bubbleWidth;
    }

    public get scrollSpeed(): number {
        return this._scrollSpeed;
    }

    public get floodSensitivity(): number {
        return this._SafeStr_14137;
    }
}
