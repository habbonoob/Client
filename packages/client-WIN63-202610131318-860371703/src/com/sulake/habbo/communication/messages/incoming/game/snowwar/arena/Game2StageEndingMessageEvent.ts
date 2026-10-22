import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2StageEndingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageEndingMessageParser';

export class Game2StageEndingMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2StageEndingMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2StageEndingMessageParser);
    }

    public getParser(): Game2StageEndingMessageParser {
        return this._parser instanceof Game2StageEndingMessageParser ? this._parser : null;
    }
}
