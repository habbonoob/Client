import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class BotForceOpenContextMenuParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.bots::BotForceOpenContextMenuParser'); }

    constructor() {
    }

    declare private _botId: number;
    static { (this.prototype as any)._botId = 0; }

    public get botId(): number {
        return this._botId;
    }

    public flush(): boolean {
        this._botId = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._botId = param1.readInteger();
        return true;
    }
}
