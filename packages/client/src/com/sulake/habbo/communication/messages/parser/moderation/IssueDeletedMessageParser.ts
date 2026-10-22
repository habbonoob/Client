import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IssueDeletedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.moderation::IssueDeletedMessageParser'); }

    constructor() {
    }

    declare private _issueId: number;
    static { (this.prototype as any)._issueId = 0; }

    public get issueId(): number {
        return this._issueId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._issueId = parseInt(param1.readString()) | 0;
        return true;
    }
}
