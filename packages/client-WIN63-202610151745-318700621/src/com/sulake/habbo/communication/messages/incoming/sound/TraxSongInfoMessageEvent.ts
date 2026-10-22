import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TraxSongInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/TraxSongInfoMessageParser';

export class TraxSongInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.sound::TraxSongInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TraxSongInfoMessageParser);
    }

    public getParser(): TraxSongInfoMessageParser {
        return this._parser instanceof TraxSongInfoMessageParser ? this._parser : null;
    }
}
