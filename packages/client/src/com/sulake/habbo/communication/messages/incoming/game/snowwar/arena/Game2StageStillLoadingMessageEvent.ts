import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2StageStillLoadingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageStillLoadingMessageParser';

export class Game2StageStillLoadingMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.snowwar.arena::Game2StageStillLoadingMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2StageStillLoadingMessageParser);
    }

    public getParser(): Game2StageStillLoadingMessageParser {
        return this._parser instanceof Game2StageStillLoadingMessageParser ? this._parser : null;
    }
}
