import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2EnterArenaMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2EnterArenaMessageParser';

export class Game2EnterArenaMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2EnterArenaMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2EnterArenaMessageParser);
    }

    public getParser(): Game2EnterArenaMessageParser {
        return this._parser instanceof Game2EnterArenaMessageParser ? this._parser : null;
    }
}
