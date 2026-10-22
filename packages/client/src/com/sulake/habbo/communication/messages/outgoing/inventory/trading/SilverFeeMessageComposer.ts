import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SilverFeeMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.inventory.trading::SilverFeeMessageComposer'); }

    constructor(param1: boolean) {
        this._array.push(param1);
    }

    private _array: any[] = [];

    public dispose(): void {
        this._array = null;
    }

    public getMessageArray(): any[] {
        return this._array;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
