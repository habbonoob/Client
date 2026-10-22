import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AreaHideMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/AreaHideMessageParser';

export class AreaHideMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::AreaHideMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AreaHideMessageParser);
    }

    public getParser(): AreaHideMessageParser {
        return this._parser instanceof AreaHideMessageParser ? this._parser : null;
    }
}
