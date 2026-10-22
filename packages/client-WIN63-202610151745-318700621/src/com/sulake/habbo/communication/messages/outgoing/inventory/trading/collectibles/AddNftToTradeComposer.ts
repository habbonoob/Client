import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class AddNftToTradeComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.inventory.trading.collectibles::AddNftToTradeComposer'); }

    private _array: any[] = [];

    constructor(param1: number[]) {
        this._array.push(param1.length);
        for (const _loc2_ of param1 ?? []) {
            this._array.push(_loc2_);
        }
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
