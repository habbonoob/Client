import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class QuestCompletedEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.quest.events::QuestCompletedEvent'); }

    public static readonly QUEST_SEASONAL: string = "qce_seasonal";

    declare private _questData: QuestMessageData;

    constructor(param1: string, param2: QuestMessageData, param3: boolean = false, param4: boolean = false) {
        super(param1, param3, param4);
        this._questData = param2;
    }

    public get questData(): QuestMessageData {
        return this._questData;
    }
}
