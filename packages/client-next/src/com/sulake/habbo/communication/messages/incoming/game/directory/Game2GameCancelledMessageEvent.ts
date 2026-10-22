import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2GameCancelledMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2GameCancelledMessageParser';

export class Game2GameCancelledMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2GameCancelledMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2GameCancelledMessageParser);
    }

    public getParser(): Game2GameCancelledMessageParser {
        return this._parser instanceof Game2GameCancelledMessageParser ? this._parser : null;
    }
}
