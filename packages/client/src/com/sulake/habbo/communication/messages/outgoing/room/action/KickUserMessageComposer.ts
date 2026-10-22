import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class KickUserMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.action::KickUserMessageComposer'); }

    constructor(param1: number) {
        this._userId = param1;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._userId];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
