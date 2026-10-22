import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomRatingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/RoomRatingMessageParser';

export class RoomRatingEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomRatingEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomRatingMessageParser);
    }

    public getParser(): RoomRatingMessageParser {
        return this._parser instanceof RoomRatingMessageParser ? this._parser : null;
    }
}
