import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { ObjectData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/ObjectData';
import { ObjectDataParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/ObjectDataParser';

export class ObjectsDataUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::ObjectsDataUpdateMessageParser'); }

    private _SafeStr_2502: any[] = [];

    constructor() {
    }

    public get objectCount(): number {
        return this._SafeStr_2502.length | 0;
    }

    public getObjectData(param1: number): ObjectData {
        if (param1 < 0 || param1 >= this.objectCount) {
            return null;
        }
        return this._SafeStr_2502[param1];
    }

    public flush(): boolean {
        this._SafeStr_2502 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: IStuffData = null;
        let _loc6_: number = 0;
        let _loc7_: number = NaN;
        if (param1 == null) {
            return false;
        }
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc5_ = param1.readInteger();
            _loc2_ = ObjectDataParser.parseStuffData(param1);
            _loc6_ = 0;
            _loc7_ = Number(parseFloat(_loc2_.getLegacyString()));
            if (!isNaN(_loc7_)) {
                _loc6_ = Number(_loc2_.getLegacyString()) | 0;
            }
            this._SafeStr_2502.push(new ObjectData(_loc5_, _loc6_, _loc2_));
            _loc4_++;
        }
        return true;
    }
}
