import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IsFirstLoginOfDayParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/IsFirstLoginOfDayParser';

export class IsFirstLoginOfDayEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::IsFirstLoginOfDayEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IsFirstLoginOfDayParser);
    }

    public getParser(): IsFirstLoginOfDayParser {
        return this._parser instanceof IsFirstLoginOfDayParser ? this._parser : null;
    }
}
