import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { JukeboxSongDisksMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/JukeboxSongDisksMessageParser';

export class JukeboxSongDisksMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.sound::JukeboxSongDisksMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, JukeboxSongDisksMessageParser);
    }

    public getParser(): JukeboxSongDisksMessageParser {
        return this._parser instanceof JukeboxSongDisksMessageParser ? this._parser : null;
    }
}
