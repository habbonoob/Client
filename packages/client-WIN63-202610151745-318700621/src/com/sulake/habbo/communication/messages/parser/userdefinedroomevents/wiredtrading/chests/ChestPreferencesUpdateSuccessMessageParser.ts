import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ChestPreferencesUpdateSuccessMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredtrading.chests::ChestPreferencesUpdateSuccessMessageParser'); }

    declare private _chestId: number;
    static { (this.prototype as any)._chestId = 0; }

    declare private _isNotificationPreferences: boolean;
    static { (this.prototype as any)._isNotificationPreferences = false; }

    constructor() {
    }

    public flush(): boolean {
        this._chestId = 0;
        this._isNotificationPreferences = false;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._chestId = param1.readInteger();
        this._isNotificationPreferences = param1.readBoolean();
        return true;
    }

    public get chestId(): number {
        return this._chestId;
    }

    public get isNotificationPreferences(): boolean {
        return this._isNotificationPreferences;
    }
}
