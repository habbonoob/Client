import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class RoomThumbnailUpdateResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::RoomThumbnailUpdateResultMessageParser'); }

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._flatId = param1.readInteger();
        this._resultCode = param1.readInteger();
        return true;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get resultCode(): number {
        return this._resultCode;
    }
}
