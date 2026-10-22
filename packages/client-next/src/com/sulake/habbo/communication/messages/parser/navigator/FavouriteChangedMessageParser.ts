import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FavouriteChangedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::FavouriteChangedMessageParser'); }

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _added: boolean;
    static { (this.prototype as any)._added = false; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._flatId = param1.readInteger();
        this._added = param1.readBoolean();
        return true;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get added(): boolean {
        return this._added;
    }
}
