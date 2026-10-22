import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class CommunityGoalVoteMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.landingview.votes::CommunityGoalVoteMessageComposer'); }

    declare private _SafeStr_7413: number;
    static { (this.prototype as any)._SafeStr_7413 = 0; }

    constructor(param1: number) {
        this._SafeStr_7413 = param1;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_7413];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
