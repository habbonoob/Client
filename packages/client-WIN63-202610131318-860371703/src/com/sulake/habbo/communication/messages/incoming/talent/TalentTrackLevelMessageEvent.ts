import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TalentTrackLevelMessageParser } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackLevelMessageParser';

export class TalentTrackLevelMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.talent::TalentTrackLevelMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TalentTrackLevelMessageParser);
    }

    public getParser(): TalentTrackLevelMessageParser {
        return this._parser instanceof TalentTrackLevelMessageParser ? this._parser : null;
    }
}
