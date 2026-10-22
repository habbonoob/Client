import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetDirectClubBuyAvailableComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::GetDirectClubBuyAvailableComposer'); }

    declare private _SafeStr_14171: number;
    static { (this.prototype as any)._SafeStr_14171 = 0; }

    constructor(param1: number) {
        this._SafeStr_14171 = param1;
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_14171];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
