import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class TalentTrackRewardPerk {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.talent::TalentTrackRewardPerk'); }

    declare private _perkId: string;

    constructor(param1: IMessageDataWrapper) {
        this._perkId = param1.readString();
    }

    public get perkId(): string {
        return this._perkId;
    }
}
