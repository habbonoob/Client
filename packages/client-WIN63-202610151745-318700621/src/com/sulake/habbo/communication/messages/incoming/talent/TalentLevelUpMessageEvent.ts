import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { TalentLevelUpMessageParser } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentLevelUpMessageParser';

export class TalentLevelUpMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.talent::TalentLevelUpMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, TalentLevelUpMessageParser);
    }

    public getParser(): TalentLevelUpMessageParser {
        return this._parser instanceof TalentLevelUpMessageParser ? this._parser : null;
    }
}
