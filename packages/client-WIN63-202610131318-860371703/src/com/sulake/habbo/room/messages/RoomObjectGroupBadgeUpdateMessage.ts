import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectGroupBadgeUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectGroupBadgeUpdateMessage'); }

    public static readonly BADGE_LOADED: string = "ROGBUM_BADGE_LOADED";

    declare private _badgeId: string;

    declare private _assetName: string;

    constructor(param1: string, param2: string) {
        super(null, null);
        this._badgeId = param1;
        this._assetName = param2;
    }

    public get badgeId(): string {
        return this._badgeId;
    }

    public get assetName(): string {
        return this._assetName;
    }
}
