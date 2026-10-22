import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { registerTypeDescriptions } from '@habbo-pixi/runtime/utils/describeType';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export interface IMessageEvent {
    get callback(): (...args: any[]) => any;
    get connection(): IConnection;
    set connection(param1: IConnection);
    get parserClass(): any;
    get parser(): IMessageParser;
    set parser(param1: IMessageParser);
    dispose(): void;
}

export const IMessageEvent = Symbol('com.sulake.core.communication.messages::IMessageEvent');
registerClassName(IMessageEvent, 'com.sulake.core.communication.messages::IMessageEvent');

export function isIMessageEvent(value: unknown): value is IMessageEvent {
    return (value as { [IMessageEvent]?: true } | null | undefined)?.[IMessageEvent] === true;
}

registerTypeDescriptions({"com.sulake.core.communication.messages::IMessageEvent":{"interface":true,"instance":[["r","callback","Function"],["a","connection","com.sulake.core.communication.connection::IConnection"],["r","parserClass","Class"],["a","parser","com.sulake.core.communication.messages::IMessageParser"],["m","dispose","void",[],[]]]}});
