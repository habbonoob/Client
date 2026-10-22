import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { YouAreOwnerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/permissions/YouAreOwnerMessageParser';

export class YouAreOwnerMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.permissions::YouAreOwnerMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, YouAreOwnerMessageParser);
    }

    public getParser(): YouAreOwnerMessageParser {
        return this._parser instanceof YouAreOwnerMessageParser ? this._parser : null;
    }
}
