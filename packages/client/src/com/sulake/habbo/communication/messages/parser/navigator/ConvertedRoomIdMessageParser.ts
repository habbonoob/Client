import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ConvertedRoomIdMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::ConvertedRoomIdMessageParser'); }

    constructor() {
    }

    declare private _globalId: string;

    declare private _convertedId: number;
    static { (this.prototype as any)._convertedId = 0; }

    public get globalId(): string {
        return this._globalId;
    }

    public get convertedId(): number {
        return this._convertedId;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._globalId = param1.readString();
        this._convertedId = param1.readInteger();
        return true;
    }

    public flush(): boolean {
        this._globalId = null;
        return true;
    }
}
