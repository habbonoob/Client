import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CallForHelpPendingCallsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::CallForHelpPendingCallsMessageParser'); }

    constructor() {
    }

    private _callArray: any[] = [];

    public get callArray(): any[] {
        return this._callArray;
    }

    public get callCount(): number {
        return this._callArray.length | 0;
    }

    public flush(): boolean {
        this._callArray = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc2_: any = null;
        this._callArray = [];
        let _loc3_: number = param1.readInteger();
        while (_loc4_ < _loc3_) {
            _loc2_ = {};
            _loc2_.callId = param1.readString();
            _loc2_.timeStamp = param1.readString();
            _loc2_.message = param1.readString();
            this._callArray.push(_loc2_);
            _loc4_++;
        }
        return true;
    }
}
