import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomAdErrorMessageParser } from '@/com/sulake/habbo/communication/messages/parser/advertisement/RoomAdErrorMessageParser';

export class RoomAdErrorEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.advertisement::RoomAdErrorEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomAdErrorMessageParser);
    }

    public getParser(): RoomAdErrorMessageParser {
        return this._parser instanceof RoomAdErrorMessageParser ? this._parser : null;
    }
}
