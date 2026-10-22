import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class YoutubeControlVideoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::YoutubeControlVideoMessageParser'); }

    constructor() {
    }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _commandId: number;
    static { (this.prototype as any)._commandId = 0; }

    public get furniId(): number {
        return this._furniId;
    }

    public get commandId(): number {
        return this._commandId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._furniId = param1.readInteger();
        this._commandId = param1.readInteger();
        return true;
    }
}
