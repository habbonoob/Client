import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomSettingsSaveErrorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.roomsettings::RoomSettingsSaveErrorMessageParser'); }

    public static readonly _SafeStr_8012: number = 1;
    public static readonly _SafeStr_8108: number = 2;
    public static readonly _SafeStr_8701: number = 3;
    public static readonly _SafeStr_8687: number = 4;
    public static readonly _SafeStr_7700: number = 5;
    public static readonly _SafeStr_8094: number = 6;
    public static readonly _SafeStr_8776: number = 7;
    public static readonly _SafeStr_8622: number = 8;
    public static readonly _SafeStr_8487: number = 9;
    public static readonly _SafeStr_8270: number = 10;
    public static readonly _SafeStr_7842: number = 11;
    public static readonly _SafeStr_8739: number = 12;
    public static readonly _SafeStr_8227: number = 13;

    constructor() {
    }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _SafeStr_5386: string;

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    public get errorCode(): number {
        return this._errorCode;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get info(): string {
        return this._SafeStr_5386;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomId = param1.readInteger();
        this._errorCode = param1.readInteger();
        this._SafeStr_5386 = param1.readString();
        return true;
    }

    public flush(): boolean {
        return true;
    }
}
