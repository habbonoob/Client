import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { ISearchResultData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/ISearchResultData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import { OfficialRoomEntryData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/OfficialRoomEntryData';

export class GuestRoomSearchResultData implements IDisposable, ISearchResultData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::GuestRoomSearchResultData'); }

    declare private _searchType: number;
    static { (this.prototype as any)._searchType = 0; }

    declare private _searchParam: string;

    declare private _rooms: any[];

    declare private _ad: OfficialRoomEntryData;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._rooms = [];
        this._searchType = param1.readInteger();
        this._searchParam = param1.readString();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._rooms.push(new GuestRoomData(param1));
            _loc3_++;
        }
        let _loc4_: boolean = param1.readBoolean();
        if (_loc4_) {
            this._ad = new OfficialRoomEntryData(param1);
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._rooms != null) {
            for (const _loc1_ of this._rooms ?? []) {
                _loc1_.dispose();
            }
        }
        if (this._ad != null) {
            this._ad.dispose();
            this._ad = null;
        }
        this._rooms = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get searchType(): number {
        return this._searchType;
    }

    public get searchParam(): string {
        return this._searchParam;
    }

    public get rooms(): any[] {
        return this._rooms;
    }

    public get ad(): OfficialRoomEntryData {
        return this._ad;
    }

    get [IDisposable](): true {
        return true;
    }
}
