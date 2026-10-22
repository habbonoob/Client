import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class LatencyPingReportMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.tracking::LatencyPingReportMessageComposer'); }

    constructor(param1: number, param2: number, param3: number) {
        this._SafeStr_6020 = param1;
        this._SafeStr_6433 = param2;
        this._SafeStr_6793 = param3;
    }

    declare private _SafeStr_6020: number;
    static { (this.prototype as any)._SafeStr_6020 = 0; }

    declare private _SafeStr_6433: number;
    static { (this.prototype as any)._SafeStr_6433 = 0; }

    declare private _SafeStr_6793: number;
    static { (this.prototype as any)._SafeStr_6793 = 0; }

    public getMessageArray(): any[] {
        return [this._SafeStr_6020, this._SafeStr_6433, this._SafeStr_6793];
    }

    public dispose(): void {
    }

    get [IMessageComposer](): true {
        return true;
    }
}
