import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2GameStartedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2GameStartedMessageParser';

export class Game2GameStartedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2GameStartedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2GameStartedMessageParser);
    }

    public getParser(): Game2GameStartedMessageParser {
        return this._parser instanceof Game2GameStartedMessageParser ? this._parser : null;
    }
}
