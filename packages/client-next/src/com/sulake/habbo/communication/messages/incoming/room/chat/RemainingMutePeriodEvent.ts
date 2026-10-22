import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RemainingMutePeriodParser } from '@/com/sulake/habbo/communication/messages/parser/room/chat/RemainingMutePeriodParser';

export class RemainingMutePeriodEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.chat::RemainingMutePeriodEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RemainingMutePeriodParser);
    }

    public get secondsRemaining(): number {
        return castTo(this._parser, RemainingMutePeriodParser).secondsRemaining;
    }
}
