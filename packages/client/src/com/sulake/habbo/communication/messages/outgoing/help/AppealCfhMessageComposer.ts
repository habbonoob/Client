import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class AppealCfhMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.help::AppealCfhMessageComposer'); }

    constructor(param1: number) {
        this._callId = param1;
    }

    declare private _callId: number;
    static { (this.prototype as any)._callId = 0; }

    public getMessageArray(): any[] {
        return [this._callId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
