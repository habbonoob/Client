import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CantConnectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/CantConnectMessageParser';

export class CantConnectMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::CantConnectMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CantConnectMessageParser);
    }

    public getParser(): CantConnectMessageParser {
        return this._parser instanceof CantConnectMessageParser ? this._parser : null;
    }
}
