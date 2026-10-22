import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6065 } from '@/com/sulake/habbo/communication/messages/parser/room/engine/_SafeCls_6065';

export class RoomUseHabbiconEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::RoomUseHabbiconEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6065);
    }

    public getParser(): _SafeCls_6065 {
        return this._parser instanceof _SafeCls_6065 ? this._parser : null;
    }
}
