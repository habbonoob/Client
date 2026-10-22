import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FlatCreatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FlatCreatedMessageParser';

export class FlatCreatedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::FlatCreatedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FlatCreatedMessageParser);
    }

    public getParser(): FlatCreatedMessageParser {
        return this._parser instanceof FlatCreatedMessageParser ? this._parser : null;
    }
}
