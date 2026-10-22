import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { ExtendedForumData } from '@/com/sulake/habbo/communication/messages/parser/groupforums/ExtendedForumData';

export class ForumDataMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.groupforums::ForumDataMessageParser'); }

    constructor() {
    }

    declare private _forumData: ExtendedForumData;

    public get forumData(): ExtendedForumData {
        return this._forumData;
    }

    public flush(): boolean {
        this._forumData = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._forumData = ExtendedForumData.readFromMessage_ExtendedForumData(param1);
        return true;
    }
}
