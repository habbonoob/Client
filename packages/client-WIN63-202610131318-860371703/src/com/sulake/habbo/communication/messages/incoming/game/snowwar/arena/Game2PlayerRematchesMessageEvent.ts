import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2PlayerRematchesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2PlayerRematchesMessageParser';

export class Game2PlayerRematchesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2PlayerRematchesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2PlayerRematchesMessageParser);
    }

    public getParser(): Game2PlayerRematchesMessageParser {
        return this._parser instanceof Game2PlayerRematchesMessageParser ? this._parser : null;
    }
}
