import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetItemDataMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::GetItemDataMessageComposer'); }

    private _objectId: number = 0;

    constructor(param1: number) {
        this._objectId = param1;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._objectId];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
