import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class OpenChestMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.chests::OpenChestMessageParser'); }

    constructor() {
    }

    declare private _chestId: number;
    static { (this.prototype as any)._chestId = 0; }

    public get chestId(): number {
        return this._chestId;
    }

    public flush(): boolean {
        this._chestId = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._chestId = param1.readInteger();
        return true;
    }
}
