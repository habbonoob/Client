import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetDirectClubBuyAvailableComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::GetDirectClubBuyAvailableComposer'); }

    constructor(param1: number) {
        this._SafeStr_6576 = param1;
    }

    declare private _SafeStr_6576: number;
    static { (this.prototype as any)._SafeStr_6576 = 0; }

    public getMessageArray(): any[] {
        return [this._SafeStr_6576];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
