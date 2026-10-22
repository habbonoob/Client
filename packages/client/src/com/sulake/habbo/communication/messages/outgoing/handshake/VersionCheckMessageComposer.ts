import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class VersionCheckMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::VersionCheckMessageComposer'); }

    constructor(param1: number, param2: string, param3: string) {
        this._SafeStr_7186 = param1;
        this._SafeStr_7068 = param2;
        this._SafeStr_6289 = param3;
    }

    declare private _SafeStr_7186: number;
    static { (this.prototype as any)._SafeStr_7186 = 0; }

    declare private _SafeStr_7068: string;

    declare private _SafeStr_6289: string;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._SafeStr_7186, this._SafeStr_7068, this._SafeStr_6289];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
