import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class SavedSearch {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::SavedSearch'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _searchCode: string;

    declare private _filter: string;

    declare private _localization: string;

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readInteger();
        this._searchCode = param1.readString();
        this._filter = param1.readString();
        this._localization = param1.readString();
    }

    public get id(): number {
        return this._id;
    }

    public get searchCode(): string {
        return this._searchCode;
    }

    public get filter(): string {
        return this._filter;
    }

    public get localization(): string {
        return this._localization;
    }
}
