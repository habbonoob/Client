import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CanCreateRoomEventMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::CanCreateRoomEventMessageParser'); }

    constructor() {
    }

    declare private _canCreateEvent: boolean;
    static { (this.prototype as any)._canCreateEvent = false; }

    declare private _errorCode: number;
    static { (this.prototype as any)._errorCode = 0; }

    public get errorCode(): number {
        return this._errorCode;
    }

    public get canCreateEvent(): boolean {
        return this._canCreateEvent;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._canCreateEvent = param1.readBoolean();
        this._errorCode = param1.readInteger();
        return true;
    }
}
