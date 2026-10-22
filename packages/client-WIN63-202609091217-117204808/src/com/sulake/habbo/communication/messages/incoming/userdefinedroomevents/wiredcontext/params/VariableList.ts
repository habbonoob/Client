import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { _SafeCls_1969 } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/_SafeCls_1969';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';

export class VariableList extends _SafeCls_1969 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::VariableList'); }

    private _variables: any[] = [];

    constructor(param1: any[]) {
        super();
        this._variables = param1;
    }

    public static createFromMessage(param1: IMessageDataWrapper): VariableList {
        let _loc5_: number = 0;
        let _loc4_: WiredVariable = null;
        let _loc2_: any[] = [];
        let _loc3_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc3_) {
            _loc4_ = new WiredVariable(param1);
            _loc2_.push(_loc4_);
            _loc5_++;
        }
        return new VariableList(_loc2_);
    }

    public override get variables(): any[] {
        return this._variables;
    }
}
