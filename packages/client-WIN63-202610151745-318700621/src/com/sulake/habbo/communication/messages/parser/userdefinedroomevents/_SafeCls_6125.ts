import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { FurnitureLabelData } from '@/com/sulake/habbo/room/object/data/FurnitureLabelData';
import { _SafeCls_6145 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6145';

export class _SafeCls_6125 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::_SafeCls_6125'); }

    declare private _entries: FurnitureLabelData[];

    constructor() {
    }

    public flush(): boolean {
        this._entries = new Array<FurnitureLabelData>(0).fill(null);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc2_: FurnitureLabelData = null;
        let _loc3_: number = param1.readInteger();
        if (_loc3_ < 0) {
            return false;
        }
        this._entries = new Array<FurnitureLabelData>(0).fill(null);
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = _SafeCls_6145.parse(param1);
            if (_loc2_ == null) {
                return false;
            }
            this._entries.push(_loc2_);
            _loc4_++;
        }
        return true;
    }

    public get entries(): FurnitureLabelData[] {
        return this._entries;
    }
}
