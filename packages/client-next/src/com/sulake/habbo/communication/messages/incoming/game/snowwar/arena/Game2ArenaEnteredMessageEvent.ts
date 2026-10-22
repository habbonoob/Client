import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2ArenaEnteredMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2ArenaEnteredMessageParser';

export class Game2ArenaEnteredMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2ArenaEnteredMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2ArenaEnteredMessageParser);
    }

    public getParser(): Game2ArenaEnteredMessageParser {
        return this._parser instanceof Game2ArenaEnteredMessageParser ? this._parser : null;
    }
}
