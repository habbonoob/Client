import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PlayListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/PlayListMessageParser';

export class PlayListMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.sound::PlayListMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PlayListMessageParser);
    }

    public getParser(): PlayListMessageParser {
        return this._parser instanceof PlayListMessageParser ? this._parser : null;
    }
}
