import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GuildFurniContextMenuInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/GuildFurniContextMenuInfoMessageParser';

export class GuildFurniContextMenuInfoMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::GuildFurniContextMenuInfoMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GuildFurniContextMenuInfoMessageParser);
    }

    public getParser(): GuildFurniContextMenuInfoMessageParser {
        return this._parser instanceof GuildFurniContextMenuInfoMessageParser ? this._parser : null;
    }
}
