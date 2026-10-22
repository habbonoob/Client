import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ExpressionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/ExpressionMessageParser';

export class ExpressionMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.action::ExpressionMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ExpressionMessageParser);
    }

    public getParser(): ExpressionMessageParser {
        return this._parser instanceof ExpressionMessageParser ? this._parser : null;
    }
}
