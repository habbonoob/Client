import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomThumbnailUpdateResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/RoomThumbnailUpdateResultMessageParser';

export class RoomThumbnailUpdateResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::RoomThumbnailUpdateResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomThumbnailUpdateResultMessageParser);
    }

    public getParser(): RoomThumbnailUpdateResultMessageParser {
        return this._parser instanceof RoomThumbnailUpdateResultMessageParser ? this._parser : null;
    }
}
