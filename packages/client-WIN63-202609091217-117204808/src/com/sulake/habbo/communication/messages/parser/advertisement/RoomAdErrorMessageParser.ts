import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomAdErrorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.advertisement::RoomAdErrorMessageParser'); }

    private _errorCode: number = 0;

    declare private _filteredText: string;

    constructor() {
    }

    public get errorCode(): number {
        return this._errorCode;
    }

    public get filteredText(): string {
        return this._filteredText;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._errorCode = param1.readInteger();
        this._filteredText = param1.readString();
        return true;
    }
}
