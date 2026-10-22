import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FurniHighlightData } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/FurniHighlightData';
import { FurniTransparencyData } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/FurniTransparencyData';

export class _SafeCls_6119 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::_SafeCls_6119'); }

    declare private _SafeStr_14936: FurniTransparencyData[];

    declare private _SafeStr_14937: FurniHighlightData[];

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14936 = new Array<FurniTransparencyData>(0).fill(null);
        this._SafeStr_14937 = new Array<FurniHighlightData>(0).fill(null);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        if (_loc2_ < 0) {
            return false;
        }
        this._SafeStr_14936 = new Array<FurniTransparencyData>(0).fill(null);
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14936.push(new FurniTransparencyData(param1.readInteger(), param1.readInteger(), param1.readBoolean(), param1.readInteger()));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        if (_loc2_ < 0) {
            return false;
        }
        this._SafeStr_14937 = new Array<FurniHighlightData>(0).fill(null);
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14937.push(new FurniHighlightData(param1.readInteger(), param1.readInteger(), param1.readInteger(), param1.readInteger(), param1.readInteger(), param1.readInteger()));
            _loc3_++;
        }
        return true;
    }

    public get transparencies(): FurniTransparencyData[] {
        return this._SafeStr_14936;
    }

    public get highlights(): FurniHighlightData[] {
        return this._SafeStr_14937;
    }
}
