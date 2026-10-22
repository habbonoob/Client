import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';

export class QuestCompletedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.quest::QuestCompletedMessageParser'); }

    constructor() {
    }

    declare private _questData: QuestMessageData;

    declare private _showDialog: boolean;
    static { (this.prototype as any)._showDialog = false; }

    public get questData(): QuestMessageData {
        return this._questData;
    }

    public get showDialog(): boolean {
        return this._showDialog;
    }

    public flush(): boolean {
        this._questData = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._questData = new QuestMessageData(param1);
        this._showDialog = param1.readBoolean();
        return true;
    }
}
