import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { registerTypeDescriptions } from '@habbo-pixi/runtime/utils/describeType';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';

export class MessageEvent implements IMessageEvent {
    static {
        registerClassName(this, 'com.sulake.core.communication.messages::MessageEvent');
        registerTypeDescriptions({"com.sulake.core.communication.messages::MessageEvent":{"impls":["com.sulake.core.communication.messages::IMessageEvent"],"instance":[["r","callback","Function"],["a","connection","com.sulake.core.communication.connection::IConnection"],["r","parserClass","Class"],["a","parser","com.sulake.core.communication.messages::IMessageParser"],["m","dispose","void",[],[]]]}});
    }

    constructor(param1: (...args: any[]) => any, param2: any) {
        this._callback = param1;
        this._parserClass = param2;
    }

    declare protected _connection: IConnection;

    declare protected _parser: IMessageParser;

    declare private _parserClass: any;

    declare protected _callback: (...args: any[]) => any;

    public get callback(): (...args: any[]) => any {
        return this._callback;
    }

    public get connection(): IConnection {
        return this._connection;
    }

    public set connection(param1: IConnection) {
        this._connection = param1;
    }

    public get parserClass(): any {
        return this._parserClass;
    }

    public get parser(): IMessageParser {
        return this._parser;
    }

    public set parser(param1: IMessageParser) {
        this._parser = param1;
    }

    public dispose(): void {
        this._callback = null;
        this._parserClass = null;
        this._connection = null;
        this._parser = null;
    }

    get [IMessageEvent](): true {
        return true;
    }
}
