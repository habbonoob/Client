import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6025 } from '@/com/sulake/habbo/communication/messages/parser/moderation/_SafeCls_6025';

export class ModeratorCautionEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::ModeratorCautionEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6025);
    }

    public getParser(): _SafeCls_6025 {
        return this._parser instanceof _SafeCls_6025 ? this._parser : null;
    }
}
