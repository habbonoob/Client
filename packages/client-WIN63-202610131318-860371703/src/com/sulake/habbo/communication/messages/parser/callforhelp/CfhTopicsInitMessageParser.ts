import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { CallForHelpCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/callforhelp/CallForHelpCategoryData';

export class CfhTopicsInitMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.callforhelp::CfhTopicsInitMessageParser'); }

    declare private _callForHelpCategories: CallForHelpCategoryData[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor() {
    }

    public flush(): boolean {
        if (this._disposed) {
            return true;
        }
        this._disposed = true;
        for (const _loc1_ of this._callForHelpCategories ?? []) {
            _loc1_.dispose();
        }
        this._callForHelpCategories = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._callForHelpCategories = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._callForHelpCategories.push(new CallForHelpCategoryData(param1));
            _loc3_++;
        }
        return true;
    }

    public get callForHelpCategories(): CallForHelpCategoryData[] {
        return this._callForHelpCategories;
    }
}
