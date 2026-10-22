import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NewUserExperienceNotCompleteParser } from '@/com/sulake/habbo/communication/messages/parser/nux/NewUserExperienceNotCompleteParser';

export class NewUserExperienceNotCompleteEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.nux::NewUserExperienceNotCompleteEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NewUserExperienceNotCompleteParser);
    }

    public getParser(): NewUserExperienceNotCompleteParser {
        return this._parser instanceof NewUserExperienceNotCompleteParser ? this._parser : null;
    }
}
