import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';

export class QuestMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest::QuestMessageParser'); }

    declare private _quest: QuestMessageData;

    constructor() {
    }

    public flush(): boolean {
        this._quest = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._quest = new QuestMessageData(param1);
        return true;
    }

    public get quest(): QuestMessageData {
        return this._quest;
    }
}
