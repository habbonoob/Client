import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomRatingMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::RoomRatingMessageParser'); }

    constructor() {
    }

    declare private _rating: number;
    static { (this.prototype as any)._rating = 0; }

    declare private _canRate: boolean;
    static { (this.prototype as any)._canRate = false; }

    public get rating(): number {
        return this._rating;
    }

    public get canRate(): boolean {
        return this._canRate;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._rating = param1.readInteger();
        this._canRate = param1.readBoolean();
        return true;
    }
}
