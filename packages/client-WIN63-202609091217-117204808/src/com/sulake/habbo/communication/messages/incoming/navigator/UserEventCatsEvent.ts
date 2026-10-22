import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserEventCatsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/UserEventCatsMessageParser';

export class UserEventCatsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::UserEventCatsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserEventCatsMessageParser);
    }

    public getParser(): UserEventCatsMessageParser {
        return this._parser instanceof UserEventCatsMessageParser ? this._parser : null;
    }
}
