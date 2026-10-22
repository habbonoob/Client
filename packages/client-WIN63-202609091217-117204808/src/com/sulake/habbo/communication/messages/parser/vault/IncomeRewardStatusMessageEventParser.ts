import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { IncomeReward } from '@/com/sulake/habbo/communication/messages/parser/vault/IncomeReward';

export class IncomeRewardStatusMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.vault::IncomeRewardStatusMessageEventParser'); }

    private _data: any[] = [];

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._data.push(new IncomeReward(param1.readByte(), param1.readByte(), param1.readInteger(), param1.readString()));
            _loc3_++;
        }
        return true;
    }

    public flush(): boolean {
        this._data = [];
        return true;
    }

    public get data(): any[] {
        return this._data;
    }

    public set data(param1: any[]) {
        this._data = param1;
    }
}
