import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RemoveItemFromTradeComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.inventory.trading::RemoveItemFromTradeComposer'); }

    declare private _SafeStr_6112: number;
    static { (this.prototype as any)._SafeStr_6112 = 0; }

    constructor(param1: number) {
        this._SafeStr_6112 = param1;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_6112];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
