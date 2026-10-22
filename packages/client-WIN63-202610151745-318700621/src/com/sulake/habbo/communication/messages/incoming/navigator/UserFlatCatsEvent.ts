import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserFlatCatsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/UserFlatCatsMessageParser';

export class UserFlatCatsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::UserFlatCatsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserFlatCatsMessageParser);
    }

    public getParser(): UserFlatCatsMessageParser {
        return this._parser instanceof UserFlatCatsMessageParser ? this._parser : null;
    }
}
