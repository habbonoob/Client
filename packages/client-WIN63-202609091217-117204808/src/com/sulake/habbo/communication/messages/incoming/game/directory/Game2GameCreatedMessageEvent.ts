import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2GameCreatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2GameCreatedMessageParser';

export class Game2GameCreatedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2GameCreatedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2GameCreatedMessageParser);
    }

    public getParser(): Game2GameCreatedMessageParser {
        return this._parser instanceof Game2GameCreatedMessageParser ? this._parser : null;
    }
}
