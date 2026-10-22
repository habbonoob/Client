import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class AmbassadorAlertMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.action::AmbassadorAlertMessageComposer'); }

    constructor(param1: number) {
        this._userId = param1;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    public getMessageArray(): any[] {
        return [this._userId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
