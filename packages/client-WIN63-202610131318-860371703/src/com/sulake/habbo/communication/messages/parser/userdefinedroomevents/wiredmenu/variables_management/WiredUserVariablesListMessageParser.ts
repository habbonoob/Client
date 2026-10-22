import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredUserVariablesPage } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/variables_management/WiredUserVariablesPage';

export class WiredUserVariablesListMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.variables_management::WiredUserVariablesListMessageParser'); }

    declare private _page: WiredUserVariablesPage;

    constructor() {
    }

    public flush(): boolean {
        this._page = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._page = new WiredUserVariablesPage(param1);
        return true;
    }

    public get page(): WiredUserVariablesPage {
        return this._page;
    }
}
