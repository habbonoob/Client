import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PollErrorParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.poll::PollErrorParser'); }

    constructor() {
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        return false;
    }
}
