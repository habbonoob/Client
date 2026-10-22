import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class PurchaseBasicMembershipExtensionComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::PurchaseBasicMembershipExtensionComposer'); }

    constructor(param1: number) {
        this._data.push(param1);
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
