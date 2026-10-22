import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { YouAreNotSpectatorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/YouAreNotSpectatorMessageParser';

export class YouAreNotSpectatorMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::YouAreNotSpectatorMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, YouAreNotSpectatorMessageParser);
    }

    public getParser(): YouAreNotSpectatorMessageParser {
        return this._parser instanceof YouAreNotSpectatorMessageParser ? this._parser : null;
    }
}
