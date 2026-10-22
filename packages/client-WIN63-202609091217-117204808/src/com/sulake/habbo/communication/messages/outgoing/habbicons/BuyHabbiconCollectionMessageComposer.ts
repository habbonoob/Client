import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class BuyHabbiconCollectionMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.habbicons::BuyHabbiconCollectionMessageComposer'); }

    declare private _collectionId: number;
    static { (this.prototype as any)._collectionId = 0; }

    constructor(param1: number) {
        this._collectionId = param1;
    }

    public getMessageArray(): any[] {
        return [this._collectionId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
