import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { WiredTransactionInfo } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/transactions/WiredTransactionInfo';

export class WiredTransactionLogList implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.transactions::WiredTransactionLogList'); }

    public static _SafeStr_7323: number = 0;
    public static _SafeStr_7523: number = 1;

    constructor(param1: IMessageDataWrapper) {
        let _loc2_: number = 0;
        this._logListType = param1.readInteger();
        this._logListId = param1.readLong();
        this._totalLogs = param1.readInteger();
        this._currentPage = param1.readInteger();
        this._amount = param1.readInteger();
        this._logs = [];
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._logs.push(new WiredTransactionInfo(param1));
            _loc2_++;
        }
    }

    declare private _logListType: number;
    static { (this.prototype as any)._logListType = 0; }

    declare private _logListId: number;
    static { (this.prototype as any)._logListId = NaN; }

    declare private _totalLogs: number;
    static { (this.prototype as any)._totalLogs = 0; }

    declare private _currentPage: number;
    static { (this.prototype as any)._currentPage = 0; }

    declare private _logs: WiredTransactionInfo[];

    declare private _amount: number;
    static { (this.prototype as any)._amount = 0; }

    public get amount(): number {
        return this._amount;
    }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get logListType(): number {
        return this._logListType;
    }

    public get logListId(): number {
        return this._logListId | 0;
    }

    public get totalLogs(): number {
        return this._totalLogs;
    }

    public get currentPage(): number {
        return this._currentPage;
    }

    public get logs(): WiredTransactionInfo[] {
        return this._logs;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._logListType = 0;
        this._logListId = 0;
        this._totalLogs = 0;
        this._currentPage = 0;
        this._amount = 0;
        this._logs = null;
        this._disposed = true;
    }

    get [IDisposable](): true {
        return true;
    }
}
