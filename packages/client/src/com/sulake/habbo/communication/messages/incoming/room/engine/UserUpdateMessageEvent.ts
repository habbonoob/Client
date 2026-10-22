import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UserUpdateMessageParser';

export class UserUpdateMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::UserUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserUpdateMessageParser);
    }

    public getParser(): UserUpdateMessageParser {
        return this._parser instanceof UserUpdateMessageParser ? this._parser : null;
    }
}
