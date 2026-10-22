import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboGroupDeactivatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/HabboGroupDeactivatedMessageParser';

export class HabboGroupDeactivatedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::HabboGroupDeactivatedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboGroupDeactivatedMessageParser);
    }

    public get groupId(): number {
        return castTo(this._parser, HabboGroupDeactivatedMessageParser).groupId;
    }
}
