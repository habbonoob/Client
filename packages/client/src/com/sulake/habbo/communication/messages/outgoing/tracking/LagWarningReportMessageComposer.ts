import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class LagWarningReportMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.tracking::LagWarningReportMessageComposer'); }

    constructor(param1: number) {
        this._SafeStr_4005 = param1;
    }

    declare private _SafeStr_4005: number;
    static { (this.prototype as any)._SafeStr_4005 = 0; }

    public getMessageArray(): any[] {
        return [this._SafeStr_4005];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
