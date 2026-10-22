import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ModerationCautionParser } from '@/com/sulake/habbo/communication/messages/parser/moderation/ModerationCautionParser';

export class ModeratorCautionEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ModeratorCautionEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ModerationCautionParser);
    }

    public getParser(): ModerationCautionParser {
        return this._parser instanceof ModerationCautionParser ? this._parser : null;
    }
}
