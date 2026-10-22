import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NoOwnedRoomsAlertMessageParser } from '@/com/sulake/habbo/communication/messages/parser/competition/NoOwnedRoomsAlertMessageParser';

export class NoOwnedRoomsAlertMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.competition::NoOwnedRoomsAlertMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NoOwnedRoomsAlertMessageParser);
    }

    public getParser(): NoOwnedRoomsAlertMessageParser {
        return this._parser instanceof NoOwnedRoomsAlertMessageParser ? this._parser : null;
    }
}
