import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export class FaqClientFaqsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::FaqClientFaqsMessageParser'); }

    constructor() {
    }

    declare private _urgentData: UtilsMap;

    declare private _normalData: UtilsMap;

    public get urgentData(): UtilsMap {
        return this._urgentData;
    }

    public get normalData(): UtilsMap {
        return this._normalData;
    }

    public flush(): boolean {
        if (this._urgentData != null) {
            this._urgentData.dispose();
        }
        this._urgentData = null;
        if (this._normalData != null) {
            this._normalData.dispose();
        }
        this._normalData = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        let _loc5_: string = null;
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        this._urgentData = new UtilsMap();
        this._normalData = new UtilsMap();
        _loc3_ = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = param1.readInteger();
            _loc5_ = param1.readString();
            this._urgentData.add(_loc2_, _loc5_);
            _loc4_++;
        }
        _loc3_ = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = param1.readInteger();
            _loc5_ = param1.readString();
            this._normalData.add(_loc2_, _loc5_);
            _loc4_++;
        }
        return true;
    }
}
