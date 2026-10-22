import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetProductOfferComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::GetProductOfferComposer'); }

    constructor(param1: number) {
        this._offerId = param1;
    }

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    public getMessageArray(): any[] {
        return [this._offerId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
