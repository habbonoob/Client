import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2StageRunningMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageRunningMessageParser';

export class Game2StageRunningMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2StageRunningMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2StageRunningMessageParser);
    }

    public getParser(): Game2StageRunningMessageParser {
        return this._parser instanceof Game2StageRunningMessageParser ? this._parser : null;
    }
}
