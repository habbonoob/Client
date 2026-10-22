import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { Game2UserBlockedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2UserBlockedMessageParser';

export class Game2UserBlockedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.game.directory::Game2UserBlockedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, Game2UserBlockedMessageParser);
    }

    public getParser(): Game2UserBlockedMessageParser {
        return this._parser instanceof Game2UserBlockedMessageParser ? this._parser : null;
    }
}
