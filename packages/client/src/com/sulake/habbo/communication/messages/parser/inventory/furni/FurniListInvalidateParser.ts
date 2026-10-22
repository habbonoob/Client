import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FurniListInvalidateParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.furni::FurniListInvalidateParser'); }

    public parse(param1: IMessageDataWrapper): boolean {
        return true;
    }

    public flush(): boolean {
        return true;
    }
}
