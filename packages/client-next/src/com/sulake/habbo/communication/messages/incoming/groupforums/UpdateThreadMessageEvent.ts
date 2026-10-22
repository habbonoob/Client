import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UpdateThreadMessageParser } from '@/com/sulake/habbo/communication/messages/parser/groupforums/UpdateThreadMessageParser';

export class UpdateThreadMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.groupforums::UpdateThreadMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UpdateThreadMessageParser);
    }

    public getParser(): UpdateThreadMessageParser {
        return this._parser instanceof UpdateThreadMessageParser ? this._parser : null;
    }
}
