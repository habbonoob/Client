import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class TradeSilverSetParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.trading::TradeSilverSetParser'); }

    declare private _playerSilver: number;
    static { (this.prototype as any)._playerSilver = 0; }

    declare private _otherPlayerSilver: number;
    static { (this.prototype as any)._otherPlayerSilver = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._playerSilver = -1;
        this._otherPlayerSilver = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._playerSilver = param1.readInteger();
        this._otherPlayerSilver = param1.readInteger();
        return true;
    }

    public get playerSilver(): number {
        return this._playerSilver;
    }

    public get otherPlayerSilver(): number {
        return this._otherPlayerSilver;
    }
}
