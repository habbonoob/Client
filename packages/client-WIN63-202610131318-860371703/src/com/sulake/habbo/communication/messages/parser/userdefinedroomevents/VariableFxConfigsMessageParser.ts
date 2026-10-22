import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { VariableFxConfigUpdateData } from '@/com/sulake/habbo/room/object/variablefx/VariableFxConfigUpdateData';

export class VariableFxConfigsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::VariableFxConfigsMessageParser'); }

    declare private _SafeStr_3869: any[];

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_3869 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc15_: UtilsMap = null;
        let _loc16_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc14_: number = 0;
        let _loc19_: boolean = false;
        let _loc9_: number = 0;
        let _loc13_: number = 0;
        let _loc2_: boolean = false;
        let _loc12_: number = 0;
        let _loc18_: number = 0;
        let _loc17_: number = 0;
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc10_: number = 0;
        let _loc3_: number = NaN;
        let _loc11_: number = NaN;
        let _loc5_: number = param1.readInteger();
        this._SafeStr_3869 = [];
        _loc7_ = 0;
        while (_loc7_ < _loc5_) {
            _loc15_ = new UtilsMap();
            _loc14_ = param1.readInteger();
            _loc19_ = param1.readBoolean();
            _loc9_ = param1.readInteger();
            _loc13_ = param1.readInteger();
            _loc2_ = param1.readBoolean();
            _loc12_ = param1.readInteger();
            _loc18_ = param1.readInteger();
            _loc17_ = param1.readInteger();
            _loc4_ = param1.readInteger();
            _loc6_ = param1.readInteger();
            _loc10_ = param1.readInteger();
            _loc3_ = param1.readLong();
            _loc11_ = param1.readLong();
            _loc16_ = param1.readInteger();
            _loc8_ = 0;
            while (_loc8_ < _loc16_) {
                _loc15_.add(param1.readString(), param1.readString());
                _loc8_++;
            }
            this._SafeStr_3869.push(new VariableFxConfigUpdateData(_loc14_, _loc19_, _loc9_, _loc13_, _loc2_, _loc12_, _loc18_, _loc17_, _loc4_, _loc6_, _loc10_, _loc3_, _loc11_, _loc15_));
            _loc7_++;
        }
        return true;
    }

    public get configs(): any[] {
        return this._SafeStr_3869;
    }
}
