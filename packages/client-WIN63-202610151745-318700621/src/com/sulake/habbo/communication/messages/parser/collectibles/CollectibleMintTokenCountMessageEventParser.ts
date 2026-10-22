import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CollectibleMintTokenCountMessageEventParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.collectibles::CollectibleMintTokenCountMessageEventParser'); }

    private _totalTokens: number = 0;

    constructor() {
    }

    public flush(): boolean {
        this._totalTokens = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._totalTokens = param1.readInteger();
        return true;
    }

    public get totalTokens(): number {
        return this._totalTokens;
    }
}
