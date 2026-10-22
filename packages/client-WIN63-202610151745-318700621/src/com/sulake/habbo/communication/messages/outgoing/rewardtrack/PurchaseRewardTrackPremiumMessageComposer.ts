import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PurchaseRewardTrackPremiumMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.rewardtrack::PurchaseRewardTrackPremiumMessageComposer'); }

    private _array: any[] = [];

    constructor(param1: string) {
        this._array.push(param1);
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
        this._array = [];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
