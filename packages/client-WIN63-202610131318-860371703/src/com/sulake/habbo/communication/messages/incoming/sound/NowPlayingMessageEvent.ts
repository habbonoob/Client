import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NowPlayingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/NowPlayingMessageParser';

export class NowPlayingMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.sound::NowPlayingMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NowPlayingMessageParser);
    }

    public getParser(): NowPlayingMessageParser {
        return this._parser instanceof NowPlayingMessageParser ? this._parser : null;
    }
}
