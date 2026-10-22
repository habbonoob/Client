import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomSettingsErrorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.roomsettings::RoomSettingsErrorMessageParser'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomId = param1.readInteger();
        this._errorCode = param1.readInteger();
        return true;
    }

    public flush(): boolean {
        this._roomId = 0;
        this._errorCode = 0;
        return true;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get errorCode(): number {
        return this._errorCode;
    }
}
