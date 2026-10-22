import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2StageLoadMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageLoadMessageParser';

export class Game2StageLoadMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2StageLoadMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2StageLoadMessageParser);
    }

    public getParser(): Game2StageLoadMessageParser {
        return this._parser instanceof Game2StageLoadMessageParser ? this._parser : null;
    }
}
