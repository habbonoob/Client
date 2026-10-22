import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PurchaseRoomAdMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::PurchaseRoomAdMessageComposer'); }

    constructor(param1: number, param2: number, param3: number, param4: string, param5: boolean, param6: string, param7: number) {
        this._data.push(param1);
        this._data.push(param2);
        this._data.push(param3);
        this._data.push(param4);
        this._data.push(param5);
        this._data.push(param6);
        this._data.push(param7);
    }

    private _data: any[] = [];

    public getMessageArray(): any[] {
        return this._data;
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
