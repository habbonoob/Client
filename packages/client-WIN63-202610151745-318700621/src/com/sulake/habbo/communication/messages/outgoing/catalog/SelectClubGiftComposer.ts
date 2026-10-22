import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SelectClubGiftComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.catalog::SelectClubGiftComposer'); }

    declare private _productCode: string;

    constructor(param1: string) {
        this._productCode = param1;
    }

    public getMessageArray(): any[] {
        return [this._productCode];
    }

    public dispose(): void {
        this._productCode = null;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
