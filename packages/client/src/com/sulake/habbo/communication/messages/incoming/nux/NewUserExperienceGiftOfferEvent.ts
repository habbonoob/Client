import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NewUserExperienceGiftOfferParser } from '@/com/sulake/habbo/communication/messages/parser/nux/NewUserExperienceGiftOfferParser';

export class NewUserExperienceGiftOfferEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.nux::NewUserExperienceGiftOfferEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NewUserExperienceGiftOfferParser);
    }

    public getParser(): NewUserExperienceGiftOfferParser {
        return this._parser instanceof NewUserExperienceGiftOfferParser ? this._parser : null;
    }
}
