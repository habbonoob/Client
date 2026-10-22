import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6130 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6130';

export class WiredUserVisualizationStateEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredUserVisualizationStateEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6130);
    }

    public getParser(): _SafeCls_6130 {
        return this._parser instanceof _SafeCls_6130 ? this._parser : null;
    }
}
