import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class UnmuteUserMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.action::UnmuteUserMessageComposer'); }

    constructor(param1: number, param2: number = 0) {
        this._userId = param1;
        this._roomId = param2;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    private _roomId: number = 0;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._userId, this._roomId];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
