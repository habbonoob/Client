import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RequestRoomPropertySet implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.inventory.furni::RequestRoomPropertySet'); }

    private _SafeStr_6961: number = 0;

    constructor(param1: number) {
        this._SafeStr_6961 = param1;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_6961);
        return _loc1_;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
