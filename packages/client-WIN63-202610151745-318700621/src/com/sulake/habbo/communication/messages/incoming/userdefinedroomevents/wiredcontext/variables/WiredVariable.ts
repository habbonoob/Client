import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { WiredVariableAvailabilityType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableAvailabilityType';

export class WiredVariable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.variables::WiredVariable'); }

    public static _SafeStr_2375: string = "n";

    declare private _SafeStr_7039: string;

    declare private _SafeStr_14110: number;
    static { (this.prototype as any)._SafeStr_14110 = 0; }

    declare private _variableName: string;

    declare private _SafeStr_14111: number;
    static { (this.prototype as any)._SafeStr_14111 = 0; }

    declare private _variableTarget: number;
    static { (this.prototype as any)._variableTarget = 0; }

    declare private _SafeStr_14112: boolean;
    static { (this.prototype as any)._SafeStr_14112 = false; }

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

    declare private _SafeStr_14113: string;

    constructor(param1: IMessageDataWrapper) {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        let _loc6_: string = null;
        let _loc2_: boolean = false;
        this._SafeStr_7039 = param1.readString();
        this._SafeStr_14110 = param1.readInteger();
        this._variableName = param1.readString();
        this._SafeStr_14111 = param1.readInteger();
        this._variableTarget = param1.readInteger();
        this._SafeStr_14112 = param1.readBoolean();
        this._alwaysAvailable = param1.readBoolean();
        this._canCreateAndDelete = param1.readBoolean();
        this._hasValue = param1.readBoolean();
        this._canWriteValue = param1.readBoolean();
        this._canInterceptChanges = param1.readBoolean();
        this._isInvisible = param1.readBoolean();
        this._canReadCreationTime = param1.readBoolean();
        this._canReadLastUpdateTime = param1.readBoolean();
        let _loc3_: boolean = param1.readBoolean();
        if (_loc3_) {
            this._textConnector = new UtilsMap();
            _loc4_ = param1.readInteger();
            _loc5_ = 0;
            while (_loc5_ < _loc4_) {
                _loc7_ = param1.readInteger();
                _loc6_ = param1.readString();
                this._textConnector.add(_loc7_, _loc6_);
                _loc5_++;
            }
            _loc2_ = param1.readBoolean();
            if (_loc2_) {
                this._SafeStr_14113 = param1.readString();
            }
        }
    }

    public get variableId(): string {
        return this._SafeStr_7039;
    }

    public get variableType(): number {
        return this._SafeStr_14110;
    }

    public get variableName(): string {
        return this._variableName;
    }

    public get availabilityType(): number {
        return this._SafeStr_14111;
    }

    public get variableTarget(): number {
        return this._variableTarget;
    }

    public get alwaysAvailable(): boolean {
        return this._SafeStr_14112;
    }

    public get canCreateAndDelete(): boolean {
        return this._alwaysAvailable;
    }

    public get hasValue(): boolean {
        return this._canCreateAndDelete;
    }

    public get canWriteValue(): boolean {
        return this._hasValue;
    }

    public get canInterceptChanges(): boolean {
        return this._canWriteValue;
    }

    public get isInvisible(): boolean {
        return this._canInterceptChanges;
    }

    public get requiresExecutionContext(): boolean {
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

    public get hasTextConnectorFallback(): boolean {
        return this._SafeStr_14113 != null;
    }

    public get textConnectorFallback(): string {
        return this._SafeStr_14113;
    }

    public get isStored(): boolean {
        return this._SafeStr_14111 < 100;
    }

    public get isPersisted(): boolean {
        return this._SafeStr_14111 == WiredVariableAvailabilityType._SafeStr_6788 || this._SafeStr_14111 == WiredVariableAvailabilityType._SafeStr_6650 || this._SafeStr_14111 == WiredVariableAvailabilityType._SafeStr_7335;
    }
}
