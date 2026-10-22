import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PurchaseFromCatalogComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::PurchaseFromCatalogComposer'); }

    constructor(param1: number, param2: number, param3: string, param4: number) {
        this._data.push(param1);
        this._data.push(param2);
        this._data.push(param3);
        this._data.push(param4);
    }

    private _data: any[] = [];

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
