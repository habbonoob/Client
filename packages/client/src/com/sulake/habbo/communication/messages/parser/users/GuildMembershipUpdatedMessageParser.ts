import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { MemberData } from '@/com/sulake/habbo/communication/messages/incoming/users/MemberData';

export class GuildMembershipUpdatedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::GuildMembershipUpdatedMessageParser'); }

    constructor() {
    }

    declare private _guildId: number;
    static { (this.prototype as any)._guildId = 0; }

    declare private _data: MemberData;

    public get guildId(): number {
        return this._guildId;
    }

    public get data(): MemberData {
        return this._data;
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._guildId = param1.readInteger();
        this._data = new MemberData(param1);
        return true;
    }
}
