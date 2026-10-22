import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class UnfavoriteHabbiconMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.habbicons::UnfavoriteHabbiconMessageComposer'); }

    declare private _SafeStr_14064: number;
    static { (this.prototype as any)._SafeStr_14064 = 0; }

    constructor(param1: number) {
        this._SafeStr_14064 = param1;
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_14064];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
