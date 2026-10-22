import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RoomVisitsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/RoomVisitsMessageParser';

export class RoomVisitsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::RoomVisitsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RoomVisitsMessageParser);
    }

    public getParser(): RoomVisitsMessageParser {
        return this._parser instanceof RoomVisitsMessageParser ? this._parser : null;
    }
}
