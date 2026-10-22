import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SharedGlobalPlaceholder } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/SharedGlobalPlaceholder';

export class SharedGlobalPlaceholderList {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::SharedGlobalPlaceholderList'); }

    declare private _sharedPlaceholders: SharedGlobalPlaceholder[];

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._sharedPlaceholders = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._sharedPlaceholders.push(new SharedGlobalPlaceholder(param1));
            _loc3_++;
        }
    }

    public get sharedPlaceholders(): SharedGlobalPlaceholder[] {
        return this._sharedPlaceholders;
    }
}
