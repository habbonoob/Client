import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { OpenPetPackageRequestedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/OpenPetPackageRequestedMessageParser';

export class OpenPetPackageRequestedMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::OpenPetPackageRequestedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, OpenPetPackageRequestedMessageParser);
    }

    public getParser(): OpenPetPackageRequestedMessageParser {
        return this._parser instanceof OpenPetPackageRequestedMessageParser ? this._parser : null;
    }
}
