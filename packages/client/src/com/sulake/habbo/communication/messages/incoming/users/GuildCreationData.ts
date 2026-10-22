import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IGuildData } from '@/com/sulake/habbo/communication/messages/incoming/users/IGuildData';
import { GuildBadgeSettings } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildBadgeSettings';
import { RoomEntryData } from '@/com/sulake/habbo/communication/messages/incoming/users/RoomEntryData';

export class GuildCreationData implements IGuildData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildCreationData'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        this._costInCredits = param1.readInteger();
        this._ownedRooms = [];
        _loc2_ = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._ownedRooms.push(new RoomEntryData(param1.readInteger(), param1.readString(), param1.readBoolean()));
            _loc3_++;
        }
        _loc2_ = param1.readInteger();
        this._badgeSettings = [];
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._badgeSettings.push(new GuildBadgeSettings(param1));
            _loc3_++;
        }
    }

    declare private _costInCredits: number;
    static { (this.prototype as any)._costInCredits = 0; }

    declare private _ownedRooms: any[];

    declare private _badgeSettings: any[];

    public get costInCredits(): number {
        return this._costInCredits;
    }

    public get ownedRooms(): any[] {
        return this._ownedRooms;
    }

    public get exists(): boolean {
        return false;
    }

    public get isOwner(): boolean {
        return true;
    }

    public get groupId(): number {
        return 0;
    }

    public get groupName(): string {
        return "";
    }

    public get groupDesc(): string {
        return "";
    }

    public get baseRoomId(): number {
        return 0;
    }

    public get primaryColorId(): number {
        return 0;
    }

    public get secondaryColorId(): number {
        return 0;
    }

    public get badgeSettings(): any[] {
        return this._badgeSettings;
    }

    public get locked(): boolean {
        return false;
    }

    public get url(): string {
        return "";
    }

    public get guildType(): number {
        return 0;
    }

    public get guildRightsLevel(): number {
        return 0;
    }

    public get badgeCode(): string {
        return "";
    }

    public get membershipCount(): number {
        return 0;
    }
}
