import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2EnterArenaFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2EnterArenaFailedMessageParser';

export class Game2EnterArenaFailedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2EnterArenaFailedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2EnterArenaFailedMessageParser);
    }

    public getParser(): Game2EnterArenaFailedMessageParser {
        return this._parser instanceof Game2EnterArenaFailedMessageParser ? this._parser : null;
    }
}
