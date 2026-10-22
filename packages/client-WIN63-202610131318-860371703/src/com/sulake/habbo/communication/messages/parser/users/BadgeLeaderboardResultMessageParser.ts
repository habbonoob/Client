import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { _SafeCls_6026 } from '@/com/sulake/habbo/communication/messages/incoming/users/_SafeCls_6026';

export class BadgeLeaderboardResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::BadgeLeaderboardResultMessageParser'); }

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _rarity: number;
    static { (this.prototype as any)._rarity = 0; }

    declare private _page: number;
    static { (this.prototype as any)._page = 0; }

    declare private _SafeStr_4867: number;
    static { (this.prototype as any)._SafeStr_4867 = 0; }

    declare private _totalEntries: number;
    static { (this.prototype as any)._totalEntries = 0; }

    declare private _entries: any[];

    declare private _ownEntry: _SafeCls_6026;

    constructor() {
    }

    public flush(): boolean {
        this._type = 0;
        this._rarity = -1;
        this._page = 0;
        this._SafeStr_4867 = 0;
        this._totalEntries = 0;
        this._entries = [];
        this._ownEntry = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._type = param1.readInteger();
        this._rarity = param1.readInteger();
        this._page = param1.readInteger();
        this._SafeStr_4867 = param1.readInteger();
        this._totalEntries = param1.readInteger();
        this._entries = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._entries.push(new _SafeCls_6026(param1));
            _loc3_++;
        }
        if (param1.readBoolean()) {
            this._ownEntry = new _SafeCls_6026(param1);
        }
        return true;
    }

    public get type(): number {
        return this._type;
    }

    public get rarity(): number {
        return this._rarity;
    }

    public get page(): number {
        return this._page;
    }

    public get size(): number {
        return this._SafeStr_4867;
    }

    public get totalEntries(): number {
        return this._totalEntries;
    }

    public get entries(): any[] {
        return this._entries;
    }

    public get ownEntry(): _SafeCls_6026 {
        return this._ownEntry;
    }
}
