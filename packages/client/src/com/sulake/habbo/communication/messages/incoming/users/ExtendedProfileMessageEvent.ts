import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ExtendedProfileData } from '@/com/sulake/habbo/communication/messages/incoming/users/ExtendedProfileData';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ExtendedProfileMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/ExtendedProfileMessageParser';

export class ExtendedProfileMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::ExtendedProfileMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ExtendedProfileMessageParser);
    }

    public get data(): ExtendedProfileData {
        return castTo(this._parser, ExtendedProfileMessageParser).data;
    }
}
