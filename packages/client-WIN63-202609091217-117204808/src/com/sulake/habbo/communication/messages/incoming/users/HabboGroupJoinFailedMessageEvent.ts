import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboGroupJoinFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/HabboGroupJoinFailedMessageParser';

export class HabboGroupJoinFailedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::HabboGroupJoinFailedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboGroupJoinFailedMessageParser);
    }

    public get reason(): number {
        return castTo(this._parser, HabboGroupJoinFailedMessageParser).reason;
    }
}
