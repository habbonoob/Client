import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { YouAreNotControllerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/permissions/YouAreNotControllerMessageParser';

export class YouAreNotControllerMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.permissions::YouAreNotControllerMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, YouAreNotControllerMessageParser);
    }

    public getParser(): YouAreNotControllerMessageParser {
        return this._parser instanceof YouAreNotControllerMessageParser ? this._parser : null;
    }
}
