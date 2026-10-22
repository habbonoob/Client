import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2AccountGameStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2AccountGameStatusMessageParser';

export class Game2AccountGameStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2AccountGameStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2AccountGameStatusMessageParser);
    }

    public getParser(): Game2AccountGameStatusMessageParser {
        return this._parser instanceof Game2AccountGameStatusMessageParser ? this._parser : null;
    }
}
