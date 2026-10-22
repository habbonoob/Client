import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UsersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UsersMessageParser';

export class UsersMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::UsersMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UsersMessageParser);
    }

    public getParser(): UsersMessageParser {
        return this._parser instanceof UsersMessageParser ? this._parser : null;
    }
}
