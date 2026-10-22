import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { DoorbellMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/DoorbellMessageParser';

export class DoorbellMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::DoorbellMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, DoorbellMessageParser);
    }

    public get userName(): string {
        return (this._parser instanceof DoorbellMessageParser ? this._parser : null).userName;
    }
}
