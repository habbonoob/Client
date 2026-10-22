import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2GameChatFromPlayerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2GameChatFromPlayerMessageParser';

export class Game2GameChatFromPlayerMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2GameChatFromPlayerMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2GameChatFromPlayerMessageParser);
    }

    public getParser(): Game2GameChatFromPlayerMessageParser {
        return this._parser instanceof Game2GameChatFromPlayerMessageParser ? this._parser : null;
    }
}
