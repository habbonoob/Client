import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class BaseHandler implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.session.handler::BaseHandler'); }

    constructor(param1: IConnection, param2: IRoomHandlerListener) {
        this._connection = param1;
        this._SafeStr_2333 = param2;
    }

    declare public _SafeStr_2161: number;
    static { (this.prototype as any)._SafeStr_2161 = 0; }

    declare private _connection: IConnection;

    declare private _SafeStr_2333: IRoomHandlerListener;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get connection(): IConnection {
        return this._connection;
    }

    public get listener(): IRoomHandlerListener {
        return this._SafeStr_2333;
    }

    public dispose(): void {
        this._connection = null;
        this._SafeStr_2333 = null;
        this._disposed = true;
    }

    get [IDisposable](): true {
        return true;
    }
}
