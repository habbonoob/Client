import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { JukeboxPlayListFullMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/JukeboxPlayListFullMessageParser';

export class JukeboxPlayListFullMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.sound::JukeboxPlayListFullMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, JukeboxPlayListFullMessageParser);
    }

    public getParser(): JukeboxPlayListFullMessageParser {
        return this._parser instanceof JukeboxPlayListFullMessageParser ? this._parser : null;
    }
}
