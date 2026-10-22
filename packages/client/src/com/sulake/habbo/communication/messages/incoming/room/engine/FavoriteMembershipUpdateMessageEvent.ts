import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FavouriteMembershipUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/FavouriteMembershipUpdateMessageParser';

export class FavoriteMembershipUpdateMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::FavoriteMembershipUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FavouriteMembershipUpdateMessageParser);
    }

    public getParser(): FavouriteMembershipUpdateMessageParser {
        return this._parser instanceof FavouriteMembershipUpdateMessageParser ? this._parser : null;
    }
}
