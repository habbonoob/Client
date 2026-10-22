import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetSupplementedNotificationParser } from '@/com/sulake/habbo/communication/messages/parser/users/PetSupplementedNotificationParser';

export class PetSupplementedNotificationEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::PetSupplementedNotificationEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetSupplementedNotificationParser);
    }

    public getParser(): PetSupplementedNotificationParser {
        return this._parser instanceof PetSupplementedNotificationParser ? this._parser : null;
    }
}
