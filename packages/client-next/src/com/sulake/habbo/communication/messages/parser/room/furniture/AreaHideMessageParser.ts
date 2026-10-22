import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AreaHideMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/AreaHideMessageData';

export class AreaHideMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.furniture::AreaHideMessageParser'); }

    declare private _areaHideMessageData: AreaHideMessageData;

    constructor() {
    }

    public flush(): boolean {
        this._areaHideMessageData = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._areaHideMessageData = new AreaHideMessageData(param1);
        return true;
    }

    public get areaHideMessageData(): AreaHideMessageData {
        return this._areaHideMessageData;
    }
}
