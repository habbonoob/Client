import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class YouAreControllerMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.permissions::YouAreControllerMessageParser'); }

    private _flatId: number = 0;
    private _roomControllerLevel: number = 0;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._flatId = param1.readInteger();
        this._roomControllerLevel = param1.readInteger();
        return true;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get roomControllerLevel(): number {
        return this._roomControllerLevel;
    }
}
