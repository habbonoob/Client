import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SignMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.avatar::SignMessageComposer'); }

    constructor(param1: number) {
        this._SafeStr_7258 = param1;
    }

    declare private _SafeStr_7258: number;
    static { (this.prototype as any)._SafeStr_7258 = 0; }

    public getMessageArray(): any[] {
        return [this._SafeStr_7258];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
