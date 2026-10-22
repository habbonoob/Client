import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { OfficialSongIdMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/OfficialSongIdMessageParser';

export class OfficialSongIdMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.sound::OfficialSongIdMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, OfficialSongIdMessageParser);
    }

    public getParser(): OfficialSongIdMessageParser {
        return this._parser instanceof OfficialSongIdMessageParser ? this._parser : null;
    }
}
