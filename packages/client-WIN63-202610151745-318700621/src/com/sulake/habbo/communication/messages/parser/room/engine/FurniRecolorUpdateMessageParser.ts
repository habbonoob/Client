import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { RecolorUpdateData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/RecolorUpdateData';

export class FurniRecolorUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::FurniRecolorUpdateMessageParser'); }

    declare private _SafeStr_14170: RecolorUpdateData[];

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14170 = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_14170.push(new RecolorUpdateData(param1));
            _loc3_++;
        }
        return true;
    }

    public get updates(): RecolorUpdateData[] {
        return this._SafeStr_14170;
    }
}
