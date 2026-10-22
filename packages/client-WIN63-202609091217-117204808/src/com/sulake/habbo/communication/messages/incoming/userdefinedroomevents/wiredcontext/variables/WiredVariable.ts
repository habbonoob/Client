import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { _SafeCls_2030 } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/_SafeCls_2030';

export class WiredVariable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.variables::WiredVariable'); }

    public static _SafeStr_2375: string = "n";

    declare private _SafeStr_7039: string;

    declare private _SafeStr_6548: number;
    static { (this.prototype as any)._SafeStr_6548 = 0; }

    declare private _variableName: string;

    declare private _availabilityType: number;
    static { (this.prototype as any)._availabilityType = 0; }

    declare private _variableTarget: number;
    static { (this.prototype as any)._variableTarget = 0; }

    declare private _alwaysAvailable: boolean;
    static { (this.prototype as any)._alwaysAvailable = false; }

    declare private _canCreateAndDelete: boolean;
    static { (this.prototype as any)._canCreateAndDelete = false; }

    declare private _hasValue: boolean;
    static { (this.prototype as any)._hasValue = false; }

    declare private _canWriteValue: boolean;
    static { (this.prototype as any)._canWriteValue = false; }

    declare private _canInterceptChanges: boolean;
    static { (this.prototype as any)._canInterceptChanges = false; }

    declare private _isInvisible: boolean;
    static { (this.prototype as any)._isInvisible = false; }

    declare private _canReadCreationTime: boolean;
    static { (this.prototype as any)._canReadCreationTime = false; }

    declare private _canReadLastUpdateTime: boolean;
    static { (this.prototype as any)._canReadLastUpdateTime = false; }

    declare private _textConnector: UtilsMap;

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc5_: string = null;
        this._SafeStr_7039 = param1.readString();
        this._SafeStr_6548 = param1.readInteger();
        this._variableName = param1.readString();
        this._availabilityType = param1.readInteger();
        this._variableTarget = param1.readInteger();
        this._alwaysAvailable = param1.readBoolean();
        this._canCreateAndDelete = param1.readBoolean();
        this._hasValue = param1.readBoolean();
        this._canWriteValue = param1.readBoolean();
        this._canInterceptChanges = param1.readBoolean();
        this._isInvisible = param1.readBoolean();
        this._canReadCreationTime = param1.readBoolean();
        this._canReadLastUpdateTime = param1.readBoolean();
        let _loc2_: boolean = param1.readBoolean();
        if (_loc2_) {
            this._textConnector = new UtilsMap();
            _loc3_ = param1.readInteger();
            _loc4_ = 0;
            while (_loc4_ < _loc3_) {
                _loc6_ = param1.readInteger();
                _loc5_ = param1.readString();
                this._textConnector.add(_loc6_, _loc5_);
                _loc4_++;
            }
        }
    }

    public get variableId(): string {
        return this._SafeStr_7039;
    }

    public get variableType(): number {
        return this._SafeStr_6548;
    }

    public get variableName(): string {
        return this._variableName;
    }

    public get availabilityType(): number {
        return this._availabilityType;
    }

    public get variableTarget(): number {
        return this._variableTarget;
    }

    public get alwaysAvailable(): boolean {
        return this._alwaysAvailable;
    }

    public get canCreateAndDelete(): boolean {
        return this._canCreateAndDelete;
    }

    public get hasValue(): boolean {
        return this._hasValue;
    }

    public get canWriteValue(): boolean {
        return this._canWriteValue;
    }

    public get canInterceptChanges(): boolean {
        return this._canInterceptChanges;
    }

    public get isInvisible(): boolean {
        return this._isInvisible;
    }

    public get canReadCreationTime(): boolean {
        return this._canReadCreationTime;
    }

    public get canReadLastUpdateTime(): boolean {
        return this._canReadLastUpdateTime;
    }

    public get hasTextConnector(): boolean {
        return this._textConnector != null;
    }

    public get textConnector(): UtilsMap {
        return this._textConnector;
    }

    public get isPersisted(): boolean {
        return this._availabilityType == _SafeCls_2030._SafeStr_6788 || this._availabilityType == _SafeCls_2030._SafeStr_6650 || this._availabilityType == _SafeCls_2030._SafeStr_7335;
    }
}
