import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_1969 } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/_SafeCls_1969';
import { SharedVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/SharedVariable';

export class SharedVariableList extends _SafeCls_1969 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::SharedVariableList'); }

    declare private _sharedVariables: any[];

    declare private _variables: any[];

    constructor(param1: IMessageDataWrapper) {
        let _loc4_: number = 0;
        let _loc3_: SharedVariable = null;
        super();
        this._sharedVariables = [];
        this._variables = [];
        let _loc2_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            _loc3_ = new SharedVariable(param1);
            this._sharedVariables.push(_loc3_);
            this._variables.push(_loc3_.wiredVariable);
            _loc4_++;
        }
    }

    public override get variables(): any[] {
        return this._variables;
    }

    public get sharedVariables(): any[] {
        return this._sharedVariables;
    }
}
