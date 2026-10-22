import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';

export class QuestDailyMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest::QuestDailyMessageParser'); }

    constructor() {
    }

    declare private _quest: QuestMessageData;

    declare private _easyQuestCount: number;
    static { (this.prototype as any)._easyQuestCount = 0; }

    declare private _hardQuestCount: number;
    static { (this.prototype as any)._hardQuestCount = 0; }

    public get quest(): QuestMessageData {
        return this._quest;
    }

    public get easyQuestCount(): number {
        return this._easyQuestCount;
    }

    public get hardQuestCount(): number {
        return this._hardQuestCount;
    }

    public flush(): boolean {
        this._quest = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: boolean = param1.readBoolean();
        if (_loc2_) {
            this._quest = new QuestMessageData(param1);
            this._easyQuestCount = param1.readInteger();
            this._hardQuestCount = param1.readInteger();
        }
        return true;
    }
}
