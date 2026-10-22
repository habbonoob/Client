import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GetCustomFilterResultMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.customfilter::GetCustomFilterResultMessageEventParser'); }

    private _SafeStr_4727: any[] = null;

    constructor() {
        this._SafeStr_4727 = [];
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._SafeStr_4727 = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._SafeStr_4727.push(param1.readString());
            _loc3_++;
        }
        return true;
    }

    public get words(): any[] {
        return this._SafeStr_4727.slice();
    }
}
