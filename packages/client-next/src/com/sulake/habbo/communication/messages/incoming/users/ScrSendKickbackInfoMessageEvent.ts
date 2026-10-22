import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ScrSendKickbackInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ScrSendKickbackInfoMessageParser';

export class ScrSendKickbackInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::ScrSendKickbackInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ScrSendKickbackInfoMessageParser);
    }

    public getParser(): ScrSendKickbackInfoMessageParser {
        return this._parser instanceof ScrSendKickbackInfoMessageParser ? this._parser : null;
    }
}
