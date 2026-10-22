import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FullGameStatusData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/FullGameStatusData';

export class Game2FullGameStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.ingame::Game2FullGameStatusMessageParser'); }

    declare private _fullStatus: FullGameStatusData;

    constructor() {
    }

    public get fullStatus(): FullGameStatusData {
        return this._fullStatus;
    }

    public flush(): boolean {
        return false;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._fullStatus = new FullGameStatusData(param1);
        return true;
    }
}
