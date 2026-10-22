import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetRentOrBuyoutOfferMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::GetRentOrBuyoutOfferMessageComposer'); }

    constructor(param1: boolean, param2: string, param3: boolean) {
        this._data = [param1, param2, param3];
    }

    declare private _data: any[];

    public getMessageArray(): any[] {
        return this._data;
    }

    public dispose(): void {
        this._data = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
