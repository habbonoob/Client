import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { HabboGroupDetailsData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsData';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboGroupDetailsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/HabboGroupDetailsMessageParser';

export class HabboGroupDetailsMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::HabboGroupDetailsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboGroupDetailsMessageParser);
    }

    public get data(): HabboGroupDetailsData {
        return castTo(this._parser, HabboGroupDetailsMessageParser).data;
    }
}
