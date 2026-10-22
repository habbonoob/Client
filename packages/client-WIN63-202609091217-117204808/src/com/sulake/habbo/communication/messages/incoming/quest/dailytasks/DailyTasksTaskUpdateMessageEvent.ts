import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { DailyTasksTaskUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTasksTaskUpdateMessageParser';

export class DailyTasksTaskUpdateMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest.dailytasks::DailyTasksTaskUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, DailyTasksTaskUpdateMessageParser);
    }

    public getParser(): DailyTasksTaskUpdateMessageParser {
        return this._parser instanceof DailyTasksTaskUpdateMessageParser ? this._parser : null;
    }
}
