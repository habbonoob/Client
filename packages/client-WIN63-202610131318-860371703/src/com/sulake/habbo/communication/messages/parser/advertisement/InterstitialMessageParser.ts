import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class InterstitialMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.advertisement::InterstitialMessageParser'); }

    declare private _canShowInterstitial: boolean;
    static { (this.prototype as any)._canShowInterstitial = false; }

    constructor() {
    }

    public get canShowInterstitial(): boolean {
        return this._canShowInterstitial;
    }

    public flush(): boolean {
        this._canShowInterstitial = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._canShowInterstitial = param1.readBoolean();
        return true;
    }
}
