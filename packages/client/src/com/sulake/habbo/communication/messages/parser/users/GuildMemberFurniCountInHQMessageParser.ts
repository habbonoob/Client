import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuildMemberFurniCountInHQMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::GuildMemberFurniCountInHQMessageParser'); }

    constructor() {
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _furniCount: number;
    static { (this.prototype as any)._furniCount = 0; }

    public get userId(): number {
        return this._userId;
    }

    public get furniCount(): number {
        return this._furniCount;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._userId = param1.readInteger();
        this._furniCount = param1.readInteger();
        return true;
    }
}
