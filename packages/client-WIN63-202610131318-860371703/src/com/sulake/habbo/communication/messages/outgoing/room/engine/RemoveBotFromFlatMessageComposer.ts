import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class RemoveBotFromFlatMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.room.engine::RemoveBotFromFlatMessageComposer'); }

    declare private _botId: number;
    static { (this.prototype as any)._botId = 0; }

    constructor(param1: number) {
        this._botId = param1;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._botId];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
