import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UserNftWardrobeSelectionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/nft/UserNftWardrobeSelectionMessageParser';

export class UserNftWardrobeSelectionMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.nft::UserNftWardrobeSelectionMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UserNftWardrobeSelectionMessageParser);
    }

    public getParser(): UserNftWardrobeSelectionMessageParser {
        return this._parser instanceof UserNftWardrobeSelectionMessageParser ? this._parser : null;
    }
}
