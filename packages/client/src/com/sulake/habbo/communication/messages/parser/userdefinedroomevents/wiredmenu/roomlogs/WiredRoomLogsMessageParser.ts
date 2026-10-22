import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { WiredLogPage } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/roomlogs/WiredLogPage';

export class WiredRoomLogsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.userdefinedroomevents.wiredmenu.roomlogs::WiredRoomLogsMessageParser'); }

    constructor() {
    }

    declare private _page: WiredLogPage;

    public get page(): WiredLogPage {
        return this._page;
    }

    public flush(): boolean {
        this._page = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._page = new WiredLogPage(param1);
        return true;
    }
}
