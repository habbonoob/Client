import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { OfficialRoomsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/OfficialRoomsMessageParser';

export class OfficialRoomsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::OfficialRoomsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, OfficialRoomsMessageParser);
    }

    public getParser(): OfficialRoomsMessageParser {
        return this._parser instanceof OfficialRoomsMessageParser ? this._parser : null;
    }
}
