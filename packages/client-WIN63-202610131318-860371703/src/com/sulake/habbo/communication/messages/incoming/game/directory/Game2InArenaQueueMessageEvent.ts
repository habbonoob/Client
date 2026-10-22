import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2InArenaQueueMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2InArenaQueueMessageParser';

export class Game2InArenaQueueMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2InArenaQueueMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2InArenaQueueMessageParser);
    }

    public getParser(): Game2InArenaQueueMessageParser {
        return this._parser instanceof Game2InArenaQueueMessageParser ? this._parser : null;
    }
}
