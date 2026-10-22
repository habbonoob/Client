import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class BadgeAndPointLimit {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.badges::BadgeAndPointLimit'); }

    constructor(param1: string, param2: IMessageDataWrapper) {
        this._badgeId = "ACH_" + param1 + param2.readInteger();
        this._limit = param2.readInteger();
    }

    declare private _badgeId: string;

    declare private _limit: number;
    static { (this.prototype as any)._limit = 0; }

    public get limit(): number {
        return this._limit;
    }

    public get badgeId(): string {
        return this._badgeId;
    }
}
