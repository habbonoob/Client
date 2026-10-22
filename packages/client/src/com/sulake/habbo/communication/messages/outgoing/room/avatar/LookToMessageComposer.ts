import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class LookToMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.avatar::LookToMessageComposer'); }

    constructor(param1: number, param2: number) {
        this._locX = param1;
        this._SafeStr_6706 = param2;
    }

    declare private _locX: number;
    static { (this.prototype as any)._locX = 0; }

    declare private _SafeStr_6706: number;
    static { (this.prototype as any)._SafeStr_6706 = 0; }

    public getMessageArray(): any[] {
        return [this._locX, this._SafeStr_6706];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
