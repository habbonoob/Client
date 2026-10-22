import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserClassificationMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userclassification/UserClassificationMessageParser';

export class UserClassificationMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userclassification::UserClassificationMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserClassificationMessageParser);
    }

    public getParser(): UserClassificationMessageParser {
        return this._parser instanceof UserClassificationMessageParser ? this._parser : null;
    }
}
