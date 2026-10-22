import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export interface IConnectionStateListener {
    connectionInit(param1: string, param2: number): void;
    messageReceived(param1: string): void;
    messageSent(param1: string): void;
    messageParseError(param1: IMessageDataWrapper): void;
}
