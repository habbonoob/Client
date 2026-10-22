import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BlockListMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/BlockListMessageParser';

export class BlockListMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::BlockListMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BlockListMessageParser);
    }

    public get blockedUserIds(): any[] {
        return (this._parser instanceof BlockListMessageParser ? this._parser : null).blockedUsers;
    }
}
