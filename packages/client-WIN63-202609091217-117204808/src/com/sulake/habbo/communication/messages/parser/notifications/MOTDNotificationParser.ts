import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class MOTDNotificationParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.notifications::MOTDNotificationParser'); }

    declare private _messages: any[];

    constructor() {
    }

    public flush(): boolean {
        this._messages = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._messages.push(param1.readString());
            _loc3_++;
        }
        return true;
    }

    public get messages(): any[] {
        return this._messages;
    }
}
