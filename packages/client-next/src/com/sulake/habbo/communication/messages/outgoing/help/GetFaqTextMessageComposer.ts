import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class GetFaqTextMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.help::GetFaqTextMessageComposer'); }

    declare private _questionId: number;
    static { (this.prototype as any)._questionId = 0; }

    constructor(param1: number) {
        this._questionId = param1;
    }

    public getMessageArray(): any[] {
        return [this._questionId];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
