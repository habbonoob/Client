import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredClickSettingsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents::WiredClickSettingsMessageParser'); }

    declare private _SafeStr_14944: number;
    static { (this.prototype as any)._SafeStr_14944 = 0; }

    declare private _SafeStr_14945: number;
    static { (this.prototype as any)._SafeStr_14945 = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_14944 = 0;
        this._SafeStr_14945 = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_14944 = param1.readInteger();
        this._SafeStr_14945 = param1.readInteger();
        return true;
    }

    public get userOption(): number {
        return this._SafeStr_14944;
    }

    public get furniOption(): number {
        return this._SafeStr_14945;
    }
}
