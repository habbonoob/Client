import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ClickCharacterComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room::ClickCharacterComposer'); }

    constructor(param1: number) {
        this._SafeStr_7140 = param1;
    }

    declare private _SafeStr_7140: number;
    static { (this.prototype as any)._SafeStr_7140 = 0; }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_7140];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
