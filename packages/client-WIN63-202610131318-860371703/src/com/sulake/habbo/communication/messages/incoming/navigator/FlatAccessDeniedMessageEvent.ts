import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FlatAccessDeniedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FlatAccessDeniedMessageParser';

export class FlatAccessDeniedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::FlatAccessDeniedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FlatAccessDeniedMessageParser);
    }

    public getParser(): FlatAccessDeniedMessageParser {
        return this._parser instanceof FlatAccessDeniedMessageParser ? this._parser : null;
    }
}
