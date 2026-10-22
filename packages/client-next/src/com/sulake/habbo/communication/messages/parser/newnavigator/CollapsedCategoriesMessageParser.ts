import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CollapsedCategoriesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.newnavigator::CollapsedCategoriesMessageParser'); }

    declare private _collapsedCategories: string[];

    constructor() {
    }

    public flush(): boolean {
        this._collapsedCategories = new Array<string>(0).fill(null);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._collapsedCategories.push(param1.readString());
            _loc3_++;
        }
        return true;
    }

    public get collapsedCategories(): string[] {
        return this._collapsedCategories;
    }
}
