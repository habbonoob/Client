import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class MoveObjectMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::MoveObjectMessageComposer'); }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    declare private _direction: number;
    static { (this.prototype as any)._direction = 0; }

    constructor(param1: number, param2: number, param3: number, param4: number) {
        this._objectId = param1;
        this._SafeStr_2126 = param2;
        this._y = param3;
        this._direction = param4;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._objectId, this._SafeStr_2126, this._y, this._direction];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
