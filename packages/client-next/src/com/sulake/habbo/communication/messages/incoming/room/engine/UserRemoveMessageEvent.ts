import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserRemoveMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UserRemoveMessageParser';

export class UserRemoveMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::UserRemoveMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserRemoveMessageParser);
    }

    public getParser(): UserRemoveMessageParser {
        return this._parser instanceof UserRemoveMessageParser ? this._parser : null;
    }
}
