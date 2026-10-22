import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PetLevelNotificationParser } from '@/com/sulake/habbo/communication/messages/parser/notifications/PetLevelNotificationParser';

export class PetLevelNotificationEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.notifications::PetLevelNotificationEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PetLevelNotificationParser);
    }

    public getParser(): PetLevelNotificationParser {
        return this._parser instanceof PetLevelNotificationParser ? this._parser : null;
    }
}
