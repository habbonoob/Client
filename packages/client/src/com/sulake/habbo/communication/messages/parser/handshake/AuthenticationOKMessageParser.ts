import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class AuthenticationOKMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.handshake::AuthenticationOKMessageParser'); }

    constructor() {
        this._suggestedLoginActions = [];
    }

    declare private _accountId: number;
    static { (this.prototype as any)._accountId = 0; }

    declare private _suggestedLoginActions: any[];

    declare private _identityId: number;
    static { (this.prototype as any)._identityId = 0; }

    public get accountId(): number {
        return this._accountId;
    }

    public get suggestedLoginActions(): any[] {
        return this._suggestedLoginActions;
    }

    public get identityId(): number {
        return this._identityId;
    }

    public flush(): boolean {
        this._accountId = -1;
        this._suggestedLoginActions = [];
        this._identityId = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._accountId = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._suggestedLoginActions.push(param1.readShort());
            _loc3_++;
        }
        this._identityId = param1.readInteger();
        return true;
    }
}
