import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HandItemReceivedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/HandItemReceivedMessageParser';

export class HandItemReceivedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::HandItemReceivedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HandItemReceivedMessageParser);
    }

    public get giverUserId(): number {
        return castTo(this._parser, HandItemReceivedMessageParser).giverUserId;
    }

    public get handItemType(): number {
        return castTo(this._parser, HandItemReceivedMessageParser).handItemType;
    }
}
