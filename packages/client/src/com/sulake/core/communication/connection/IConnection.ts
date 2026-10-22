import type { IEncryption } from '@/com/sulake/core/communication/encryption/IEncryption';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageConfiguration } from '@/com/sulake/core/communication/messages/IMessageConfiguration';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IConnection extends IEventDispatcher {
    get disposed(): boolean;
    set timeout(param1: number);
    get connected(): boolean;
    dispose(): void;
    init(param1: string, param2?: number, param3?: boolean): boolean;
    send(param1: IMessageComposer): boolean;
    sendUnencrypted(param1: IMessageComposer): boolean;
    setEncryption(param1: IEncryption, param2: IEncryption): void;
    getServerToClientEncryption(): IEncryption;
    registerMessageClasses(param1: IMessageConfiguration): void;
    addMessageEvent(param1: IMessageEvent): void;
    removeMessageEvent(param1: IMessageEvent): void;
    processReceivedData(): void;
    close(): void;
    isAuthenticated(): void;
    isConfigured(): void;
    createSocket(): void;
    addListener(param1: string, param2: (...args: any[]) => any): void;
}
