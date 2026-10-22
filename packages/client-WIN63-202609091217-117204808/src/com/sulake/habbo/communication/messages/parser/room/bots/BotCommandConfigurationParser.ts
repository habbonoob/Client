import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class BotCommandConfigurationParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.bots::BotCommandConfigurationParser'); }

    declare private _botId: number;
    static { (this.prototype as any)._botId = 0; }

    declare private _commandId: number;
    static { (this.prototype as any)._commandId = 0; }

    declare private _data: string;

    constructor() {
    }

    public get botId(): number {
        return this._botId;
    }

    public get commandId(): number {
        return this._commandId;
    }

    public get data(): string {
        return this._data;
    }

    public flush(): boolean {
        this._botId = -1;
        this._commandId = -1;
        this._data = "";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._botId = param1.readInteger();
        this._commandId = param1.readInteger();
        this._data = param1.readString();
        return true;
    }
}
