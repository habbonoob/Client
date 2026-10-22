import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CollectibleMintingEnabledMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectibleMintingEnabledMessageEventParser'); }

    declare private _enabled: boolean;
    static { (this.prototype as any)._enabled = false; }

    constructor() {
    }

    public flush(): boolean {
        this._enabled = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._enabled = param1.readBoolean();
        return true;
    }

    public get enabled(): boolean {
        return this._enabled;
    }
}
