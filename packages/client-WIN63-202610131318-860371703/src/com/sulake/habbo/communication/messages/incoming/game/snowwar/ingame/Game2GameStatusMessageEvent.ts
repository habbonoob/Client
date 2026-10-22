import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2GameStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/ingame/Game2GameStatusMessageParser';

export class Game2GameStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.ingame::Game2GameStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2GameStatusMessageParser);
    }

    public getParser(): Game2GameStatusMessageParser {
        return this._parser instanceof Game2GameStatusMessageParser ? this._parser : null;
    }
}
