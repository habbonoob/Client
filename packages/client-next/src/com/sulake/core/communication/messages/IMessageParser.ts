import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export interface IMessageParser {
    flush(): boolean;
    parse(param1: IMessageDataWrapper): boolean;
}
