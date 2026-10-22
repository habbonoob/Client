import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ChangeEmailResultParser } from '@/com/sulake/habbo/communication/messages/parser/users/ChangeEmailResultParser';

export class ChangeEmailResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::ChangeEmailResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ChangeEmailResultParser);
    }

    public getParser(): ChangeEmailResultParser {
        return this._parser instanceof ChangeEmailResultParser ? this._parser : null;
    }
}
