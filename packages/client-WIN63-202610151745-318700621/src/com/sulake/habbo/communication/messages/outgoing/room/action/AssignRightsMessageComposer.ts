import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class AssignRightsMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.action::AssignRightsMessageComposer'); }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    constructor(param1: number) {
        this._userId = param1;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._userId];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
