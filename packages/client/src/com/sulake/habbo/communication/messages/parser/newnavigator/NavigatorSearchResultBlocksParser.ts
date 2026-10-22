import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { SearchResultSet } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SearchResultSet';

export class NavigatorSearchResultBlocksParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.newnavigator::NavigatorSearchResultBlocksParser'); }

    constructor() {
    }

    declare private _searchResult: SearchResultSet;

    public get searchResult(): SearchResultSet {
        return this._searchResult;
    }

    public flush(): boolean {
        this._searchResult = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._searchResult = new SearchResultSet(param1);
        return true;
    }
}
