import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SavedSearch } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/SavedSearch';

export class TopLevelContext {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::TopLevelContext'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._quickLinks = new Array<SavedSearch>(0).fill(null);
        this._searchCode = param1.readString();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this.quickLinks.push(new SavedSearch(param1));
            _loc3_++;
        }
    }

    declare private _quickLinks: SavedSearch[];

    declare private _searchCode: string;

    public get searchCode(): string {
        return this._searchCode;
    }

    public get quickLinks(): SavedSearch[] {
        return this._quickLinks;
    }
}
