import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2UserJoinedGameMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2UserJoinedGameMessageParser';

export class Game2UserJoinedGameMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2UserJoinedGameMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2UserJoinedGameMessageParser);
    }

    public getParser(): Game2UserJoinedGameMessageParser {
        return this._parser instanceof Game2UserJoinedGameMessageParser ? this._parser : null;
    }
}
