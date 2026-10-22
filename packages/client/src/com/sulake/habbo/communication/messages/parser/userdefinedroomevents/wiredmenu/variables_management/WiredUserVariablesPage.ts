import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { WiredUserVariablesElement } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserVariablesElement';

export class WiredUserVariablesPage {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.variables_management::WiredUserVariablesPage'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: any = undefined;
        this._variableId = param1.readString();
        this._totalEntries = param1.readInteger();
        this._currentPage = param1.readInteger();
        this._amount = param1.readInteger();
        this._elements = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._elements.push(new WiredUserVariablesElement(param1));
            _loc3_++;
        }
        this._userTypeFilter = param1.readInteger();
        this._sortTypFilter = param1.readInteger();
    }

    private _variableId: string = null;

    declare private _totalEntries: number;
    static { (this.prototype as any)._totalEntries = 0; }

    declare private _currentPage: number;
    static { (this.prototype as any)._currentPage = 0; }

    declare private _elements: WiredUserVariablesElement[];

    declare private _userTypeFilter: number;
    static { (this.prototype as any)._userTypeFilter = 0; }

    declare private _sortTypFilter: number;
    static { (this.prototype as any)._sortTypFilter = 0; }

    declare private _amount: number;
    static { (this.prototype as any)._amount = 0; }

    public get amount(): number {
        return this._amount;
    }

    public get variableId(): string {
        return this._variableId;
    }

    public get totalEntries(): number {
        return this._totalEntries;
    }

    public get currentPage(): number {
        return this._currentPage;
    }

    public get elements(): WiredUserVariablesElement[] {
        return this._elements;
    }

    public get userTypeFilter(): number {
        return this._userTypeFilter;
    }

    public get sortTypFilter(): number {
        return this._sortTypFilter;
    }
}
