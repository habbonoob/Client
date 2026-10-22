import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredFurniAddonMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/WiredFurniAddonMessageParser';

export class WiredFurniAddonEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredFurniAddonEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredFurniAddonMessageParser);
    }

    public getParser(): WiredFurniAddonMessageParser {
        return this._parser instanceof WiredFurniAddonMessageParser ? this._parser : null;
    }
}
