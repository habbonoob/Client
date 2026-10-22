import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxStatusUpdateData } from '@/com/sulake/habbo/room/object/variablefx/VariableFxStatusUpdateData';

export class VariableFxStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::VariableFxStatusMessageParser'); }

    declare private _SafeStr_14184: any[];

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14184 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc11_: UtilsMap = null;
        let _loc14_: number = 0;
        let _loc10_: boolean = false;
        let _loc12_: any = null;
        let _loc3_: any = null;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc13_: string = null;
        let _loc8_: boolean = false;
        let _loc2_: boolean = false;
        let _loc7_: number = 0;
        let _loc15_: number = NaN;
        let _loc9_: boolean = param1.readBoolean();
        let _loc4_: number = param1.readInteger();
        this._SafeStr_14184 = [];
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc13_ = param1.readString();
            _loc8_ = param1.readBoolean() || _loc9_;
            _loc2_ = param1.readBoolean();
            _loc7_ = param1.readInteger();
            _loc15_ = param1.readLong();
            _loc10_ = param1.readBoolean();
            _loc12_ = null;
            _loc3_ = null;
            if (_loc10_) {
                _loc12_ = param1.readLong();
                _loc3_ = param1.readLong();
            }
            _loc11_ = new UtilsMap();
            _loc14_ = param1.readInteger();
            _loc6_ = 0;
            while (_loc6_ < _loc14_) {
                _loc11_.add(param1.readString(), param1.readString());
                _loc6_++;
            }
            this._SafeStr_14184.push(new VariableFxStatusUpdateData(_loc13_, _loc8_, _loc2_, _loc7_, _loc15_, _loc12_, _loc3_, _loc11_));
            _loc5_++;
        }
        return true;
    }

    public get statuses(): any[] {
        return this._SafeStr_14184;
    }
}
