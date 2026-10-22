import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';

export class VariableInfoAndValue {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::VariableInfoAndValue'); }

    declare private _variable: WiredVariable;

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    constructor(param1: IMessageDataWrapper) {
        this._variable = new WiredVariable(param1);
        this._value = param1.readInteger();
    }

    public get variable(): WiredVariable {
        return this._variable;
    }

    public get value(): number {
        return this._value;
    }
}
