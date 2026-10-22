import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RequestFurniInventoryWhenNotInRoomComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.inventory.furni::RequestFurniInventoryWhenNotInRoomComposer'); }

    constructor() {
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
