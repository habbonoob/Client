import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { YouArePlayingGameMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/YouArePlayingGameMessageParser';

export class YouArePlayingGameMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::YouArePlayingGameMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, YouArePlayingGameMessageParser);
    }

    public getParser(): YouArePlayingGameMessageParser {
        return this._parser instanceof YouArePlayingGameMessageParser ? this._parser : null;
    }
}
