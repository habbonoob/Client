import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2StartingGameFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2StartingGameFailedMessageParser';

export class Game2StartingGameFailedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2StartingGameFailedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2StartingGameFailedMessageParser);
    }

    public getParser(): Game2StartingGameFailedMessageParser {
        return this._parser instanceof Game2StartingGameFailedMessageParser ? this._parser : null;
    }
}
