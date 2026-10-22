import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import { RoomChatSettings } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomChatSettings';
import { RoomModerationSettings } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomModerationSettings';

export class GetGuestRoomResultMessageParser implements IMessageParser, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.navigator::GetGuestRoomResultMessageParser'); }

    constructor() {
    }

    declare private _enterRoom: boolean;
    static { (this.prototype as any)._enterRoom = false; }

    declare private _roomForward: boolean;
    static { (this.prototype as any)._roomForward = false; }

    declare private _staffPick: boolean;
    static { (this.prototype as any)._staffPick = false; }

    declare private _data: GuestRoomData;

    declare private _isGroupMember: boolean;
    static { (this.prototype as any)._isGroupMember = false; }

    declare private _roomModerationSettings: RoomModerationSettings;

    declare private _chatSettings: RoomChatSettings;

    declare private _openingConnection: boolean;
    static { (this.prototype as any)._openingConnection = false; }

    public get disposed(): boolean {
        return this._roomModerationSettings == null;
    }

    public get enterRoom(): boolean {
        return this._enterRoom;
    }

    public get data(): GuestRoomData {
        return this._data;
    }

    public get roomForward(): boolean {
        return this._roomForward;
    }

    public get staffPick(): boolean {
        return this._staffPick;
    }

    public get isGroupMember(): boolean {
        return this._isGroupMember;
    }

    public get roomModerationSettings(): RoomModerationSettings {
        return this._roomModerationSettings;
    }

    public get openingConnection(): boolean {
        return this._openingConnection;
    }

    public get chatSettings(): RoomChatSettings {
        return this._chatSettings;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._enterRoom = param1.readBoolean();
        this._data = new GuestRoomData(param1);
        this._roomForward = param1.readBoolean();
        this._staffPick = param1.readBoolean();
        this._isGroupMember = param1.readBoolean();
        let _loc2_: boolean = param1.readBoolean();
        this._roomModerationSettings = new RoomModerationSettings(param1);
        this._data.allInRoomMuted = _loc2_;
        this._data.canMute = param1.readBoolean();
        this._chatSettings = new RoomChatSettings(param1);
        this._openingConnection = param1.readBoolean();
        return true;
    }

    public dispose(): void {
        this._roomModerationSettings = null;
    }

    get [IDisposable](): true {
        return true;
    }
}
