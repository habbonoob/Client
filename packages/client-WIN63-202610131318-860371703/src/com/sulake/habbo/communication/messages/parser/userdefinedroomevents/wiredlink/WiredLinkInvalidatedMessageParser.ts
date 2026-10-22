import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredLinkInvalidatedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredlink::WiredLinkInvalidatedMessageParser'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _SafeStr_15144: string;

    constructor() {
    }

    public flush(): boolean {
        this._roomId = 0;
        this._furniId = 0;
        this._SafeStr_15144 = "0";
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomId = param1.readInteger();
        this._furniId = param1.readInteger();
        this._SafeStr_15144 = param1.readString();
        return true;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get furniId(): number {
        return this._furniId;
    }

    public get deletedNetworkId(): string {
        return this._SafeStr_15144;
    }
}
