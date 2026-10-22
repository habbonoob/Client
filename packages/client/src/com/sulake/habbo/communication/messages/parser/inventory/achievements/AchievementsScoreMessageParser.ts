import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class AchievementsScoreMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.achievements::AchievementsScoreMessageParser'); }

    constructor() {
    }

    declare private _score: number;
    static { (this.prototype as any)._score = 0; }

    public get score(): number {
        return this._score;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._score = param1.readInteger();
        return true;
    }
}
