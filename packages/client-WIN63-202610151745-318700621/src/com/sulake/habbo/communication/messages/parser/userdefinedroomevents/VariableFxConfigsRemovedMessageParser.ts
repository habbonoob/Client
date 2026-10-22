import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class VariableFxConfigsRemovedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::VariableFxConfigsRemovedMessageParser'); }

    declare private _SafeStr_14938: any[];

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14938 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        this._SafeStr_14938 = [];
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14938.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }

    public get configIds(): any[] {
        return this._SafeStr_14938;
    }
}
