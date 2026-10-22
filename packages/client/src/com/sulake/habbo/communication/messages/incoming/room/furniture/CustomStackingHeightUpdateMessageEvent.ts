import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CustomStackingHeightUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/CustomStackingHeightUpdateMessageParser';

export class CustomStackingHeightUpdateMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::CustomStackingHeightUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CustomStackingHeightUpdateMessageParser);
    }

    public getParser(): CustomStackingHeightUpdateMessageParser {
        return this._parser instanceof CustomStackingHeightUpdateMessageParser ? this._parser : null;
    }
}
