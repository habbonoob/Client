import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { YouAreSpectatorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/YouAreSpectatorMessageParser';

export class YouAreSpectatorMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::YouAreSpectatorMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, YouAreSpectatorMessageParser);
    }

    public getParser(): YouAreSpectatorMessageParser {
        return this._parser instanceof YouAreSpectatorMessageParser ? this._parser : null;
    }
}
