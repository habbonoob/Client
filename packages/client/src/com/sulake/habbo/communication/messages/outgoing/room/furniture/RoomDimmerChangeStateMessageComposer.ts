import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RoomDimmerChangeStateMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.furniture::RoomDimmerChangeStateMessageComposer'); }

    constructor(param1: number) {
        this._objectId = param1;
    }

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    public getMessageArray(): any[] {
        return [this._objectId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
