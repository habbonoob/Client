import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { DailyTasksTasksAddedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTasksTasksAddedMessageParser';

export class DailyTasksTasksAddedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest.dailytasks::DailyTasksTasksAddedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, DailyTasksTasksAddedMessageParser);
    }

    public getParser(): DailyTasksTasksAddedMessageParser {
        return this._parser instanceof DailyTasksTasksAddedMessageParser ? this._parser : null;
    }
}
