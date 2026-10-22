import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { DailyTasksActiveListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTasksActiveListMessageParser';

export class DailyTasksActiveListMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest.dailytasks::DailyTasksActiveListMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, DailyTasksActiveListMessageParser);
    }

    public getParser(): DailyTasksActiveListMessageParser {
        return this._parser instanceof DailyTasksActiveListMessageParser ? this._parser : null;
    }
}
