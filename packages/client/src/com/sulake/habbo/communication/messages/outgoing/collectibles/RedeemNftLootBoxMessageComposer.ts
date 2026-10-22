import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RedeemNftLootBoxMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.collectibles::RedeemNftLootBoxMessageComposer'); }

    constructor(param1: number) {
        this._array.push(param1);
    }

    private _array: any[] = [];

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
