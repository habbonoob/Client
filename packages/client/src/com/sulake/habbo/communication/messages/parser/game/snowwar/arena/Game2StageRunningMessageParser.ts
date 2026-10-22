import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class Game2StageRunningMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.arena::Game2StageRunningMessageParser'); }

    constructor() {
    }

    declare private _timeToStageEnd: number;
    static { (this.prototype as any)._timeToStageEnd = 0; }

    public get timeToStageEnd(): number {
        return this._timeToStageEnd;
    }

    public flush(): boolean {
        this._timeToStageEnd = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._timeToStageEnd = param1.readInteger();
        return true;
    }
}
