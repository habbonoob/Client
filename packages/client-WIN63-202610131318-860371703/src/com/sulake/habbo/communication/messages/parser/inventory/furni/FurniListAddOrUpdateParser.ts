import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FurniData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniData';

export class FurniListAddOrUpdateParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.furni::FurniListAddOrUpdateParser'); }

    declare protected _SafeStr_4563: FurniData[];

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._SafeStr_4563 = new Array<FurniData>(0).fill(null);
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_4563.push(new FurniData(param1));
            _loc3_++;
        }
        return true;
    }

    public flush(): boolean {
        this._SafeStr_4563 = null;
        return true;
    }

    public getFurni(): FurniData[] {
        return this._SafeStr_4563;
    }
}
