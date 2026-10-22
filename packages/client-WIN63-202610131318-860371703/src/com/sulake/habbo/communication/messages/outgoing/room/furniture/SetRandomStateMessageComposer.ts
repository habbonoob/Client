import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SetRandomStateMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::SetRandomStateMessageComposer'); }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    private _SafeStr_2147: number = 0;

    constructor(param1: number, param2: number = 0) {
        this._objectId = param1;
        this._SafeStr_2147 = param2;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._objectId, this._SafeStr_2147];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
