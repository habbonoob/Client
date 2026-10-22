import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class WiredVariableStorageParameter {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.variables_management::WiredVariableStorageParameter'); }

    declare private _SafeStr_7039: string;

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    declare private _creationTime: number;
    static { (this.prototype as any)._creationTime = NaN; }

    declare private _SafeStr_6852: string;

    declare private _lastUpdateTime: number;
    static { (this.prototype as any)._lastUpdateTime = NaN; }

    declare private _lastUpdateTimeStr: string;

    constructor(param1: IMessageDataWrapper, param2: boolean = false) {
        if (param2) {
            this._SafeStr_7039 = param1.readString();
        }
        this._value = param1.readInteger();
        this._creationTime = param1.readLong();
        this._SafeStr_6852 = param1.readString();
        this._lastUpdateTime = param1.readLong();
        this._lastUpdateTimeStr = param1.readString();
    }

    public get variableId(): string {
        return this._SafeStr_7039;
    }

    public get value(): number {
        return this._value;
    }

    public get creationTime(): number {
        return this._creationTime;
    }

    public get creationTimeStr(): string {
        return this._SafeStr_6852;
    }

    public get lastUpdateTime(): number {
        return this._lastUpdateTime;
    }

    public get lastUpdateTimeStr(): string {
        return this._lastUpdateTimeStr;
    }
}
