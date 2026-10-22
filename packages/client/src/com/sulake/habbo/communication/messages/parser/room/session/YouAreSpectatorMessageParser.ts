import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class YouAreSpectatorMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.session::YouAreSpectatorMessageParser'); }

    constructor() {
    }

    private _flatId: number = 0;

    public get flatId(): number {
        return this._flatId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._flatId = param1.readInteger();
        return true;
    }
}
