import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { FurnitureLabelData } from '@/com/sulake/habbo/room/object/data/FurnitureLabelData';
import { FurnitureRegionData } from '@/com/sulake/habbo/room/object/data/FurnitureRegionData';

export class _SafeCls_6145 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::_SafeCls_6145'); }

    constructor() {
    }

    public static parse(param1: IMessageDataWrapper): FurnitureLabelData {
        let _loc6_: number = 0;
        let _loc9_: number = param1.readInteger();
        let _loc13_: number = param1.readInteger();
        let _loc12_: string = param1.readString();
        if (_loc9_ == 0) {
            return new FurnitureLabelData(_loc13_, _loc12_, _loc9_, param1.readInteger(), param1.readInteger(), param1.readBoolean());
        }
        if (_loc9_ != 1) {
            return null;
        }
        let _loc5_: string = param1.readString();
        let _loc3_: number = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        let _loc7_: number = param1.readInteger();
        let _loc10_: number = param1.readInteger();
        let _loc4_: string = param1.readString();
        let _loc11_: number = param1.readInteger();
        if (_loc11_ < 0) {
            return null;
        }
        let _loc8_: Rectangle[] = new Array<Rectangle>(0).fill(null);
        _loc6_ = 0;
        while (_loc6_ < _loc11_) {
            _loc8_.push(new Rectangle(param1.readInteger(), param1.readInteger(), param1.readInteger(), param1.readInteger()));
            _loc6_++;
        }
        return new FurnitureRegionData(_loc13_, _loc12_, _loc5_, _loc3_, _loc2_, _loc7_, _loc10_, _loc4_, _loc8_);
    }
}
