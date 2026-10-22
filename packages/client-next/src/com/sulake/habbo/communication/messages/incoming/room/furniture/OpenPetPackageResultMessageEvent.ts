import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { OpenPetPackageResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/OpenPetPackageResultMessageParser';

export class OpenPetPackageResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::OpenPetPackageResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, OpenPetPackageResultMessageParser);
    }

    public getParser(): OpenPetPackageResultMessageParser {
        return this._parser instanceof OpenPetPackageResultMessageParser ? this._parser : null;
    }
}
