import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { HabboGroupBadgesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/HabboGroupBadgesMessageParser';

export class HabboGroupBadgesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::HabboGroupBadgesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, HabboGroupBadgesMessageParser);
    }

    public get badges(): UtilsMap {
        return (this._parser instanceof HabboGroupBadgesMessageParser ? this._parser : null).badges;
    }
}
