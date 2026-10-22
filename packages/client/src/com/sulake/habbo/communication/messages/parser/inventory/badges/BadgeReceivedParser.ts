import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class BadgeReceivedParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.badges::BadgeReceivedParser'); }

    constructor() {
    }

    declare private _badgeId: number;
    static { (this.prototype as any)._badgeId = 0; }

    declare private _badgeCode: string;

    public get badgeCode(): string {
        return this._badgeCode;
    }

    public get badgeId(): number {
        return this._badgeId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._badgeId = param1.readInteger();
        this._badgeCode = param1.readString();
        return true;
    }
}
