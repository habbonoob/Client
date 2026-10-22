import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class UpgradeChestResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.chests::UpgradeChestResultMessageParser'); }

    public static readonly SUCCESS: number = 0;

    declare private _chestId: number;
    static { (this.prototype as any)._chestId = 0; }

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._chestId = 0;
        this._resultCode = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._chestId = param1.readInteger();
        this._resultCode = param1.readInteger();
        return true;
    }

    public get chestId(): number {
        return this._chestId;
    }

    public get resultCode(): number {
        return this._resultCode;
    }
}
