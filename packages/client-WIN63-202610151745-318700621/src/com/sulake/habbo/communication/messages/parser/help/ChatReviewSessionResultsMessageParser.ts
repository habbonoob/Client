import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ChatReviewSessionResultsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::ChatReviewSessionResultsMessageParser'); }

    declare private _winningVoteCode: number;
    static { (this.prototype as any)._winningVoteCode = 0; }

    declare private _ownVoteCode: number;
    static { (this.prototype as any)._ownVoteCode = 0; }

    declare private _finalStatus: any[];

    constructor() {
    }

    public flush(): boolean {
        this._winningVoteCode = -1;
        this._ownVoteCode = -1;
        this._finalStatus = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._winningVoteCode = param1.readInteger();
        this._ownVoteCode = param1.readInteger();
        this._finalStatus = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._finalStatus.push(param1.readInteger());
            _loc3_++;
        }
        return true;
    }

    public get winningVoteCode(): number {
        return this._winningVoteCode;
    }

    public get ownVoteCode(): number {
        return this._ownVoteCode;
    }

    public get finalStatus(): any[] {
        return this._finalStatus;
    }
}
