import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2JoiningGameFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2JoiningGameFailedMessageParser';

export class Game2JoiningGameFailedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2JoiningGameFailedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2JoiningGameFailedMessageParser);
    }

    public getParser(): Game2JoiningGameFailedMessageParser {
        return this._parser instanceof Game2JoiningGameFailedMessageParser ? this._parser : null;
    }
}
