import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { ObjectMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectMessageData';
import { _SafeCls_1996 } from '@/com/sulake/habbo/communication/messages/parser/room/engine/_SafeCls_1996';

export class ObjectUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ObjectUpdateMessageParser'); }

    private _data: ObjectMessageData = null;

    constructor() {
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }

    public get data(): ObjectMessageData {
        let _loc1_: ObjectMessageData = this._data;
        if (_loc1_ != null) {
            _loc1_.setReadOnly();
        }
        return _loc1_;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._data = _SafeCls_1996.parseObjectData(param1);
        return true;
    }
}
