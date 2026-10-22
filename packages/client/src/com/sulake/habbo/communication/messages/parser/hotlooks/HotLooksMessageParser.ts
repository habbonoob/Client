import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { HotLookInfo } from '@/com/sulake/habbo/communication/messages/incoming/hotlooks/HotLookInfo';

export class HotLooksMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.hotlooks::HotLooksMessageParser'); }

    constructor() {
    }

    declare private _hotLooks: any[];

    public get hotLooks(): any[] {
        return this._hotLooks;
    }

    public flush(): boolean {
        this._hotLooks = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._hotLooks.push(new HotLookInfo(param1));
            _loc3_++;
        }
        return true;
    }
}
