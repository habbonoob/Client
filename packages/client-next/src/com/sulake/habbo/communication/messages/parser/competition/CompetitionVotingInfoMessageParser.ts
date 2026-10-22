import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CompetitionVotingInfoMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.competition::CompetitionVotingInfoMessageParser'); }

    declare private _goalId: number;
    static { (this.prototype as any)._goalId = 0; }

    declare private _goalCode: string;

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    declare private _SafeStr_6371: number;
    static { (this.prototype as any)._SafeStr_6371 = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._goalId = param1.readInteger();
        this._goalCode = param1.readString();
        this._resultCode = param1.readInteger();
        this._SafeStr_6371 = param1.readInteger();
        return true;
    }

    public get goalId(): number {
        return this._goalId;
    }

    public get goalCode(): string {
        return this._goalCode;
    }

    public get isVotingAllowedForUser(): boolean {
        return this._resultCode == 0;
    }

    public get votesRemaining(): number {
        return this._SafeStr_6371;
    }

    public get resultCode(): number {
        return this._resultCode;
    }
}
