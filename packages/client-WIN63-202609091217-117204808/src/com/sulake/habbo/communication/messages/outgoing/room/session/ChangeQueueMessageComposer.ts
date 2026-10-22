import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class ChangeQueueMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.session::ChangeQueueMessageComposer'); }

    declare private _SafeStr_6688: number;
    static { (this.prototype as any)._SafeStr_6688 = 0; }

    constructor(param1: number) {
        this._SafeStr_6688 = param1;
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_6688];
    }

    public dispose(): void {
    }

    public get disposed(): boolean {
        return true;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
