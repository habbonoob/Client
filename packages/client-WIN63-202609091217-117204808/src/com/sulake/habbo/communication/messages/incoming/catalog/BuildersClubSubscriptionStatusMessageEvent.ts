import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BuildersClubSubscriptionStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/BuildersClubSubscriptionStatusMessageParser';

export class BuildersClubSubscriptionStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::BuildersClubSubscriptionStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, BuildersClubSubscriptionStatusMessageParser);
    }

    public getParser(): BuildersClubSubscriptionStatusMessageParser {
        return this._parser instanceof BuildersClubSubscriptionStatusMessageParser ? this._parser : null;
    }
}
