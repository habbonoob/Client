import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2StartCounterMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2StartCounterMessageParser';

export class Game2StartCounterMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2StartCounterMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2StartCounterMessageParser);
    }

    public getParser(): Game2StartCounterMessageParser {
        return this._parser instanceof Game2StartCounterMessageParser ? this._parser : null;
    }
}
