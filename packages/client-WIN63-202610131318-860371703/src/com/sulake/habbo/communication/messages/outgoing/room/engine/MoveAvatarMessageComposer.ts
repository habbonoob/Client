import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class MoveAvatarMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::MoveAvatarMessageComposer'); }

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    constructor(param1: number, param2: number) {
        this._SafeStr_2126 = param1;
        this._y = param2;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_2126, this._y];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
