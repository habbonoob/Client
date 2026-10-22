import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { DailyTaskInfo } from '@/com/sulake/habbo/communication/messages/parser/quest/dailytasks/DailyTaskInfo';

export class DailyTasksTasksAddedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest.dailytasks::DailyTasksTasksAddedMessageParser'); }

    declare private _tasks: DailyTaskInfo[];

    constructor() {
    }

    public flush(): boolean {
        this._tasks = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._tasks = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._tasks.push(new DailyTaskInfo(param1));
            _loc3_++;
        }
        return true;
    }

    public get tasks(): DailyTaskInfo[] {
        return this._tasks;
    }
}
