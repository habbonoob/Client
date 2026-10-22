import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { RoomChatSettings } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomChatSettings';
import { RoomModerationSettings } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomModerationSettings';
import { RoomSettingsData } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomSettingsData';

export class RoomSettingsDataMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.roomsettings::RoomSettingsDataMessageParser'); }

    constructor() {
    }

    declare private _data: RoomSettingsData;

    public get data(): RoomSettingsData {
        return this._data;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        this._data = new RoomSettingsData();
        this._data.roomId = param1.readInteger();
        this._data.name = param1.readString();
        this._data.description = param1.readString();
        this._data.doorMode = param1.readInteger();
        this._data.categoryId = param1.readInteger();
        this._data.maximumVisitors = param1.readInteger();
        this._data.maximumVisitorsLimit = param1.readInteger();
        this._data.tags = [];
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._data.tags.push(param1.readString());
            _loc3_++;
        }
        this._data.tradeMode = param1.readInteger();
        this._data.allowPets = param1.readInteger() == 1;
        this._data.allowFoodConsume = param1.readInteger() == 1;
        this._data.allowWalkThrough = param1.readInteger() == 1;
        this._data.hideWalls = param1.readInteger() == 1;
        this._data.wallThickness = param1.readInteger();
        this._data.floorThickness = param1.readInteger();
        this._data.chatSettings = new RoomChatSettings(param1);
        this._data.allowNavigatorDynamicCats = param1.readBoolean();
        this._data.roomModerationSettings = new RoomModerationSettings(param1);
        this._data.hiddenByBc = param1.readBoolean();
        return true;
    }

    public flush(): boolean {
        this._data = null;
        return true;
    }
}
