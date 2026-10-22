import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ObjectMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectMessageData';
import { _SafeCls_1996 } from '@/com/sulake/habbo/communication/messages/parser/room/engine/_SafeCls_1996';

export class ObjectsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ObjectsMessageParser'); }

    private _SafeStr_2502: any[] = [];

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_2502 = [];
        return true;
    }

    public getObjectCount(): number {
        return this._SafeStr_2502.length | 0;
    }

    public getObject(param1: number): ObjectMessageData {
        if (param1 < 0 || param1 >= this.getObjectCount()) {
            return null;
        }
        let _loc2_: ObjectMessageData = asInstanceOf(this._SafeStr_2502[param1], ObjectMessageData);
        if (_loc2_ != null) {
            _loc2_.setReadOnly();
        }
        return _loc2_;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc2_: string = null;
        let _loc8_: ObjectMessageData = null;
        if (param1 == null) {
            return false;
        }
        this._SafeStr_2502 = [];
        let _loc5_: UtilsMap = new UtilsMap();
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc6_ = param1.readInteger();
            _loc2_ = param1.readString();
            _loc5_.add(_loc6_, _loc2_);
            _loc4_++;
        }
        let _loc7_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc7_) {
            _loc8_ = _SafeCls_1996.parseObjectData(param1);
            if (_loc8_ != null) {
                _loc8_.ownerName = stringOrNull(_loc5_.getValue(_loc8_.ownerId));
                this._SafeStr_2502.push(_loc8_);
            }
            _loc4_++;
        }
        return true;
    }
}
