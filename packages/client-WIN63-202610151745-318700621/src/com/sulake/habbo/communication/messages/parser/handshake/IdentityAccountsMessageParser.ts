import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class IdentityAccountsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::IdentityAccountsMessageParser'); }

    declare private _accounts: Map<any, any>;

    constructor() {
    }

    public flush(): boolean {
        if (this._accounts) {
            this._accounts = null;
        }
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._accounts = new Dictionary();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._accounts.set(param1.readInteger(), param1.readString());
            _loc3_++;
        }
        return true;
    }

    public get accounts(): Map<any, any> {
        return this._accounts;
    }
}
