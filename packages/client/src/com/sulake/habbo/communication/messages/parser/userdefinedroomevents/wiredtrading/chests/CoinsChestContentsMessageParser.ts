import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class CoinsChestContentsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.chests::CoinsChestContentsMessageParser'); }

    constructor() {
    }

    declare private _SafeStr_3713: number;
    static { (this.prototype as any)._SafeStr_3713 = 0; }

    declare private _isUpdate: boolean;
    static { (this.prototype as any)._isUpdate = false; }

    declare private _chestId: number;
    static { (this.prototype as any)._chestId = 0; }

    public get chestId(): number {
        return this._chestId;
    }

    public get coins(): number {
        return this._SafeStr_3713;
    }

    public get isUpdate(): boolean {
        return this._isUpdate;
    }

    public flush(): boolean {
        this._chestId = 0;
        this._SafeStr_3713 = 0;
        this._isUpdate = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._chestId = param1.readInteger();
        this._SafeStr_3713 = param1.readInteger();
        this._isUpdate = param1.readBoolean();
        return true;
    }
}
