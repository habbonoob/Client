import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ScrSendUserInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ScrSendUserInfoMessageParser';

export class ScrSendUserInfoEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::ScrSendUserInfoEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ScrSendUserInfoMessageParser);
    }

    public getParser(): ScrSendUserInfoMessageParser {
        return this._parser instanceof ScrSendUserInfoMessageParser ? this._parser : null;
    }
}
