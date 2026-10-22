import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { YouAreControllerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/permissions/YouAreControllerMessageParser';

export class YouAreControllerMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.permissions::YouAreControllerMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, YouAreControllerMessageParser);
    }

    public getParser(): YouAreControllerMessageParser {
        return this._parser instanceof YouAreControllerMessageParser ? this._parser : null;
    }
}
