import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2StageEndingMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2StageEndingMessageParser'); }

    declare private _timeToNextState: number;
    static { (this.prototype as any)._timeToNextState = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._timeToNextState = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._timeToNextState = param1.readInteger();
        return true;
    }

    public get timeToNextState(): number {
        return this._timeToNextState;
    }
}
