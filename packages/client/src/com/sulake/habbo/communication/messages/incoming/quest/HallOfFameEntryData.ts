import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { ILandingPageUserEntry } from '@/com/sulake/habbo/communication/messages/incoming/quest/ILandingPageUserEntry';

export class HallOfFameEntryData implements ILandingPageUserEntry {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::HallOfFameEntryData'); }

    constructor(param1: IMessageDataWrapper) {
        this._userId = param1.readInteger();
        this._userName = param1.readString();
        this._figure = param1.readString();
        this._rank = param1.readInteger();
        this._currentScore = param1.readInteger();
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _figure: string;

    declare private _rank: number;
    static { (this.prototype as any)._rank = 0; }

    declare private _currentScore: number;
    static { (this.prototype as any)._currentScore = 0; }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public get userId(): number {
        return this._userId;
    }

    public get figure(): string {
        return this._figure;
    }

    public get rank(): number {
        return this._rank;
    }

    public get currentScore(): number {
        return this._currentScore;
    }
}
