import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class SpecialSystemChatMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.chat::SpecialSystemChatMessageParser'); }

    private _userIndex: number = 0;
    private _SafeStr_14066: number = 0;

    constructor() {
    }

    public get userIndex(): number {
        return this._userIndex;
    }

    public get specialSystemType(): number {
        return this._SafeStr_14066;
    }

    public flush(): boolean {
        this._userIndex = 0;
        this._SafeStr_14066 = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._userIndex = param1.readInteger();
        this._SafeStr_14066 = param1.readInteger();
        return true;
    }
}
