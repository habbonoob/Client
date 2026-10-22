import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RemoveNftFromTradeComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.inventory.trading.collectibles::RemoveNftFromTradeComposer'); }

    constructor(param1: number) {
        this._assetId = param1;
    }

    declare private _assetId: number;
    static { (this.prototype as any)._assetId = 0; }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._assetId];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
