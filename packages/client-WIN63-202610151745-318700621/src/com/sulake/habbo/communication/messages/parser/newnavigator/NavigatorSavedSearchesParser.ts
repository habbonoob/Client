import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { SavedSearch } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SavedSearch';

export class NavigatorSavedSearchesParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.newnavigator::NavigatorSavedSearchesParser'); }

    declare private _savedSearches: SavedSearch[];

    constructor() {
    }

    public flush(): boolean {
        this._savedSearches = new Array<SavedSearch>(0).fill(null);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._savedSearches.push(new SavedSearch(param1));
            _loc3_++;
        }
        return true;
    }

    public get savedSearches(): SavedSearch[] {
        return this._savedSearches;
    }
}
