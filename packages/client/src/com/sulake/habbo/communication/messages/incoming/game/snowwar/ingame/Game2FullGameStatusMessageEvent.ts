import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2FullGameStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/ingame/Game2FullGameStatusMessageParser';

export class Game2FullGameStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.ingame::Game2FullGameStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2FullGameStatusMessageParser);
    }

    public getParser(): Game2FullGameStatusMessageParser {
        return this._parser instanceof Game2FullGameStatusMessageParser ? this._parser : null;
    }
}
