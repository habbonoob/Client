import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { ObjectMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectMessageData';
import { StuffDataFactory } from '@/com/sulake/habbo/room/object/data/StuffDataFactory';

export class ObjectDataParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ObjectDataParser'); }

    public static parseObjectData(param1: IMessageDataWrapper): ObjectMessageData {
        if (param1 == null) {
            return null;
        }
        let _loc2_: number = param1.readInteger();
        let _loc5_: ObjectMessageData = new ObjectMessageData(_loc2_);
        let _loc3_: number = param1.readInteger();
        _loc5_.type = _loc3_;
        _loc5_.x = param1.readInteger();
        _loc5_.y = param1.readInteger();
        _loc5_.dir = param1.readInteger() % 8 * 45;
        _loc5_.z = Number(param1.readString());
        _loc5_.sizeZ = Number(param1.readString());
        _loc5_.extra = param1.readInteger();
        _loc5_.data = ObjectDataParser.parseStuffData(param1);
        let _loc4_: number = parseFloat(_loc5_.data.getLegacyString());
        if (!isNaN(_loc4_)) {
            _loc5_.state = Number(_loc5_.data.getLegacyString()) | 0;
        }
        _loc5_.expiryTime = param1.readInteger();
        _loc5_.usagePolicy = param1.readInteger();
        _loc5_.ownerId = param1.readInteger();
        if (_loc3_ < 0) {
            _loc5_.staticClass = param1.readString();
        }
        return _loc5_;
    }

    public static parseStuffData(param1: IMessageDataWrapper): IStuffData {
        let _loc3_: number = param1.readInteger();
        let _loc2_: IStuffData = StuffDataFactory.getStuffDataWrapperForType(_loc3_);
        _loc2_.initializeFromIncomingMessage(param1);
        return _loc2_;
    }
}
