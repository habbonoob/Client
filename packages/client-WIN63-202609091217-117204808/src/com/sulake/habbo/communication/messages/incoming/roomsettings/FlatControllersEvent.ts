import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FlatControllersMessageParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/FlatControllersMessageParser';

export class FlatControllersEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::FlatControllersEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FlatControllersMessageParser);
    }

    public getParser(): FlatControllersMessageParser {
        return this._parser instanceof FlatControllersMessageParser ? this._parser : null;
    }
}
