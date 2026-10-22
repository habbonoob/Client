import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PlayListSongAddedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/PlayListSongAddedMessageParser';

export class PlayListSongAddedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.sound::PlayListSongAddedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PlayListSongAddedMessageParser);
    }

    public getParser(): PlayListSongAddedMessageParser {
        return this._parser instanceof PlayListSongAddedMessageParser ? this._parser : null;
    }
}
