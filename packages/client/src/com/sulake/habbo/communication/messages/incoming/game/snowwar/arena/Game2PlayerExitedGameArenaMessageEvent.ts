import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2PlayerExitedGameArenaMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2PlayerExitedGameArenaMessageParser';

export class Game2PlayerExitedGameArenaMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2PlayerExitedGameArenaMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2PlayerExitedGameArenaMessageParser);
    }

    public getParser(): Game2PlayerExitedGameArenaMessageParser {
        return this._parser instanceof Game2PlayerExitedGameArenaMessageParser ? this._parser : null;
    }
}
