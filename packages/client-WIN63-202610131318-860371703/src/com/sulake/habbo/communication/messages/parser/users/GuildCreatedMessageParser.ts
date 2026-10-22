import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuildCreatedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::GuildCreatedMessageParser'); }

    declare private _baseRoomId: number;
    static { (this.prototype as any)._baseRoomId = 0; }

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._baseRoomId = param1.readInteger();
        this._groupId = param1.readInteger();
        return true;
    }

    public get baseRoomId(): number {
        return this._baseRoomId;
    }

    public get groupId(): number {
        return this._groupId;
    }
}
