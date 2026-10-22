import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2GameEndingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2GameEndingMessageParser';

export class Game2GameEndingMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2GameEndingMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2GameEndingMessageParser);
    }

    public getParser(): Game2GameEndingMessageParser {
        return this._parser instanceof Game2GameEndingMessageParser ? this._parser : null;
    }
}
