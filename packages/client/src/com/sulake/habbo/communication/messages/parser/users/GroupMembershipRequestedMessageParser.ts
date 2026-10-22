import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { MemberData } from '@/com/sulake/habbo/communication/messages/incoming/users/MemberData';

export class GroupMembershipRequestedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::GroupMembershipRequestedMessageParser'); }

    constructor() {
    }

    declare private _requester: MemberData;

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    public get groupId(): number {
        return this._groupId;
    }

    public get requester(): MemberData {
        return this._requester;
    }

    public flush(): boolean {
        this._requester = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._groupId = param1.readInteger();
        this._requester = new MemberData(param1);
        return true;
    }
}
