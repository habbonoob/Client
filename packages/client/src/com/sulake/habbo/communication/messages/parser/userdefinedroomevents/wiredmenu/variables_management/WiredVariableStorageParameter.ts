import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class WiredVariableStorageParameter {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.variables_management::WiredVariableStorageParameter'); }

    constructor(param1: IMessageDataWrapper, param2: boolean = false) {
        if (param2) {
            this._variableId = param1.readString();
        }
        this._value = param1.readInteger();
        this._creationTime = param1.readLong();
        this._creationTimeStr = param1.readString();
        this._lastUpdateTime = param1.readLong();
        this._lastUpdateTimeStr = param1.readString();
    }

    declare private _variableId: string;

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    declare private _creationTimeStr: string;

    declare private _lastUpdateTimeStr: string;

    declare private _creationTime: number;
    static { (this.prototype as any)._creationTime = NaN; }

    public get creationTime(): number {
        return this._creationTime;
    }

    declare private _lastUpdateTime: number;
    static { (this.prototype as any)._lastUpdateTime = NaN; }

    public get lastUpdateTime(): number {
        return this._lastUpdateTime;
    }

    public get variableId(): string {
        return this._variableId;
    }

    public get value(): number {
        return this._value;
    }

    public get creationTimeStr(): string {
        return this._creationTimeStr;
    }

    public get lastUpdateTimeStr(): string {
        return this._lastUpdateTimeStr;
    }
}
