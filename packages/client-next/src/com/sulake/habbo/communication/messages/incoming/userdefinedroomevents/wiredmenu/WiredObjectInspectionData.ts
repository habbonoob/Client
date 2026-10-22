import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class WiredObjectInspectionData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredObjectInspectionData'); }

    private static _SafeStr_7392: number = 0;
    private static _SafeStr_7463: number = 1;
    private static _SafeStr_8408: number = -10;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _userIndex: number;
    static { (this.prototype as any)._userIndex = 0; }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _variableValues: UtilsMap;

    private _configuredInWireds: number[] = null;

    constructor(param1: IMessageDataWrapper) {
        let _loc4_: number = 0;
        let _loc5_: string = null;
        let _loc6_: number = 0;
        let _loc2_: number = 0;
        this._type = param1.readInteger();
        if (this._type == WiredObjectInspectionData._SafeStr_7392) {
            this._objectId = param1.readInteger();
        } else if (this._type == WiredObjectInspectionData._SafeStr_7463) {
            this._userIndex = param1.readInteger();
        }
        this._variableValues = new UtilsMap();
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc5_ = param1.readString();
            _loc6_ = param1.readInteger();
            this._variableValues.add(_loc5_, _loc6_);
            _loc4_ += 1;
        }
        if (this._type == WiredObjectInspectionData._SafeStr_7392) {
            _loc3_ = param1.readInteger();
            this._configuredInWireds = [];
            _loc4_ = 0;
            while (_loc4_ < _loc3_) {
                _loc2_ = param1.readInteger();
                this._configuredInWireds.push(_loc2_);
                _loc4_ += 1;
            }
        }
    }

    public get type(): number {
        return this._type;
    }

    public get userIndex(): number {
        return this._userIndex;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get variableValues(): UtilsMap {
        return this._variableValues;
    }

    public get configuredInWireds(): number[] {
        return this._configuredInWireds;
    }
}
