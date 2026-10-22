import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';

export class QuestsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest::QuestsMessageParser'); }

    declare private _quests: any[];

    declare private _openWindow: boolean;
    static { (this.prototype as any)._openWindow = false; }

    constructor() {
    }

    public flush(): boolean {
        this._quests = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._quests.push(new QuestMessageData(param1));
            _loc3_++;
        }
        this._openWindow = param1.readBoolean();
        return true;
    }

    public get quests(): any[] {
        return this._quests;
    }

    public get openWindow(): boolean {
        return this._openWindow;
    }
}
