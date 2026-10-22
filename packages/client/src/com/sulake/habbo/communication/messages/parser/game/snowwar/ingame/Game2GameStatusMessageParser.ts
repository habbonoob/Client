import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { GameStatusData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameStatusData';

export class Game2GameStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.ingame::Game2GameStatusMessageParser'); }

    constructor() {
    }

    declare private _status: GameStatusData;

    public get status(): GameStatusData {
        return this._status;
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._status = new GameStatusData(param1);
        return true;
    }
}
