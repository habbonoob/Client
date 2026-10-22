import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PrizeLevelMessageData } from '@/com/sulake/habbo/communication/messages/incoming/recycler/PrizeLevelMessageData';

export class RecyclerPrizesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.recycler::RecyclerPrizesMessageParser'); }

    declare private _prizeLevels: any[];

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        this._prizeLevels = [];
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._prizeLevels.push(new PrizeLevelMessageData(param1));
            _loc3_++;
        }
        return true;
    }

    public get prizeLevels(): any[] {
        return this._prizeLevels;
    }
}
