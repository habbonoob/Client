import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class ObjectIdAndValuePair {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.variables::ObjectIdAndValuePair'); }

    constructor(param1: IMessageDataWrapper) {
        this._objectId = param1.readInteger();
        this._value = param1.readInteger();
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    public get objectId(): number {
        return this._objectId;
    }

    public get value(): number {
        return this._value;
    }
}
