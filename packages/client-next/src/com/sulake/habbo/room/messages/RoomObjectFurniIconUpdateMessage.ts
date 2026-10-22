import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';

export class RoomObjectFurniIconUpdateMessage extends RoomObjectUpdateMessage {
    static { registerClassName(this, 'com.sulake.habbo.room.messages::RoomObjectFurniIconUpdateMessage'); }

    public static readonly BADGE_LOADED: string = "ROFIUM_FURNI_ICON_LOADED";

    declare private _wallItem: boolean;
    static { (this.prototype as any)._wallItem = false; }

    declare private _typeId: number;
    static { (this.prototype as any)._typeId = 0; }

    declare private _extra: string;

    declare private _assetName: string;

    constructor(param1: string, param2: boolean, param3: number, param4: string) {
        super(null, null);
        this._assetName = param1;
        this._wallItem = param2;
        this._typeId = param3;
        this._extra = param4;
    }

    public get assetName(): string {
        return this._assetName;
    }

    public get wallItem(): boolean {
        return this._wallItem;
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get extra(): string {
        return this._extra;
    }
}
