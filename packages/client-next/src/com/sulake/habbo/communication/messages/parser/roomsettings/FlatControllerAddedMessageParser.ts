import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { FlatControllerData } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/FlatControllerData';

export class FlatControllerAddedMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.roomsettings::FlatControllerAddedMessageParser'); }

    declare private _flatId: number;
    static { (this.prototype as any)._flatId = 0; }

    declare private _data: FlatControllerData;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._flatId = param1.readInteger();
        this._data = new FlatControllerData(param1);
        return true;
    }

    public get flatId(): number {
        return this._flatId;
    }

    public get data(): FlatControllerData {
        return this._data;
    }
}
