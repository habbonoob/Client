import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { FurnitureLabelData } from '@/com/sulake/habbo/room/object/data/FurnitureLabelData';
import { _SafeCls_6145 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6145';

export class _SafeCls_6127 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::_SafeCls_6127'); }

    declare private _addedOrUpdated: FurnitureLabelData[];

    declare private _removedIds: number[];

    constructor() {
    }

    public flush(): boolean {
        this._addedOrUpdated = new Array<FurnitureLabelData>(0).fill(null);
        this._removedIds = new Array<number>(0).fill(0);
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: FurnitureLabelData = null;
        let _loc4_: number = param1.readInteger();
        if (_loc4_ < 0) {
            return false;
        }
        this._addedOrUpdated = new Array<FurnitureLabelData>(0).fill(null);
        this._removedIds = new Array<number>(0).fill(0);
        _loc3_ = 0;
        while (_loc3_ < _loc4_) {
            _loc2_ = _SafeCls_6145.parse(param1);
            if (_loc2_ == null) {
                return false;
            }
            this._addedOrUpdated.push(_loc2_);
            _loc3_++;
        }
        let _loc5_: number = param1.readInteger();
        if (_loc5_ < 0) {
            return false;
        }
        _loc3_ = 0;
        while (_loc3_ < _loc5_) {
            this._removedIds.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }

    public get addedOrUpdated(): FurnitureLabelData[] {
        return this._addedOrUpdated;
    }

    public get removedIds(): number[] {
        return this._removedIds;
    }
}
