import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class WiredValidationParameter {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredValidationParameter'); }

    constructor(param1: IMessageDataWrapper) {
        this._key = param1.readString();
        this._value = param1.readString();
    }

    declare private _value: string;

    declare private _key: string;

    public get key(): string {
        return this._key;
    }

    public get value(): string {
        return this._value;
    }
}
