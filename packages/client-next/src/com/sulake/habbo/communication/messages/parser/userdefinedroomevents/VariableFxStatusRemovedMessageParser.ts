import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { VariableFxStatusRemoveData } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusRemoveData';

export class VariableFxStatusRemovedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::VariableFxStatusRemovedMessageParser'); }

    declare private _SafeStr_14184: any[];

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14184 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        this._SafeStr_14184 = [];
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14184.push(new VariableFxStatusRemoveData(param1.readString()));
            _loc3_++;
        }
        return true;
    }

    public get statuses(): any[] {
        return this._SafeStr_14184;
    }
}
