import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TalentTrackMessageParser } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackMessageParser';

export class TalentTrackMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.talent::TalentTrackMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TalentTrackMessageParser);
    }

    public getParser(): TalentTrackMessageParser {
        return this._parser instanceof TalentTrackMessageParser ? this._parser : null;
    }
}
