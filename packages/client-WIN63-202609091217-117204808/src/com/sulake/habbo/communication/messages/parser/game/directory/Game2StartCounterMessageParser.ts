import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2StartCounterMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.directory::Game2StartCounterMessageParser'); }

    declare private _countDownLength: number;
    static { (this.prototype as any)._countDownLength = 0; }

    constructor() {
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._countDownLength = param1.readInteger();
        return true;
    }

    public get countDownLength(): number {
        return this._countDownLength;
    }
}
