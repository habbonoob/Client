import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RelationshipStatusInfoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/RelationshipStatusInfoMessageParser';

export class RelationshipStatusInfoEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::RelationshipStatusInfoEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RelationshipStatusInfoMessageParser);
    }

    public get userId(): number {
        return (this._parser instanceof RelationshipStatusInfoMessageParser ? this._parser : null).userId;
    }

    public get relationshipStatusMap(): UtilsMap {
        return (this._parser instanceof RelationshipStatusInfoMessageParser ? this._parser : null).relationshipStatusMap;
    }
}
