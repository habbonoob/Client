import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { SearchResultSet } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultSet';

export class SearchResultContainer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::SearchResultContainer'); }

    constructor(param1: SearchResultSet) {
        this._searchCodeOriginal = param1.searchCodeOriginal;
        this._filteringData = param1.filteringData;
        this._resultSet = param1;
    }

    declare private _searchCodeOriginal: string;

    declare private _filteringData: string;

    declare private _resultSet: SearchResultSet;

    public get searchCodeOriginal(): string {
        return this._searchCodeOriginal;
    }

    public get filteringData(): string {
        return this._filteringData;
    }

    public get resultSet(): SearchResultSet {
        return this._resultSet;
    }

    public findGuestRoom(param1: number): GuestRoomData {
        if (this._resultSet != null) {
            return this._resultSet.findGuestRoom(param1);
        }
        return null;
    }
}
