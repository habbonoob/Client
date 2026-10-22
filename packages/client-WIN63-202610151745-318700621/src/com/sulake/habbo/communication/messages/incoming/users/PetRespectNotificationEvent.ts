import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetRespectNotificationParser } from '@/com/sulake/habbo/communication/messages/parser/users/PetRespectNotificationParser';

export class PetRespectNotificationEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::PetRespectNotificationEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetRespectNotificationParser);
    }

    public getParser(): PetRespectNotificationParser {
        return this._parser instanceof PetRespectNotificationParser ? this._parser : null;
    }
}
