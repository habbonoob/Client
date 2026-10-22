import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class WiredAllVariablesHashMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu::WiredAllVariablesHashMessageParser'); }

    declare private _SafeStr_4921: number;
    static { (this.prototype as any)._SafeStr_4921 = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._SafeStr_4921 = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_4921 = param1.readInteger();
        return true;
    }

    public get allVariablesHash(): number {
        return this._SafeStr_4921;
    }
}
