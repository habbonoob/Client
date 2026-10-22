import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NftCollectionsScoreMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::NftCollectionsScoreMessageEventParser'); }

    constructor() {
    }

    declare private _score: number;
    static { (this.prototype as any)._score = 0; }

    declare private _highestScore: number;
    static { (this.prototype as any)._highestScore = 0; }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    public get score(): number {
        return this._score;
    }

    public get highestScore(): number {
        return this._highestScore;
    }

    public get level(): number {
        return this._level;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._score = param1.readInteger();
        this._highestScore = param1.readInteger();
        this._level = param1.readInteger();
        return true;
    }
}
