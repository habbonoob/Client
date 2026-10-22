import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomSettingsSavedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.roomsettings::RoomSettingsSavedMessageParser'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomId = param1.readInteger();
        return true;
    }

    public flush(): boolean {
        this._roomId = 0;
        return true;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
