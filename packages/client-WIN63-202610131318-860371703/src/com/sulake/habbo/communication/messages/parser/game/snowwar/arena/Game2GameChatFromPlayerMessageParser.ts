import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2GameChatFromPlayerMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2GameChatFromPlayerMessageParser'); }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _chatMessage: string;

    constructor() {
    }

    public flush(): boolean {
        this._userId = -1;
        this._chatMessage = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._userId = param1.readInteger();
        this._chatMessage = param1.readString();
        return true;
    }

    public get userId(): number {
        return this._userId;
    }

    public get chatMessage(): string {
        return this._chatMessage;
    }
}
