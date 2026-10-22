import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ShowEnforceRoomCategoryDialogParser } from '@/com/sulake/habbo/communication/messages/parser/roomsettings/ShowEnforceRoomCategoryDialogParser';

export class ShowEnforceRoomCategoryDialogEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::ShowEnforceRoomCategoryDialogEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ShowEnforceRoomCategoryDialogParser);
    }

    public getParser(): ShowEnforceRoomCategoryDialogParser {
        return this._parser instanceof ShowEnforceRoomCategoryDialogParser ? this._parser : null;
    }
}
