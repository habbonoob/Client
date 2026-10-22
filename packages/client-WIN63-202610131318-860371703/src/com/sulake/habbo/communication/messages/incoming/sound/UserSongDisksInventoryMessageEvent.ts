import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserSongDisksInventoryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/sound/UserSongDisksInventoryMessageParser';

export class UserSongDisksInventoryMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.sound::UserSongDisksInventoryMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserSongDisksInventoryMessageParser);
    }

    public getParser(): UserSongDisksInventoryMessageParser {
        return this._parser instanceof UserSongDisksInventoryMessageParser ? this._parser : null;
    }
}
