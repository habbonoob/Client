import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { WiredLogEntry } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/roomlogs/WiredLogEntry';

export class WiredLogPage {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.roomlogs::WiredLogPage'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: any = undefined;
        this._totalEntries = param1.readInteger();
        this._currentPage = param1.readInteger();
        this._amount = param1.readInteger();
        this._elements = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._elements.push(new WiredLogEntry(param1));
            _loc3_++;
        }
        this._logLevelFilter = -1;
        this._logSourceFilter = -1;
        this._query = null;
        if (param1.readBoolean()) {
            this._logLevelFilter = param1.readByte();
        }
        if (param1.readBoolean()) {
            this._logSourceFilter = param1.readByte();
        }
        if (param1.readBoolean()) {
            this._query = param1.readString();
        }
    }

    declare private _totalEntries: number;
    static { (this.prototype as any)._totalEntries = 0; }

    declare private _currentPage: number;
    static { (this.prototype as any)._currentPage = 0; }

    declare private _elements: WiredLogEntry[];

    declare private _logLevelFilter: number;
    static { (this.prototype as any)._logLevelFilter = 0; }

    declare private _logSourceFilter: number;
    static { (this.prototype as any)._logSourceFilter = 0; }

    declare private _query: string;

    declare private _amount: number;
    static { (this.prototype as any)._amount = 0; }

    public get amount(): number {
        return this._amount;
    }

    public get totalEntries(): number {
        return this._totalEntries;
    }

    public get currentPage(): number {
        return this._currentPage;
    }

    public get elements(): WiredLogEntry[] {
        return this._elements;
    }

    public get logLevelFilter(): number {
        return this._logLevelFilter;
    }

    public get logSourceFilter(): number {
        return this._logSourceFilter;
    }

    public get query(): string {
        return this._query;
    }
}
