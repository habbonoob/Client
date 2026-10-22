import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2GameNotFoundMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2GameNotFoundMessageParser';

export class Game2GameNotFoundMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2GameNotFoundMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2GameNotFoundMessageParser);
    }

    public getParser(): Game2GameNotFoundMessageParser {
        return this._parser instanceof Game2GameNotFoundMessageParser ? this._parser : null;
    }
}
