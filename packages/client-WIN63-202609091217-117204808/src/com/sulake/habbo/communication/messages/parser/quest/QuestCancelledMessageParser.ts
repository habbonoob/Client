import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';

export class QuestCancelledMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest::QuestCancelledMessageParser'); }

    declare private _expired: boolean;
    static { (this.prototype as any)._expired = false; }

    declare private _quest: QuestMessageData;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._expired = param1.readBoolean();
        this._quest = new QuestMessageData(param1);
        return true;
    }

    public get expired(): boolean {
        return this._expired;
    }

    public get quest(): QuestMessageData {
        return this._quest;
    }
}
