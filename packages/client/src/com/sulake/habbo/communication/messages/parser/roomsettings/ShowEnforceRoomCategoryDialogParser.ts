import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ShowEnforceRoomCategoryDialogParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.roomsettings::ShowEnforceRoomCategoryDialogParser'); }

    constructor() {
    }

    declare private _selectionType: number;
    static { (this.prototype as any)._selectionType = 0; }

    public get selectionType(): number {
        return this._selectionType;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._selectionType = param1.readInteger();
        return true;
    }
}
