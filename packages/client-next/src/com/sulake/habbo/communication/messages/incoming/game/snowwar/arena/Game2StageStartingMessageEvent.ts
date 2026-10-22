import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2StageStartingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageStartingMessageParser';

export class Game2StageStartingMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2StageStartingMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2StageStartingMessageParser);
    }

    public getParser(): Game2StageStartingMessageParser {
        return this._parser instanceof Game2StageStartingMessageParser ? this._parser : null;
    }
}
