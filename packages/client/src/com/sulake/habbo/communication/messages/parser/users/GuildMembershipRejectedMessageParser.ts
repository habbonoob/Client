import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuildMembershipRejectedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::GuildMembershipRejectedMessageParser'); }

    constructor() {
    }

    declare private _guildId: number;
    static { (this.prototype as any)._guildId = 0; }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    public get guildId(): number {
        return this._guildId;
    }

    public get userId(): number {
        return this._userId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._guildId = param1.readInteger();
        this._userId = param1.readInteger();
        return true;
    }
}
