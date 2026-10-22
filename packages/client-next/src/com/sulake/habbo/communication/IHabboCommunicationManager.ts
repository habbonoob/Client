import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BigInteger } from '@/com/hurlant/math/BigInteger';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IEncryption } from '@/com/sulake/core/communication/encryption/IEncryption';
import type { IKeyExchange } from '@/com/sulake/core/communication/handshake/IKeyExchange';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IHabboWebApiListener } from '@/com/sulake/habbo/communication/IHabboWebApiListener';
import type { IHabboWebApiSession } from '@/com/sulake/habbo/communication/IHabboWebApiSession';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboCommunicationManager extends IUnknown {
    disconnect(): void;
    get connection(): IConnection;
    get mode(): number;
    get suggestedLoginActions(): any[];
    set suggestedLoginActions(param1: any[]);
    set mode(param1: number);
    set tcpNoDelay(param1: boolean);
    get port(): number;
    updateHostParameters(): void;
    initConnection(param1: string): void;
    renewSocket(): void;
    addHabboConnectionMessageEvent(param1: IMessageEvent): IMessageEvent;
    removeHabboConnectionMessageEvent(param1: IMessageEvent): void;
    initializeEncryption(): IEncryption;
    initializeKeyExchange(param1: BigInteger, param2: BigInteger): IKeyExchange;
    setMessageQueueErrorDebugData(): void;
    createHabboWebApiSession(param1: IHabboWebApiListener, param2: string): IHabboWebApiSession;
    getHabboWebApiSession(): IHabboWebApiSession;
    resetHabboWebApiSession(): void;
    get events(): IEventDispatcher;
}

export const IHabboCommunicationManager = Symbol('com.sulake.habbo.communication::IHabboCommunicationManager');
registerClassName(IHabboCommunicationManager, 'com.sulake.habbo.communication::IHabboCommunicationManager');

export function isIHabboCommunicationManager(value: unknown): value is IHabboCommunicationManager {
    return (value as { [IHabboCommunicationManager]?: true } | null | undefined)?.[IHabboCommunicationManager] === true;
}
