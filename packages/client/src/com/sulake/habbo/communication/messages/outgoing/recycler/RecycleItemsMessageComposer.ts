import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RecycleItemsMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.recycler::RecycleItemsMessageComposer'); }

    constructor(param1: any[]) {
        this._SafeStr_4102 = [];
        this._SafeStr_4102.push(param1.length);
        this._SafeStr_4102 = this._SafeStr_4102.concat(param1);
    }

    declare private _SafeStr_4102: any[];

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return this._SafeStr_4102;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
