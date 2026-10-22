import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PurchaseFromCatalogAsGiftComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::PurchaseFromCatalogAsGiftComposer'); }

    private _data: any[] = [];

    constructor(param1: number, param2: number, param3: string, param4: string, param5: string, param6: number, param7: number, param8: number, param9: boolean) {
        this._data.push(param1);
        this._data.push(param2);
        this._data.push(param3);
        this._data.push(param4);
        this._data.push(param5);
        this._data.push(param6);
        this._data.push(param7);
        this._data.push(param8);
        this._data.push(param9);
    }

    public dispose(): void {
        this._data = [];
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
