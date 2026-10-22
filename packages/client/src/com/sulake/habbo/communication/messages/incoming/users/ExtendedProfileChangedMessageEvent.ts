import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ExtendedProfileChangedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ExtendedProfileChangedMessageParser';

export class ExtendedProfileChangedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::ExtendedProfileChangedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ExtendedProfileChangedMessageParser);
    }

    public get userId(): number {
        return castTo(this._parser, ExtendedProfileChangedMessageParser).userId;
    }
}
