import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ChangeQueueMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.session::ChangeQueueMessageComposer'); }

    constructor(param1: number) {
        this._SafeStr_6688 = param1;
    }

    declare private _SafeStr_6688: number;
    static { (this.prototype as any)._SafeStr_6688 = 0; }

    public get disposed(): boolean {
        return true;
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_6688];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
