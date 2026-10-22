import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import { SearchResultList } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultList';

export class SearchResultSet {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::SearchResultSet'); }

    declare private _searchCodeOriginal: string;

    declare private _filteringData: string;

    declare private _blocks: SearchResultList[];

    constructor(param1: IMessageDataWrapper, param2: SearchResultList = null) {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        this._blocks = new Array<SearchResultList>(0).fill(null);
        if (param2 != null) {
            this._searchCodeOriginal = param2.searchCode;
            this._filteringData = param2.text;
            this._blocks.push(param2);
        } else {
            this._searchCodeOriginal = param1.readString();
            this._filteringData = param1.readString();
            _loc3_ = param1.readInteger();
            _loc4_ = 0;
            while (_loc4_ < _loc3_) {
                this._blocks.push(new SearchResultList(param1));
                _loc4_++;
            }
        }
    }

    public get searchCodeOriginal(): string {
        return this._searchCodeOriginal;
    }

    public get filteringData(): string {
        return this._filteringData;
    }

    public get blocks(): SearchResultList[] {
        return this._blocks;
    }

    public findGuestRoom(param1: number): GuestRoomData {
        let _loc3_: GuestRoomData = null;
        for (const _loc2_ of this._blocks ?? []) {
            _loc3_ = _loc2_.findGuestRoom(param1);
            if (_loc3_ != null) {
                return _loc3_;
            }
        }
        return null;
    }
}
