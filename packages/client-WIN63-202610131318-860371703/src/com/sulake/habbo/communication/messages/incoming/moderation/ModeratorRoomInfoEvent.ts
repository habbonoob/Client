import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ModeratorRoomInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModeratorRoomInfoMessageParser';

export class ModeratorRoomInfoEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ModeratorRoomInfoEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ModeratorRoomInfoMessageParser);
    }

    public getParser(): ModeratorRoomInfoMessageParser {
        return this._parser instanceof ModeratorRoomInfoMessageParser ? this._parser : null;
    }
}
