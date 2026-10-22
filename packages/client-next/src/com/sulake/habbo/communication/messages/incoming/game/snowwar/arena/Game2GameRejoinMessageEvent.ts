import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2GameRejoinMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2GameRejoinMessageParser';

export class Game2GameRejoinMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2GameRejoinMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2GameRejoinMessageParser);
    }

    public getParser(): Game2GameRejoinMessageParser {
        return this._parser instanceof Game2GameRejoinMessageParser ? this._parser : null;
    }
}
