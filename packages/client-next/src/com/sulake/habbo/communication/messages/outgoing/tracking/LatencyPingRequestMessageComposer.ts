import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class LatencyPingRequestMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.tracking::LatencyPingRequestMessageComposer'); }

    private _id: number = 0;

    constructor(param1: number) {
        this._id = param1;
    }

    public getMessageArray(): any[] {
        return [this._id];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
