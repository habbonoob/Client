import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { ObjectIdAndValuePair } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/ObjectIdAndValuePair';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';

export class VariableInfoAndHolders {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::VariableInfoAndHolders'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._variable = new WiredVariable(param1);
        this._holders = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._holders.push(new ObjectIdAndValuePair(param1));
            _loc3_++;
        }
    }

    declare private _variable: WiredVariable;

    declare private _holders: ObjectIdAndValuePair[];

    public get variable(): WiredVariable {
        return this._variable;
    }

    public get holders(): ObjectIdAndValuePair[] {
        return this._holders;
    }
}
