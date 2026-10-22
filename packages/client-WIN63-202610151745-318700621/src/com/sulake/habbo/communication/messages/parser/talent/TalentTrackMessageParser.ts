import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { TalentTrack } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrack';

export class TalentTrackMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.talent::TalentTrackMessageParser'); }

    declare private _talentTrack: TalentTrack;

    constructor() {
    }

    public flush(): boolean {
        this._talentTrack = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._talentTrack = new TalentTrack();
        this._talentTrack.parse(param1);
        return true;
    }

    public getTalentTrack(): TalentTrack {
        return this._talentTrack;
    }
}
