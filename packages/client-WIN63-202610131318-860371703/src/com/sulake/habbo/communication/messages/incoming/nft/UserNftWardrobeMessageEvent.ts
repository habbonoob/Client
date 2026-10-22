import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserNftWardrobeMessageParser } from '@/com/sulake/habbo/communication/messages/parser/nft/UserNftWardrobeMessageParser';

export class UserNftWardrobeMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.nft::UserNftWardrobeMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserNftWardrobeMessageParser);
    }

    public getParser(): UserNftWardrobeMessageParser {
        return this._parser instanceof UserNftWardrobeMessageParser ? this._parser : null;
    }
}
