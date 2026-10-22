import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IsBadgeRequestFulfilledParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.badges::IsBadgeRequestFulfilledParser'); }

    constructor() {
    }

    declare private _requestCode: string;

    declare private _fulfilled: boolean;
    static { (this.prototype as any)._fulfilled = false; }

    public get requestCode(): string {
        return this._requestCode;
    }

    public get fulfilled(): boolean {
        return this._fulfilled;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._requestCode = param1.readString();
        this._fulfilled = param1.readBoolean();
        return true;
    }
}
