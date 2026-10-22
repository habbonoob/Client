import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2UserLeftGameMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2UserLeftGameMessageParser';

export class Game2UserLeftGameMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2UserLeftGameMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2UserLeftGameMessageParser);
    }

    public getParser(): Game2UserLeftGameMessageParser {
        return this._parser instanceof Game2UserLeftGameMessageParser ? this._parser : null;
    }
}
