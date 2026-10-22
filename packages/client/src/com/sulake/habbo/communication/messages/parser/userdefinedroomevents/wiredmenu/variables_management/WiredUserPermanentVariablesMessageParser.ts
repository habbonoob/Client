import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredUserPermanentVariablesList } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserPermanentVariablesList';

export class WiredUserPermanentVariablesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.variables_management::WiredUserPermanentVariablesMessageParser'); }

    constructor() {
    }

    declare private _SafeStr_2221: WiredUserPermanentVariablesList;

    public get list(): WiredUserPermanentVariablesList {
        return this._SafeStr_2221;
    }

    public flush(): boolean {
        this._SafeStr_2221 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_2221 = new WiredUserPermanentVariablesList(param1);
        return true;
    }
}
